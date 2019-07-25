## To start mongo with docker:

> Reference: https://www.thepolyglotdeveloper.com/2019/01/getting-started-mongodb-docker-container-deployment/

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
