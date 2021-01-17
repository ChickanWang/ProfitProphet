from flask import Flask, jsonify, request
import json
import ast
from newsscraper import *
from discussionscraper import *
from predict import *

from dotenv import load_dotenv
from pathlib import Path
import os
env_path = Path('.') / '.env'
load_dotenv(dotenv_path=env_path)
key = os.getenv("KEY")
endpoint = os.getenv("ENDPOINT")
predictkey = os.getenv("PREDICTIONKEY")
predictendpoint = os.getenv("PREDICTIONENDPOINT")

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
    data = {
    "Inputs": {
          "WebServiceInput0":
          [
              {
                    'Datetime': f"{content['datetime']}",
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

if __name__ == "__main__":
    app.run(debug=True)
