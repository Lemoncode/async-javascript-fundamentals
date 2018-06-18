## In this demo we are going to create a bookAPI.js that will use the native fetch.

### 1. Let's create the bookAPI.js

```diff
-const createRequest = (url, options) => {
-    const _options = (options) ? options : {};
-    console.log(_options);
-    return fetch(url, _options)
-        .then((response) => {
-            if (response.ok) {
-                return response.json();
-            }
-        });
-};

const baseURL = 'http://localhost:8000/api/books';


-export const retrieveBooks = () => {
-    return createRequest(url, {
-        method: 'GET',
-        mode: 'cors',
-        headers: {
-            'Accept': 'application/json',
-            'Content-Type': 'application/json'
-        },
-    });
-};
-
-export const retrieveBook = (bookId) => {
-    const url = `${baseURL}/${bookId}`;
-    return createRequest(url, {
-        method: 'GET',
-        mode: 'cors',
-        headers: {
-            'Accept': 'application/json',
-            'Content-Type': 'application/json'
-        },
-    });
-}
+const requestOptionsFactory = (headers) => (...args) => {
+    const [method, mode] = [...args];
+    return {
+        method,
+        mode,
+        headers
+    };
+};
+const requestJson = requestOptionsFactory(new Headers({ 'Content-Type': 'application/json' }));
+
+const handleErrors = (response) => {
+    if (!response.ok) {
+        throw Error(response.statusText);
+    }
+    return response;
+};
+
+const fetchJson = (request) => fetch(request)
+    .then(handleErrors)
+    .then((response) => response.json());
+
+export const retrieveBooks = () => {
+    return fetchJson(
+        new Request(baseURL, requestJson('GET', 'cors'))
+    );
+};
+
+export const retrieveBook = (bookId) => {
+    const url = `${baseURL}/${bookId}`;
+    return fetchJson(
+        new Request(url, requestJson('GET', 'cors'))
+    );
+};
```
* Notice that fetch is prepared to always a promise, even the success result.

### 4. Now let's define the main.js

```javascript
import * as bookAPI from './bookAPI';

document.addEventListener('DOMContentLoaded', () => {
  const buttonRetrieveBooks = document.getElementById('button-retrieve-books');
  buttonRetrieveBooks.addEventListener('click', (event) => {
    event.stopPropagation();
    api.bookService.retrieveBook('noexists')
      .then((result) => console.log(result))
      .catch((err) => console.log(err.message));
  });
});

```