## Tech Stack 

- [tachyons](http://tachyons.io/): functional CSS tool kit.
- [react-icons](https://github.com/react-icons/react-icons)

## Local Development 

### Setting Backend Services

Clone the [backend](https://github.com/Chiuweiyu/IMDB_mid/tree/main/backend) repository 
and follow the readme instruction to setup the MongoDB and start the API service. 

You can also find the data schema definition at the [models folder](https://github.com/Chiuweiyu/IMDB_mid/tree/main/backend/models)

### Install dependencies

```
$ npm install
$ yarn install
```

### Env

Copy the text below into a file `.env` and put it under this directory:

```
REACT_APP_API_URL=localhost
REACT_APP_API_PORT=4000
```

Then 
```
$ npm run start
``` 
