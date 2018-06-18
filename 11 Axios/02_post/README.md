## In this demo we are going to perform a basic `post` with `axios`.

## 2 Post

### 1. Lets refactor our bookAPI.js to post a book to the server.


```diff bookService.js
import axios from 'axios';
import { appendElement, createList } from '../view/uiBuilder';

+const errorHandler = (err) => console.log(err);
+
export const getBooks = () => {
    axios.get('http://localhost:8000/api/books')
        .then((result) => {
            let titles = [];
            result.data.forEach((item) => {
                titles.push(item.title);
            });
            const list = createList(titles);
            appendElement('books-container', list);
        })
-        .catch((err) => console.log(err));
+        .catch(errorHandler);
};

+export const postBook = (book) => {
+    axios.post('http://localhost:8000/api/books', book)
+        .then(() => getBooks())
+        .catch(errorHandler);
+};
```

### 2. Lets change index.html to have a form, so we can post a new book to server.

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
+    const conatinerAddBookFormSubmit = document.getElementById('conatiner-add-book-form-submit');
+    conatinerAddBookFormSubmit.addEventListener('click', (event) => {
+        event.preventDefault();
+        event.stopPropagation();
+        const book = {
+            title: document.getElementById('title').value,
+            author: document.getElementById('author').value,
+            genre: document.getElementById('genre').value,
+            read: document.getElementById('read').checked
+        };
+        bookAPI.postBook(book);
+    });
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
