## In this demo we are going to perform a basic `post` with `axios`.

## 2 Post

### 1. Lets refactor our bookAPI.js to post a book to the server.


```diff bookService.js
import axios from 'axios';
import { appendElement, createList } from '../view/uiBuilder';

const BASE_URL = 'http://localhost:8000'
+
+const errorHandler = (err) => console.log(err);
+
export const getBooks = () => {
    axios.get(`${BASE_URL}/api/books/`)
        .then((result) => {
            const titles = result.data.map((i) => i.title);
            appendElement(
                'books-container',
                createList(titles)
            );
        })
-        .catch((err) => console.log(err));
+        .catch(errorHandler);
};

+export const postBook = (book) => {
+    axios.post(`${BASE_URL}/api/books/`, book)
+        .then(() => getBooks())
+        .catch(errorHandler);
+};
```

### 2. Lets change index.html to have a form, so we can post a new book to server. 

* Edit as follows __.\index.html__.

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="./src/content/site.css">
</head>

<body>
    <div id="books-container" class="container">
        <button id="button-retrieve-books">Retrieve books</button>
    </div>
    <!-- diff -->
    <div class="container-add-book">
        <form>
            Title:</br>
            <input type="text" id="title" name="title" />
            <br/>
            Genre:</br>
            <input type="text" id="genre" name="genre" />
            <br/>
            Author:</br>
            <input type="text" id="author" name="author" />
            </br>
            Have you read this book?:</br>
            <input type="checkbox" id="read" name="read" />
            </br></br>
            <button id="container-add-book-form-submit">Add book</button>
        </form>
    </div>
    <!-- diff -->
    <script src="./src/app.js"></script>
</body>

</html>
```

### 3. Now we have to change app.js

```diff app.js
import * as bookAPI from './API/bookAPI';
import { appendElement, createList } from './view/uiBuilder';

document.addEventListener('DOMContentLoaded', () => {
    const buttonRetrieveBooks = document.getElementById('button-retrieve-books');
    buttonRetrieveBooks.addEventListener('click', (event) => {
        event.stopPropagation();
        bookAPI.getBooks();
    });
+   const containerAddBookFormSubmit = document.querySelector('#container-add-book-form-submit');
+   containerAddBookFormSubmit.addEventListener('click', (event) => {
+       event.preventDefault();
+       event.stopPropagation();
+       const book = {
+           title: document.querySelector('#title').value,
+           author: document.querySelector('#author').value,
+           genre: document.querySelector('#genre').value,
+           read: document.querySelector('#read').checked
+       };
+       bookAPI.postBook(book);
+   });
});
```


### 4. We have to get the server and mongo running in order to get this working.

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

