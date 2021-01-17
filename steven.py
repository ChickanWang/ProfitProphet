import pyrebase
import firebase_admin
from flask import *
from firebase_admin import credentials, auth
from flask import Flask, request
from functools import wraps

config = {
    "apiKey": "AIzaSyCg3IFSKWFgWJ--UDzmluS6JeVX0oMLBPs",
    "authDomain": "htn2020-b2e40.firebaseapp.com",
    "projectId": "htn2020-b2e40",
    "storageBucket": "htn2020-b2e40.appspot.com",
    "messagingSenderId": "738759902201",
	"databaseURL": "",
    "appId": "1:738759902201:web:9b9c0b5a1e0d98fdcbb328"}
	
cred = credentials.Certificate('fbAdminConfig.json')
firebase = firebase_admin.initialize_app(cred)
pb = pyrebase.initialize_app(config)

app = Flask(__name__)

@app.route('/signup', methods=['POST'])

def register():
	info = request.get_json()
	print(info)
	email = info['email']
	password = info['password']
	user = auth.create_user(
           email=email,  
	       password=password
        )
	return 'Success', 200


@app.route('/', methods=['POST'])

def login():
	info = request.get_json()
	unsuccessful = 'Please check your credentials'
	successful = 'Login successful'
	if request.method == 'POST':
		email = info['email']
		password = info['password']
		try:
			user = pb.auth().sign_in_with_email_and_password(email, password)
			return {'token': "good"}, 200
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

@app.route('/api/userinfo')
@check_token
def userinfo():
    return {'data': "authorized"}, 200

if __name__ == '__main__':
	app.run(debug=True)

