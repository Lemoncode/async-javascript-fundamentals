## To start mongo with docker:

> Reference: https://www.thepolyglotdeveloper.com/2019/01/getting-started-mongodb-docker-container-deployment/
> Reference: https://dev.to/jay97/docker-compose-an-express-and-mongo-app-aai
> Refereence: https://nodejs.org/de/docs/guides/nodejs-docker-webapp/

```bash
docker-compose up -d
```

```bash
docker exec -it mongodb bash 
```

* This will open a terminal from where we can connect directly to mongo:

```bash
mongo
```



## To start mongo with installed insatance windows:

* mongod --dbpath D:/mongodb/data

### Open a new terminal and query the related collections. To start a new terminal we have to use mongo

```bash
mongo
```

### Now that is open, we can inspect the related databases and collections

```bash
> show dbs
```

```bash
> use <database>
```

```bash
> show <collections>
```

```bash
> db.<collection>.find()
```

* Remove element by Id from mongo console
```javascript
db.books.remove({"_id": ObjectId("5d322fcba8a0243b90fd2f95")});
```