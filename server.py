from flask import Flask, jsonify, request
import json
import ast
from newsscraper import *
from discussionscraper import *
from predict import *

import pyrebase
import firebase_admin
from firebase_admin import credentials, auth, firestore, initialize_app
from functools import wraps

from dotenv import load_dotenv
from pathlib import Path
import os
env_path = Path('.') / '.env'
load_dotenv(dotenv_path=env_path)

key = os.getenv("KEY")
endpoint = os.getenv("ENDPOINT")
predictkey = os.getenv("PREDICTIONKEY")
predictendpoint = os.getenv("PREDICTIONENDPOINT")

config = {
    "apiKey": os.getenv("FBK"),
    "authDomain": os.getenv("FBD"),
    "projectId": os.getenv("FBPID"),
    "storageBucket": os.getenv("FBSB"),
    "messagingSenderId": os.getenv("FBMSI"),
	"databaseURL": "",
    "appId": os.getenv("FBAID")}
	
cred = credentials.Certificate('fbAdminConfig.json')
firebase = initialize_app(cred)
db = firestore.client()
stocks_ref = db.collection('stocks')

pb = pyrebase.initialize_app(config)
db = pb.database()
authe = pb.auth()


app = Flask(__name__)

@app.route("/")
def home():
    return "Hello, World!"

@app.route("/news", methods=["GET"])
def news():
    symbol = request.args.get('symbol')
    client = newsauthenticate_client(key, endpoint)
    pos, neu, neg = newssentiment_analysis_example(client, symbol)
    data = {"Positive": pos, "Neutral": neu, "Negative": neg}
    response = app.response_class(
        response=json.dumps(data),
        status=200,
    )
    return response

@app.route("/discussion", methods=["GET"])
def discussion():
    symbol = request.args.get('symbol')
    client = discauthenticate_client(key, endpoint)
    pos, neu, neg = discsentiment_analysis_example(client, symbol)
    data = {"Positive": pos, "Neutral": neu, "Negative": neg}
    response = app.response_class(
        response=json.dumps(data),
        status=200,
    )
    return response

@app.route("/predict", methods=["POST"])
def predict():
    allowSelfSignedHttps(True)
    content = request.get_json()
    symbol = content['symbol']
    if (symbol != "MFST" and symbol != "AC.TO" and symbol != "AAPL" and symbol != "TSLA" and symbol != "ENB.TO" 
        and symbol != "TD.TO" and symbol != "BABA" and symbol != "FB" and symbol != "GOOS.TO"):
        symbol = "^GSPC"
    data = {
    "Inputs": {
          "WebServiceInput0":
          [
              {
                    'Datetime': f"{content['datetime']}",
                    'Symbol': f"{symbol}",
                    'Open': f"{content['open']}",
                    'High': f"{content['high']}",
                    'Low': f"{content['low']}",
                    'Close': f"{content['close']}",
              },
          ],
        },
        "GlobalParameters":  {
        }
    }
    body = str.encode(json.dumps(data))
    headers = {'Content-Type':'application/json', 'Authorization':('Bearer '+ predictkey)}
    req = urllib.request.Request(predictendpoint, body, headers)
    

    result = None
    try:
        response = urllib.request.urlopen(req)
        decode = response.read().decode("utf-8")
        result = ast.literal_eval(decode)
        # print(result)
    except urllib.error.HTTPError as error:
        result = "error"
        # print("The request failed with status code: " + str(error.code))
        # print(error.info())
        # print(json.loads(error.read().decode("utf8", 'ignore')))

    data = {"result": result}
    response = app.response_class(
        response=json.dumps(data),
        status=200,
    )
    return response


@app.route('/register', methods=['POST'])
def register():
	info = request.get_json()
	email = info['email']
	password = info['password']
	user = auth.create_user(
           email=email,  
	       password=password
        )
	return 'Success', 200

@app.route('/login', methods=['POST'])
def login():
    info = request.get_json()
    unsuccessful = 'Please check your credentials'
    successful = 'Login successful'
    if request.method == 'POST':
        email = info['email']
        password = info['password']
    try:
        user = pb.auth().sign_in_with_email_and_password(email, password)
        jwt = user['idToken']
        return {'token': jwt}, 200
    except:
        return unsuccessful

def check_token(f):
	@wraps(f)
	def wrap(*args,**kwargs):
		content= request.get_json()
		token= content['authorization']
		if not token:
			return {'message': 'No token provided'},400
		try:
			user = auth.verify_id_token(token)
			request.user = user
		except:
			return {'message':'Invalid token provided.'},400
		return f(*args, **kwargs)
	return wrap

@app.route('/authenticated', methods=['POST'])
@check_token
def userinfo():
    return 'Authenticated'

# @app.route('/logout', methods=['POST'])
# def logout():
#         authe.signOut()
#         return {'message': 'Success'},200

@app.route('/add', methods=['POST'])
def create():
    try:
        id = request.json['id']
        token = session['user']
        user = authe.get_account_info(token)
        localId = user['users'][0]['localId']
        stocks_ref.document("new_node").child(localId).set(request.json)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"

if __name__ == "__main__": 
    app.run(debug=True)
