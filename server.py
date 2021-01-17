from flask import Flask, jsonify, request
import json
from newsscraper import *
from discussionscraper import *

from dotenv import load_dotenv
from pathlib import Path
import os
env_path = Path('.') / '.env'
load_dotenv(dotenv_path=env_path)
key = os.getenv("KEY")
endpoint = os.getenv("ENDPOINT")

app = Flask(__name__)

@app.route("/")
def home():
    return "Hello, World!"

@app.route("/news")
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

@app.route("/discussion")
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

if __name__ == "__main__":
    app.run(debug=True)

#test