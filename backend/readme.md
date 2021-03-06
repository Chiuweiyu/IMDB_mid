## Local Development

### Install dependencies

```
$ npm install
$ yarn install
```

### Development Env
Copy the text below into a file `.env` and put it under this directory:

```
PORT=4000
MONGODB_URL=0.0.0.0
MONGODB_PORT=27017
DB_NAME=benton
MONGO_ADMIN_NAME=root
MONGO_ADMIN_PASSWORD=<what you want>
MONGO_USER=<what you want>
MONGO_USER_PASSWORD=<what you want>
```
For example, in my setting:
```
PORT=4000
MONGODB_URL=0.0.0.0
MONGODB_PORT=27017
DB_NAME=benton
MONGO_ADMIN_NAME=root
MONGO_ADMIN_PASSWORD=00000000
MONGO_USER=kurt
MONGO_USER_PASSWORD=00000000
```

### DataBase

First make sure you have already install the [Docker Desktop](https://www.docker.com/products/docker-desktop).

Setup the local MongoDB docker environment:

```
$ yarn mongo:docker
```

The service will install the MongoDB and Mongo-Express (Web-based MongoDB admin interface)

If docker setting is completed, you can control the docker service via the Docker Desktop.

After you have started the mongodb services, you can visit the MongoDB admin interface at `localhost:8081`

### Confirm the Database User data


Sometimes we cannot add the MONGO_USER to mongodb. It will cause the service unavailable.

You need to add the user manually ... 

Note: you can find `<your mongodb container name>` in the `"docker Desktop"` - `"Containers"`

``` shell
$ docker exec -it <your mongodb container name> bash
```

When entering the docker shell: 

```` shell
mongosh -u root
<MONGO_ADMIN_PASSWORD>
````

In the mongo container shell: 

```
use benton
```
In `benton` db:
```
db.createUser({user: <MONGO_USER> ,pwd: passwordPrompt(),roles: [ { role: 'dbOwner', db: 'benton' } ]})
```
* In my example, run `db.createUser({user: "kurt" ,pwd: passwordPrompt(),roles: [ { role: 'dbOwner', db: 'benton' }]})`
in the mongo container shell.


After creating user, type `exit` and back to the bash shell:
```
exit
```


### Watching the Server

We use `nodemon` to watch server and auto reload it when content is changed: 

``` command
$ npm install -g nodemon
```
Then:

``` 
$ npm run dev
```
In this step, we finally starting our backend server.



### Add Companies and Bentos data to Database

When the backend server is running, we can push some data into db.

```
$ node add.js
```

It will add all the data at `dbSource/companies` to the database.

If you want to add more, you can move the original data of `dbSource/companies` to the `dbSource/saved`,

Then you can add the json files and run `node add.js` to execute batch input again.
