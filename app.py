from flask import Flask, jsonify, request
import json
import ast
from newsscraper import *
from discussionscraper import *
from predict import *
import yfinance as yf

from dotenv import load_dotenv
from pathlib import Path
import os
env_path = Path('.') / '.env'
load_dotenv(dotenv_path=env_path)

key = os.getenv("KEY")
endpoint = os.getenv("ENDPOINT")
predictkey = os.getenv("PREDICTIONKEY")
predictendpoint = os.getenv("PREDICTIONENDPOINT")

app = Flask("App", static_folder='./client/build', static_url_path='/')

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

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
   
    if (symbol != "MSFT" and symbol != "AC.TO" and symbol != "AAPL" and symbol != "TSLA" and symbol != "ENB.TO" 
        and symbol != "TD.TO" and symbol != "BABA" and symbol != "FB" and symbol != "GOOS.TO"):
        symbol = "^GSPC"

    ticker = yf.Ticker(symbol)
    openprice = ticker.info["bid"]
    high = ticker.info["dayHigh"]
    low = ticker.info["dayLow"]
    close= 0

    data = {
    "Inputs": {
          "WebServiceInput0":
          [
              {
                    'Datetime': f"{content['datetime']}",
                    'Symbol': f"{symbol}",
                    'Open': f"{openprice}",
                    'High': f"{high}",
                    'Low': f"{low}",
                    'Close': f"{close}",
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
    except urllib.error.HTTPError as error:
        result = "error"

    data = {"currentprice": openprice, "result": result}
    response = app.response_class(
        response=json.dumps(data),
        status=200,
    )
    return response

if __name__ == "__main__": 
    app.run(debug=True)
