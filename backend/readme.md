## Local Development

### development Env
Set the `.env.dev`:

```
PORT=4000
MONGODB_URL=0.0.0.0
MONGODB_PORT=27017
DB_NAME=btsebenton
MONGO_ADMIN_NAME=<what you want>
MONGO_ADMIN_PASSWORD=<what you want>
MONGO_USER=<what you want>
MONGO_USER_PASSWORD=<what you want>
```

### DataBase

First make sure you have already install the [Docker Desktop](https://www.docker.com/products/docker-desktop).

Setup the local MongoDB docker environment:

```
yarn mongo:docker
```

The service will install the MongoDB and Mongo-Express (Web-based MongoDB admin interface)

If docker setting is completed, you can control the docker service via the Docker Desktop.

After you have started the mongodb services, you can visit the MongoDB admin interface at `localhost:8081`

### Confirm the Database User data

**TODO: need to fix it ...**

Sometimes we cannot add the MONGO_USER to mongodb. It will cause the service unavailable.

You need to add the user manually ... 

``` shell
docker exec -it <your mongodb container name> bash
```

When entering the shell: 

```` shell
$ mongosh -u root
<MONGO_ADMIN_PASSWORD>
````

In the mongo shell: 

```shell
use btsebenton

db.createUser(
  {
    user: <MONGO_USER> (string type),
    pwd: passwordPrompt(), 
    roles: [ { role: 'dbOwner', db: 'btsebenton' } ]
  }
)
  
exit
```

### Add Companies and Bentos data to Database

```
yarn add:dbdata
```

It will add all the data at `dbSource/companies` to the database.

If you want to add more, you can move the original data of `dbSource/companies` to the `dbSource/saved`,

Then you can add the json files and run `yarn add:dbdata` to execute batch input again.

### Watching the Server

We use `nodemon` to watch server and auto reload it when content changed: 

``` command
npm install -g nodemon
```
Then:

``` 
yarn && yarn dev
```

### API Testing Suite

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/7162146-e2c4c2de-e73c-471e-977f-9c37e0468e30?action=collection%2Ffork&collection-url=entityId%3D7162146-e2c4c2de-e73c-471e-977f-9c37e0468e30%26entityType%3Dcollection%26workspaceId%3D5c21f164-875b-4551-8f94-0ccaca2df935)

Happy Coding!

## Production

**[Note]** Remember set the `.env.production`

We use [pm2](https://pm2.keymetrics.io/) to manage our service.

```shell
yarn server
```
