import yfinance as yf
from datetime import datetime
import datetime as datetimee
import pandas as pd 
import numpy as num
timedeltax=datetime.now()
date_N_days_ago = datetime.now() - datetimee.timedelta(days=200)
tickers=["^GSPC", "MSFT", "AAPL", "AC.TO", "TSLA", "ENB.TO", "TD.TO", "BABA", "FB", "GOOS.TO"]
output=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
for j in range(len(tickers)):
    output[j]=yf.download(tickers[j],
    start=date_N_days_ago.strftime("%Y"+"-"+"%m"+"-"+"%d"),
    interval="60m",
    end=timedeltax.strftime("%Y"+"-"+"%m"+"-"+"%d"))
    n=len(output[j].index)
    a = []
    for i in range(n):
        a.append(tickers[j])
    output[j].insert(loc=0, column="Symbol", value=a)

result=pd.concat(output)
result.to_csv('dsa.csv')