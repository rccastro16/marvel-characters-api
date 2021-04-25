# marvel-characters-api

Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites
* [Node.js](https://nodejs.org/en/download/) >= 12
* [NPM](https://www.npmjs.com/get-npm) >= 6.14.0
* [Redis](https://redis.io/topics/quickstart) >= 6.2.2

### Installing
Clone repo to your directory 

Once completed we will create an `.env` file in the root folder. This file will contain all of the configurations and api keys we will use for the app. 
```
PORT=8080
REDIS_URL=redis://localhost:6379

MARVEL_PUBLIC_API_KEY={public_key}
MARVEL_PRIVATE_API_KEY={private_key}
```

In the terminal run: 
```
npm install
```
This will install all the dependencies of the project 

Once completed, we can now start the application by running:
```
npm run dev
```

### Running the tests
In order to test the app run: 
```
npm run test
```

