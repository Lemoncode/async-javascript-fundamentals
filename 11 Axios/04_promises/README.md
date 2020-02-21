## 4 Returning a Promise

### 1. We can return a promise from the service, and then apply then and catch out of the service. 

```diff
import axios from 'axios';
import { appendElement, createList } from '../view/uiBuilder';

- export const getBooks = (err, success) => {
-     axios.get('http://localhost:8000/api/books')
-         .then(success)
-         .catch(err);
- };
+export const getBooks = () => (
+    axios.get('http://localhost:8000/api/books')
+);

- export const postBook = (book) => (err, success) => {
-     axios.post('http://localhost:8000/api/books', book)
-         .then(success)
-         .catch(err);
- };
+export const postBook = (book) => (
+    axios.post('http://localhost:8000/api/books', book)
+);
```

### 2. Now we can update app.js to inject the callbacks for these.

```diff
import * as bookAPI from './API/bookAPI';
import { appendElement, createList } from './view/uiBuilder';

const onSuccess = (result) => {
    let titles = [];
    // Remove data to watch how error is handle.
    result.data.forEach((item) => {
        titles.push(item.title);
    });
    const list = createList(titles);
    appendElement('books-container', list);
};

const onError = (error) => console.log(error);

document.addEventListener('DOMContentLoaded', () => {
    const buttonRetrieveBooks = document.getElementById('button-retrieve-books');
    buttonRetrieveBooks.addEventListener('click', (event) => {
        event.stopPropagation();
-       bookAPI.getBooks(onError, onSuccess);
+        bookAPI.getBooks()
+            .then(onSuccess)
+            .catch(onError);
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
-       bookAPI.postBook(book)
-           (
-               onError,
-               (result) => bookAPI.getBooks(onError, onSuccess)
-           );
+        bookAPI.postBook(book)
+            .then(() => bookAPI.getBooks())
+            .then(onSuccess)
+            .catch(onError);
    });
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