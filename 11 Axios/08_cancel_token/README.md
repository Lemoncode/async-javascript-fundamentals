## 8 Axios cancel token

1. In this example we are going to use cancel token. 
```diff
import axios from 'axios';
import { appendElement, createList } from '../view/uiBuilder';

- export const getBooks = () => (
-     axios.get('http://localhost:8000/api/books')
- );

+export const getBooks = (cancelSettings) => (
+    axios.get('http://localhost:8000/api/books', cancelSettings)
+);

export const getBooksByParams = (params) => (
    axios.get('http://localhost:8000/api/books', params)
);

export const postBook = (book) => () => (
    axios.post('http://localhost:8000/api/books', book)
);
```

```diff app.js
import * as bookAPI from './API/bookAPI';
import * as authorAPI from './API/authorAPI';
import axios from 'axios';
import { appendElement, createList } from './view/uiBuilder';

const onSuccess = (result, container) => {
    let titles = [];
    // Remove data to watch how error is handle.
    result.data.forEach((item) => {
        titles.push(item.title);
    });
    const list = createList(titles);
    appendElement(container, list);
};

const onError = (error) => console.log(error);

document.addEventListener('DOMContentLoaded', () => {
    const buttonRetrieveBooks = document.getElementById('button-retrieve-books');
    buttonRetrieveBooks.addEventListener('click', (event) => {
        event.stopPropagation();
+       const CancelToken = axios.CancelToken;
+       let source = CancelToken.source();
-       bookAPI.getBooks()
+        bookAPI.getBooks({ cancelToken: source.token })
            .then((result) => onSuccess(result, 'books-container'))
            .catch(onError);
+
+        source.cancel('I am canceled!');
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
            .then((result) => onSuccess(result, 'books-container'))
            .catch(onError);
    });

    const buttonRetrieveBooksAndAuthors = document.getElementById('books-authors-container');
    buttonRetrieveBooksAndAuthors.addEventListener('click', (event) => {
        event.stopPropagation();
        axios.all([
            bookAPI.getBooks(),
            authorAPI.getAuthors()
        ])
        .then(axios.spread((books, authors) => {
            onSuccess(books, 'books-authors-container');
            onSuccess(authors, 'books-authors-container');
        }))
        .catch(onError);
    });
});
```
### 2. Lets do some changes in interceptors to get a better error response.

```diff
(() => {
    axios.interceptors.request.use((config) => {
        console.log(config);
        console.log(config.headers['GEN_TOKEN'] = '000aks1243545iopods');
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    axios.interceptors.response.use((response) => {
        // Do something with data
        console.log(response);
        // TODO: Catch response. Simulate on server different status
        return response;
    }, (error) => {
+       if (error.response && (error.response.status === 405 || error.response.status === 401)) {
+            console.log(error.response.status);
+            console.log(error.response.statusText);
+            window.location = "/index.html";
+        }
+        // When is canceled we get here.
+        return Promise.reject(error);
    });
})();
```

### 3. We have to get the server and mongo running in order to get this working.

To get running mongod

$ mongod
"C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe" --dbpath "D:\mongodb\data"

To get running mongo console
$ mongo

Now we can rtun the server
$ gulp
