## In this demo we are going to make our service a little more felxible allowing the pass of callbacks

## 3 Using callbacks

### 1. Update parcel dependenies

Add ./.babelrc

```json
{
    "plugins": [
        "@babel/plugin-proposal-class-properties"
    ]
}
```

Update ./package.json

```diff
{
  "name": "00_get_started",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "parcel index.html"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
+   "@babel/core": "^7.8.4",
+   "@babel/plugin-proposal-class-properties": "^7.8.3",
    "parcel": "^1.12.4"
  },
  "dependencies": {
    "axios": "^0.18.0"
  }
}

```

### 2. Currently our bookService is doing several things, it is calling the server for data handling the response, and displaying data. Lets start to honor SRP, and start by passing callbacks that could be passed from outsite of our service to segregate responsabilities. 

```diff bookAPI.js
import axios from 'axios';
import { appendElement, createList } from '../view/uiBuilder';

- const errorHandler = (err) => console.log(err);

- export const getBooks = () => {
export const getBooks = (err, success) => {
    axios.get('http://localhost:8000/api/books')
-       .then((result) => {
-           let titles = [];
-           result.data.forEach((item) => {
-               titles.push(item.title);
-           });
-           const list = createList(titles);
-           appendElement('books-container', list);
-       })
-       .catch(errorHandler);
+        .then(success)
+        .catch(err);
};

- export const postBook = (book) => {
+export const postBook = (book) => (err, success) => {
    axios.post('http://localhost:8000/api/books', book)
-       .then(() => getBooks())
-       .catch(errorHandler);
+        .then(success)
+        .catch(err);
};
```

### 2. Now we can update app.js to inject the callbacks for these.

```diff
import * as bookAPI from './API/bookAPI';
import { appendElement, createList } from './view/uiBuilder';

+const onSuccess = (result) => {
+    appendElement(
+        'books-container',
+        createList(
+            result.data.map((i) => i.title)
+        )
+    );
+}
+
+const onError = (error) => console.log(error);
+
document.addEventListener('DOMContentLoaded', () => {
    const buttonRetrieveBooks = document.getElementById('button-retrieve-books');
    buttonRetrieveBooks.addEventListener('click', (event) => {
        event.stopPropagation();
-       bookAPI.getBooks();
+        bookAPI.getBooks(onError, onSuccess);
    });
    const conatinerAddBookFormSubmit = document.getElementById('container-add-book-form-submit');
    conatinerAddBookFormSubmit.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        const book = {
            title: document.getElementById('title').value,
            author: document.getElementById('author').value,
            genre: document.getElementById('genre').value,
            read: document.getElementById('read').checked
        };
-       bookAPI.postBook(book);
+        bookAPI.postBook(book)
+            (
+                onError,
+                (_) => bookAPI.getBooks(onError, onSuccess)
+            );
+    });
});
```

### 3. We have to get the server and mongo running in order to get this working.

* To get running mongod

$ mongod "C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe" --dbpath "D:\mongodb\data"

To get running mongo console
$ mongo

Now we can start the server
$ gulp

* To get running via docker, from project root folder

$ docker-compose up

* To get running server-mock, from ./server-mock

$ npm start

