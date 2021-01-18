Check out our project demo here! https://www.youtube.com/watch?v=R6USLZnCf9g

# Inspiration
The stock market is an incredibly lucrative financial opportunity for anyone, but with great rewards comes great risk. We sought to create a webapp that can minimize the risk of the stock market by predicting the future stock price, ultimately increasing accessibility and interest in the stock market. In the status quo, many stock market tools already exist, however, we noticed that there were some less common analysis methods that are readily available to the public. Thus we decided to create an application that analyzes stocks based on their market trends, news articles, and discussions. Given the challenges we faced being new to the stock market we wanted to make this very beginner-friendly so we made it a simple web application.

# What it does
ProfitProphet was made to address the high risks and ‘unknown factors’ of the stock market. By making more accurate predictions, users of this tool can mitigate much of their losses and become more incentivized to invest.

# How we built it
ProfitProphet was made with a mix of Flask and React, as the backend and frontend respectively. All API calls were done from the backend, processed, then passed back to the React frontend. We used beautifulsoup4 to scrape recent data and Microsoft Azure Text Analytics API along with a custom linear regression model made in Microsoft Azure Machine Learning Studio.

# Microsoft Azure API Usage:
Microsoft Azure was a key piece to creating ProfitProphet. Sentiment analysis was used to evaluate whether news or discussion surrounding a certain stock carried a positive or negative connotation. Such tones can be a sign of whether a stock has potential in the public’s eye. Additionally, to predict the hourly prices of a desired stock, we trained a machine learning model using linear regression on hourly data. To create the model, Azure blob containers and datastores were used, with the model retraining every time the datastore is updated.

# Target audience:
This web app was created primarily for young adults who are just getting interested in trading stocks, however, it is friendly for people of all ages.
