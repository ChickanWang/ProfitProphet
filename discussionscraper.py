import requests
from bs4 import BeautifulSoup

from azure.ai.textanalytics import TextAnalyticsClient
from azure.core.credentials import AzureKeyCredential

from dotenv import load_dotenv
from pathlib import Path
import os
env_path = Path('.') / '.env'
load_dotenv(dotenv_path=env_path)

def discauthenticate_client(key, endpoint):
    ta_credential = AzureKeyCredential(key)
    text_analytics_client = TextAnalyticsClient(
            endpoint=endpoint, 
            credential=ta_credential)
    return text_analytics_client

def discsentiment_analysis_example(client, symbol):
    url = f"https://finance.yahoo.com/quote/{symbol}/community?p={symbol}"
    res = requests.get(url)
    soup = BeautifulSoup(res.text, 'html.parser')
    convos = soup.findAll("div", {"class": "C($c-fuji-grey-l) Mb(2px) Fz(14px) Lh(20px) Pend(8px)"})

    fullstring = ""
    length = 0
    if (symbol == "TSLA"):
        for i in range(1, 2):
            if i == 0:
                fullstring = convos[i].text
            else: 
                fullstring = fullstring + ". " + convos[i].text
    else:
        for i in range(1, 11):
            if i == 0:
                fullstring = convos[i].text
            else: 
                if length < 4000:
                    fullstring = fullstring + ". " + convos[i].text
                    length = len(fullstring)
    documents = [fullstring]
    print(documents)
    response = client.analyze_sentiment(documents=documents)[0]
    print("Document Sentiment: {}".format(response.sentiment))
    print("Overall scores: positive={0:.2f}; neutral={1:.2f}; negative={2:.2f} \n".format(
        response.confidence_scores.positive,
        response.confidence_scores.neutral,
        response.confidence_scores.negative,
    ))
    positivitytotal = 0
    neutraltotal = 0
    negativitytotal = 0
    count = 0
    for idx, sentence in enumerate(response.sentences):
        if (sentence.confidence_scores.negative!=1):
            positivitytotal += sentence.confidence_scores.positive
            neutraltotal +=  sentence.confidence_scores.neutral
            negativitytotal += sentence.confidence_scores.negative
            count += 1
        print("Sentence: {}".format(sentence.text))
        print("Sentence {} sentiment: {}".format(idx+1, sentence.sentiment))
        print("Sentence score:\nPositive={0:.2f}\nNeutral={1:.2f}\nNegative={2:.2f}\n".format(
            sentence.confidence_scores.positive,
            sentence.confidence_scores.neutral,
            sentence.confidence_scores.negative,
        ))
    positive = 0
    neutral = 0
    negative = 0

    if (count == 0):
        print("Unknown info about this stock. Risky buy.")
    else:
        positive = positivitytotal / count
        neutral = neutraltotal /count
        negative = negativitytotal / count
        
    # print("Document Sentiment: {}".format(response.sentiment))
    # print("Overall scores: positive={0:.2f}; neutral={1:.2f}; negative={2:.2f} \n".format(
    #     positive,
    #     neutral,
    #     negative,
    # ))
    return positive, neutral, negative

if __name__ == "__main__":
    key = os.getenv("KEY")
    endpoint = os.getenv("ENDPOINT")
    client = authenticate_client()
    symbol = "AAPL"
    sentiment_analysis_example(client, symbol)