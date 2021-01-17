import requests
from bs4 import BeautifulSoup

from azure.ai.textanalytics import TextAnalyticsClient
from azure.core.credentials import AzureKeyCredential

from dotenv import load_dotenv
from pathlib import Path
import os
env_path = Path('.') / '.env'
load_dotenv(dotenv_path=env_path)

def newsauthenticate_client(key, endpoint):
    ta_credential = AzureKeyCredential(key)
    text_analytics_client = TextAnalyticsClient(
            endpoint=endpoint, 
            credential=ta_credential)
    return text_analytics_client

def newssentiment_analysis_example(client, symbol):
    url = f"https://news.google.com/rss/search?q={symbol}&hl=en-CA&gl=CA&ceid=CA:en"
    res = requests.get(url)
    soup = BeautifulSoup(res.content, features="lxml")
    headlines = soup.findAll('title')

    fullstring = ""
    for i in range(1, 11):
        if i == 0:
            fullstring = headlines[i].contents[0]
        else: 
            fullstring = fullstring + ". " + headlines[i].contents[0]
    documents = [fullstring]
    response = client.analyze_sentiment(documents=documents)[0]
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
        # print("Sentence: {}".format(sentence.text))
        # print("Sentence {} sentiment: {}".format(idx+1, sentence.sentiment))
        # print("Sentence score:\nPositive={0:.2f}\nNeutral={1:.2f}\nNegative={2:.2f}\n".format(
        #     sentence.confidence_scores.positive,
        #     sentence.confidence_scores.neutral,
        #     sentence.confidence_scores.negative,
        # ))
    positive = 0
    neutral = 0
    negative = 0

    if (count == 0):
        print("Unknown info about this stock. Risky buy.")
    else:
        positive = positivitytotal / count
        neutral = neutraltotal /count
        negative = negativitytotal / count
    return positive, neutral, negative




