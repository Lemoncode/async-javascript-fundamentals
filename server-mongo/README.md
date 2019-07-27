## To start mongo

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