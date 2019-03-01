## In this demo we are going to create a bookAPI.js that will use the native fetch.

### 1. We can notice that there is boilerplate, we can refactor this in order to avoid duplicated code.

```diff
- const createRequest = (url, options) => {
-     const _options = options || {};
-     return fetch(url, _options)
-         .then((response) => {
-             if(!response.ok) {
-                 throw Error(response.statusText);
-             }
-             return response.json();
-         });
- };
+const requestOptionsFactory = (headers) => (...args) => {
+    const [method, mode, body] = [...args];
+    return {
+        method,
+        mode,
+        body,
+        headers,
+    };
+};
+
+const requestJson = requestOptionsFactory(new Headers({ 'Accept': 'application/json' }));
+
+const handleErrors = (response) => {
+    if(!response.ok) {
+        throw Error(response.statusText);
+    }
+    return response;
+};
+
+const fetchJson = (request) => fetch(request)
+   .then(handleErrors)
+   .then((response) => response.json());
+
const baseUrl = 'http://localhost:8000/api/books';
+
- export const retrieveBooks = () => {
-     const url = baseUrl;
-     return createRequest(url, {
-         method: 'GET',
-         mode: 'cors',
-         headers: {
-             'Accept': 'application/json',
-         }
-     });
- };
+export const retrieveBooks = () => (
+    fetchJson(
+        new Request(baseUrl, requestJson('GET', 'cors'))
+    )
+); 
+
- export const retrieveBook = (bookId) => {
-     const url = `${baseUrl}/${bookId}`;
-     return createRequest(url, {
-         method: 'GET',
-         mode: 'cors',
-         headers: {
-             'Accept': 'application/json',
-         }
-     });
- };
+export const retrieveBook = (bookId) => {
+    const url = `${baseUrl}/${bookId}`;
+    return fetchJson(
+        new Request(url, requestJson('GET', 'cors'))
+    );
+}
+
- export const addBook = (book) => {
-     const url = baseUrl;
-     return createRequest(url, {
-         method: 'POST',
-         body: JSON.stringify(book),
-         mode: 'cors',
-         headers: {
-             'Content-Type': 'application/json',
-             'Accept': 'application/json'
-         }
-     });
- } 
+export const addBook = (book) => {
+    const url = baseUrl;
+    const body = JSON.stringify(book);
+    return fetchJson(
+        new Request(
+            url,
+            requestOptionsFactory({
+                'Accept': 'application/json',
+                'Content-Type': 'application/json',
+            })(
+                'POST',
+                'cors',
+                body
+            )
+        )
+    )
+};

```
* Notice that fetch is prepared to always a promise, even the success result.

### 4. main.js should look as follow 

```javascript
import * as bookAPI from './bookAPI';
import * as uiBuilder from './uiBuilder';

const retrieveFormValues = () => ({
    title: document.getElementById('title').value,
    genre: document.getElementById('genre').value,
    author: document.getElementById('author').value,
});

document.addEventListener('DOMContentLoaded', () => {
    const buttonRetrieveBooks = document.getElementById('button-retrieve-books');
    buttonRetrieveBooks.addEventListener('click', (event) => {
        event.stopPropagation();
        bookAPI.retrieveBooks()
            .then((result) => {
                console.log(result);
                const list = uiBuilder.createList(result.map((i) => i.title));
                uiBuilder.appendElement('books-container', list);
            }).catch(
                (err) => console.log(err)
            );
    });
    
    const buttonAddBook = document.getElementById('container-add-book-form-submit');
    buttonAddBook.addEventListener('click', (event) => {
        event.stopPropagation();
        event.preventDefault();
        const book = retrieveFormValues();
        bookAPI.addBook(book)
            .then((result) => console.log(result))
            .catch((err)  => console.log(err));
    });
});

```