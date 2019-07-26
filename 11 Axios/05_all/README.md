## 5 Using all

### 1. Now we are going to use axios.all, to sync multiple http calls. For that purpose we create a new service authorAPI.js

```javascript
import axios from 'axios';

const baseUrl = 'http://localhost:8000';

export const getAuthors = () => (
    axios.get(`${baseUrl}/api/authors`)
);
```

### 2. In index.html we add a new button that will trigger the action of retrieve books and  authors from server. We have to add a new reference to this service.

* Add bellow _div_ with _books-container id_

<div id="books-authors-container" class="container">
    <button id="button-retrieve-books-authors">Retrieve books and Authors</button>
</div>

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

To get running mongod

$ mongod
"C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe" --dbpath "D:\mongodb\data"

To get running mongo console
$ mongo

Now we can rtun the server
$ gulp
