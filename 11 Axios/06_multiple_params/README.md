## 6 Get Multiple Params

### 1. Now we are going to perform a get operation with multiple params. With that on mind lets add a new page `src/pages/booksearch.html`

```html
<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">
  <title>LEMONCODE 16/17 Async JavaScript</title>
  <link rel="stylesheet" href="../content/site.css">
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body>
  <h2>Book search</h2>
  <div clas="container-add-book">
    <form>
      Title:</br>
      <input type="text" id="title" name="title" />
      </br>

      Genre:</br>
      <input type="text" id="genre" name="genre" />
      </br>

      Author:</br>
      <input type="text" id="author" name="author" />
      </br>
    </form>
  </div>
  <div id="books-container" class="container">
    <button id="button-search-books">Search books</button>
  </div>
  <script src="./booksearch/main.js"></script>
</body>
</html>
```


### 2. Lets add an anchor to this page on ./index.html

```html
<a href="./src/pages/booksearch.html">Book search</a>
```

### 3. Now we have to modify our bookAPI.js, with a new operation, that carries the params to the server.

Edit __.src\API\bookAPI.js__

```diff
import axios from 'axios';

const baseUrl = 'http://localhost:8000';

export const getBooks = () => axios.get(`${baseUrl}/api/books/`);
+
+export const getBooksByParams = (params) => axios.get(`${baseUrl}/api/books/`, params);
+
export const postBook = (book) => axios.post(`${baseUrl}/api/books/`, book);
```

### 4. Create a new file pages/booksearch/main.js. This file will handle the retrieving params for our new operation.

```javascript
import * as bookAPI from '../../API/bookAPI';
import { appendElement, createList } from '../../view/uiBuilder';

const onSuccess = (result, container) => {
    // Remove data to watch how error is handle
    appendElement(
        container, 
        createList(
            result.data.map((i) =>i.title)
        )
    );
};

const onError = (error) => console.log(error);

const parseParams = () => {
    let obj = { params: {} };

    if(document.getElementById('title').value !== '') obj.params.title = document.getElementById('title').value;
    if(document.getElementById('author').value !== '') obj.params.author = document.getElementById('author').value;
    if(document.getElementById('genre').value !== '') obj.params.genre = document.getElementById('genre').value;

    return obj;
  };

document.addEventListener('DOMContentLoaded', () => {
    const buttonSearchBooks = document.getElementById('button-search-books');
    buttonSearchBooks.addEventListener('click', (event) => {
        event.stopPropagation();
        bookAPI.getBooksByParams(parseParams())
        .then((result) => onSuccess(result, 'books-container'))
        .catch(onError);
    });
});
```

### 5. We have to get the server and mongo running in order to get this working.

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
