## Introduction to async/await

> Reference: https://github.com/parcel-bundler/parcel/issues/871

* Related link to get working async/await transpile https://stackoverflow.com/questions/33527653/babel-6-regeneratorruntime-is-not-defined

### Before steps create project scaffolding

* Create _package.json_, use `npm init` default initialization
* Create _src_ folder on _rootDir_
* Create _index.html_ on _rootDir_

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <script src="./src/app.js"></script>
</body>
</html>

```

* Add dependencies

```bash
$ npm i babel-plugin-transform-runtime babel-runtime parcel -D
```

npm install babel --save-dev @babel/plugin-transform-regenerator
npm install @babel/preset-env --save-dev

* Create _.babelrc_ on _rootDir_

```json
{
    "plugins": [
        ["transform-runtime",
        {
            "polyfill": false,
            "regenerator": true
        }]
    ]
}
```
{
  "presets": ["@babel/preset-env"],  
  "plugins": ["@babel/plugin-transform-regenerator"]
}

* Add _start_ comand to _package.json_

```diff
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
+   "start": "parcel index.html"
},
```

### 1. We are going to create a function that will retrieve the books, from our Book API

* In `src/app.js` we type the following code:

```javascript
function showBooks() {
    const url = 'http://localhost:8000/api/books/';
    fetch(url)
        .then((res) => res.json()) // Parsers as json. Returns a promise
        .then((books) => {
            console.log(books);
        });
}

showBooks();
```
* It returns a collection of books

### 2. Now we are going to transform this code into async / await style.

```diff
-function showBooks() {
+async function showBooks() {
    const url = 'http://localhost:8000/api/books/';
-    fetch(url)
-        .then((res) => res.json()) // Parsers as json. Returns a promise
-        .then((books) => {
-            console.log(books);
-        });
+    const response = await fetch(url);
+    const books = await response.json();
+    console.log(books); 
}

showBooks();
```
* Notice that we have lost the remaining identation that was introduced by the promise style.

### 3. We can also have a sparate module where we can expose the async function.

* Create a new folder `src/api`
* Inside we place `src/api/bookAPI.js`

```javascript
export async function showBooks() {
    const url = 'http://localhost:8000/api/books/';
    const response = await fetch(url);
    // const books = await response.json();
    // return books;
    return await response.json();
}
```

* This function returns a promise, so we can use it inside another async function, or with then.

* So now, in `app.js` we can write as follows. REMOVE the previous content.

```javascript
import { showBooks } from './api/bookAPI';

async function main() {
    const books = await showBooks();
    console.log(books);
}

main();
```

* Or 

```javascript
import { showBooks } from '../js/api/bookAPI';

showBooks()
    .then((books) => {
        console.log(books);
    });
```

### 4. We can transform `showBooks  function` into a function expression. 

```diff src/api/bookAPI 
export async function showBooks() {
    const url = 'http://localhost:8000/api/books/';
    const response = await fetch(url);
    // const books = await response.json();
    // return books;
    return await response.json();
}

+export const functionExpressionShowBooks = async function () {
+    const url = 'http://localhost:8000/api/books/';
+    const response = await fetch(url);
+    return await response.json();
+}
```
* Using a function expression feels the same way.

```diff app.js
import {
    showBooks, 
+    functionExpressionShowBooks 
} from '../js/api/bookAPI';

showBooks()
    .then((books) => {
        console.log(books);
    });
+functionExpressionShowBooks()
+    .then((books) => console.log(books));
``` 

### 5. We can also write the function expression using fat arrow

```diff src/js/api/bookAPI.js
-export const functionExpressionShowBooks = async function () {
+export const functionExpressionShowBooks = async () => {    
    const url = 'http://localhost:8000/api/books/';
    const response = await fetch(url);
    return await response.json();
}
``` 

* Writing a function as a function expression it's important. Function hoisting:
    * https://scotch.io/tutorials/understanding-hoisting-in-javascript
    * http://adripofjavascript.com/blog/drips/variable-and-function-hoisting.html

### 6. We can use this inside a `class`, using `async` keyword on methods declarations.

```javascript src/api/BookApiClient.js
export class BookApiClient {
    async fetchUser() {
        const url = 'http://localhost:8000/api/books/';
        const response = await fetch(url);
        return await response.json();
    }
}
```

### 7. For last, we have to remind that the `await` keyword cannot be declare at top level function, it has to be inside of `async scope`

```diff app.js
import {
    showBooks, 
    functionExpressionShowBooks, 
} from './api/bookAPI';
+import { BookApiClient } from './api/BookApiClient';

-showBooks()
-    .then((books) => {
-        console.log(books);
-    });
-functionExpressionShowBooks()
-    .then((books) => console.log(books));

+(async () => {
+    const bookApiClient = new BookApiClient();
+    const books = await bookApiClient.fetchBooks();
+    console.log(books);
+})();
```
