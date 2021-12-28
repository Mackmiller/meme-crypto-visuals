<img alt="header" src="doge1.png">

# Top Meme Tokens and Coins

### An entire category of cryptocurrency is inspired by memes, and it's worth billions of US dollars: Meme coins and tokens are heavily community-driven, influenced by their current standing within social media channels and general online presence.
This is a web application which allows users to view the top tokens and coins within the Meme cryptocurrancy category, including total market value and volume traded within the past 24 hours. Data is from the [CoinMarketCap API](https://coinmarketcap.com/api/documentation/v1/) and visualizations were built within React using [Rechart](https://recharts.org/en-US).

## Tech stack

- Current: Express, React, Node 
- In progress: MongoDB

## User flows

- Current:
    - I want to see top coins and tokens for the Meme cryptocurrency category, including logo, quick figures, and visuals
- In progress:
    - I want to be able to sign up/login for an account
    - I want to save a particular coin to my account

## ERD visual

<img alt="erd" src="basic_erd.png">

## Local Setup

- Install the LTS version of node.js from [here](https://nodejs.org/en/)
- In a terminal, clone this repo

```sh
git clone https://github.com/Mackmiller/meme-crypto-visuals-server.git
```

- Navigate to the repo folder

```sh
cd meme-crypto-visuals-server
```

- Install the project dependencies:

```sh
npm install
```

- Deploy the project on your local machine

```sh
nodemon
```

- Part 2 of local installment includes forking and cloning the client repository, which can be found [here](https://github.com/Mackmiller/meme-crypto-visuals-client)

## Cloud Deployment

Stay tuned for Heroku deployment soon.

## Contributors

- [Mackenzie Miller](https://github.com/Mackmiller)