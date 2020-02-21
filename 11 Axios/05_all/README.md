## 5 Using all

### 1. Now we are going to use axios.all, to sync multiple http calls. For that purpose we create a new service authorAPI.js

Create __.\src\API\authorAPI.js__

```javascript
import axios from 'axios';

const baseUrl = 'http://localhost:8000';

export const getAuthors = () => (
    axios.get(`${baseUrl}/api/authors`)
);
```

### 2. In index.html we add a new button that will trigger the action of retrieve books and  authors from server. We have to add a new reference to this service.

* Edit as follows __.\index.html__

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
    <div id="books-authors-container" class="container">
        <button id="button-retrieve-books-authors">Retrieve books and Authors</button>
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
    <script src="./src/app.js"></script>
</body>

</html>
```

Edit __.\src\app.js__

```diff app.js
import * as bookAPI from './API/bookAPI';
+import * as authorAPI from './API/authorAPI';
+import axios from 'axios';
import { appendElement, createList } from './view/uiBuilder';

+const onSuccessBooks = (result, container) => {
-const onSuccess = (result) => {
    appendElement(
-       'books-container',
+       container,
        createList(
            result.data.map((i) => i.title)
        )
    );
}

+const onSuccessAuthors = (result, container) => {
+    appendElement(
+        container,
+        createList(
+            result.data.map((i) => `${i.name} ${i.lastName}`)
+        )
+    );
+};

const onError = (error) => console.log(error);

document.addEventListener('DOMContentLoaded', () => {
    const buttonRetrieveBooks = document.getElementById('button-retrieve-books');
    buttonRetrieveBooks.addEventListener('click', (event) => {
        event.stopPropagation();
        bookAPI.getBooks()
-            .then(onSuccess)
+            .then((result) => onSuccessBooks(result, 'books-container'))
            .catch(onError);
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
        bookAPI.postBook(book)
            .then(() => bookAPI.getBooks())
-           .then(onSuccess)
+           .then((result) => onSuccessBooks(result, 'books-container'))
            .catch(onError);
    });

+   const buttonRetrieveBooksAndAuthors = document.getElementById('books-authors-container');
+    buttonRetrieveBooksAndAuthors.addEventListener('click', (event) => {
+        event.stopPropagation();
+        axios.all([
+            bookAPI.getBooks(),
+            authorAPI.getAuthors()
+        ])
+        .then(axios.spread((books, authors) => {
+            onSuccessBooks(books, 'books-authors-container');
+            onSuccessAuthors(authors, 'books-authors-container');
+        }))
+        .catch(onError);
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
