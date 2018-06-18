## 10 Axios delete

### 1. In this example we are going to use delete. We have toa modify page. `src/pages/bookpatch.html`

```diff
<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">
  <title>LEMONCODE 16/17 Async JavaScript jQuery</title>
  <link rel="stylesheet" href="../content/site.css">
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body>
  <h2>Book patch</h2>
  <div clas="container-add-book">
    <form>
      Id:</br>
      <input type="text" id="_id" name="_id" />
      <br/>

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
      <button id="container-patch-book-form-submit">Patch book</button>
+     <button id="container-delete-book-form-submit">Delete book</button>
    </form>
  </div>
  <div id="books-container" class="container">
    <p>Modified book</p>
  </div>
  <script src="./bookpatch/main.js"></script>
</body>
</html>
```

### 2. Lets change the `bookService.js` to have the delete functionality.
```diff
import axios from 'axios';
import { appendElement, createList } from '../view/uiBuilder';

const getBookById = (bookId) => (
    axios.get(`http://localhost:8000/api/books/${bookId}`)
);

export const getBooks = (cancelSettings) => (
    axios.get('http://localhost:8000/api/books', cancelSettings)
);

export const getBooksByParams = (params) => (
    axios.get('http://localhost:8000/api/books', params)
);

export const postBook = (book) => () => (
    axios.post('http://localhost:8000/api/books', book)
);

export const patchBook = (bookId, book) => (
    axios.patch(`http://localhost:8000/api/books/${bookId}`, book)
);
+
+export const deleteBookById = (bookId) => (
+    axios.delete(`http://localhost:8000/api/books/${bookId}`)
+);

```

### 3. We have to modify `src/pages/bookpatch/main.js`

```diff
import { 
    createElement, 
    cleanElement,
    appendElement 
} from '../../view/uiBuilder';
import * as bookAPI from '../../API/bookAPI';

const hasValue = (id) => document.getElementById(id).value !== '';
const getValueById = (id) => document.getElementById(id).value;
const generateProperty = (book, propertyValue, propertyName) => {
    if(!!propertyValue) {
        book[propertyName] = propertyValue;
    }
};

const parseBook = () => {
    const book = {};
    let title,
        author,
        genre;

    generateProperty(
        book,
        title = hasValue('title') && getValueById('title'),
        'title'
    );

    generateProperty(
        book,
        author = hasValue('author') && getValueById('author'),
        'author'
    );

    generateProperty(
        book,
        genre = hasValue('genre') && getValueById('genre'),
        'genre'
    );

    book.read = document.getElementById('read').checked;

    return book;
};

const modifiedBookHandler = (result) => {
    cleanElement('books-container');
    const modifiedBook = createElement(result.data);
    appendElement('books-container', modifiedBook);
};

const patchHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    // Retrieve this _id from database
    const bookId = document.getElementById('_id').value;
    const book = parseBook();
    
    bookAPI.patchBook(bookId, book)
        .then(bookAPI.getBookById(bookId))
        .then(modifiedBookHandler)
        .catch((err) => console.log(err))
};

+const deleteHandler = (event) => {
+    event.preventDefault();
+    event.stopPropagation();
+    // Retrieve this _id from database
+    const bookId = document.getElementById('_id').value;
+    bookAPI.deleteBookById(bookId)
+        .then((result) => console.log(result))
+        .catch((result) => console.log(result))
+} 

document.addEventListener('DOMContentLoaded', () => {
    const patchBookSubmit = document.getElementById('container-patch-book-form-submit');
    patchBookSubmit.addEventListener('click', patchHandler);
+   const deleteBookSubmit = document.getElementById('container-delete-book-form-submit');
+   deleteBookSubmit.addEventListener('click', deleteHandler);
});
```

### 4. We have to get the server and mongo running in order to get this working.

To get running mongod

$ mongod
"C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe" --dbpath "D:\mongodb\data"

To get running mongo console
$ mongo

Now we can rtun the server
$ gulp
