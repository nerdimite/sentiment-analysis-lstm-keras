# Sentiment Analysis with LSTMs using Keras

## Deep Learning (18CSE484T) Group Project

### _SRM Institute of Science and Technology, Delhi-NCR Campus_

### Group Members:

- Bhavesh Laddagiri (RA1911026030032)
- Akshaj Vishwanathan (RA1911026030003)
- Hardik Gupta (RA1911026030027)

This repository contains the source code for an end-to-end project for sentiment analysis from training the model using tensorflow/keras to deploying the model as an API using [CellStrat Hub](https://cellstrathub.com) and building a Web Application to invoke the API.

[Play with the Web Application Here](https://sentiment-lstm.netlify.app/)

## Usage

### Training

- The model is trained on the [Sentiment140 Dataset](https://www.kaggle.com/kazanova/sentiment140) which contains 1.6 million tweets that are labelled as positive or negative.
- To Train the model, run the [Tweet-Sentiment-Analysis-LSTM.ipynb](Tweet-Sentiment-Analysis-LSTM.ipynb) notebook

### Deployment as a REST API

1. Clone the repo in [CellStrat Hub](https://cellstrathub.com) Workspace.
2. Open a terminal and change directory to `sentiment-api`.
3. Add the `model-twitter.h5` and `tokenizer-twitter.json` to the `model` directory
4. Execute the build and deploy command:

```bash
hub build --deploy
```

4. The process can take around 3 minutes and once deployed you will get your API endpoint.
5. To invoke your API you need to create/get your API Key from the [Deployment Dashboard](https://console.cellstrathub.com/deployments)
6. Now you can invoke your API endpoint and you can make `GET` request to load the model in memory and `POST` request to make predictions by sending your input text as a string.

[Learn More about Deployment here](https://docs.cellstrathub.com/HubAPI%20Deployment%20%F0%9F%9A%80/quickstart)

### Web Application

The web application is built using [Next.js](https://nextjs.org/), styled using [TailwindCSS](https://tailwindcss.com/) and statically hosted on [Netlify](https://netlify.com/). You can find the source code in [sentiment-app](./sentiment-app/).

If you wish to deploy your own version of the application with your own API endpoint and Key you need to specify the environment variables as follows:

- During development, add the endpoint url and key to the `.env.local` file like this

```
NEXT_PUBLIC_ENDPOINT=https://api.cellstrathub.com/<your username>/sentiment-lstm
NEXT_PUBLIC_API_KEY=<your key here>
```

- During deployment in Netlify, add these environment variables in your netlify configuration
