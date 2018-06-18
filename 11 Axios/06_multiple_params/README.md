## 6 Get Multiple Params

### 1. Now we are going to performa get operation with multiple params. For that in mind lets add a new page `src/pages/booksearch.html`

```html
<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">
  <title>LEMONCODE 16/17 Async JavaScript jQuery</title>
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


### 2. Lets add an anchor to this page on index.html

```html
<a href="./src/pages/booksearch.html">Book search</a>
```

### 3. Now we have to modify our bookAPI.js, with a new operation, that carries the params to the server.

```diff
import axios from 'axios';
import { appendElement, createList } from '../view/uiBuilder';

export const getBooks = () => (
    axios.get('http://localhost:8000/api/books')
);

+export const getBooksByParams = (params) => (
+    axios.get('http://localhost:8000/api/books', params)
+);

export const postBook = (book) => () => (
    axios.post('http://localhost:8000/api/books', book)
);
```

### 4. Create a new file pages/booksearch/main.js. This file will handle the retrieving params for our new opertion.

```javascript
import * as bookAPI from '../../API/bookAPI';
import { appendElement, createList } from '../../view/uiBuilder';

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

To get running mongod

$ mongod
"C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe" --dbpath "D:\mongodb\data"

To get running mongo console
$ mongo

Now we can run the server
$ gulp
