## In this demo we are going to create a bookAPI.js that will use the native fetch.

> Reference: https://medium.com/@shahata/why-i-wont-be-using-fetch-api-in-my-apps-6900e6c6fe78
> Reference: https://www.tjvantoll.com/2015/09/13/fetch-and-errors/

### 1. Create index.html

```javascript
<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">
  <title>LEMONCODE 17/18 Async JavaScript</title>
  <link rel="stylesheet" href="./src/content/site.css">
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body>
  <h2>Fetch</h2>
  <div clas="container-add-book">
    <!-- TODO: Use label and create styles for this form -->
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
  <div id="books-container" class="container">
    <button id="button-retrieve-books">Retrieve books</button>
  </div>

  <script src="./src/js/main.js"></script>
</body>
</html>

```

### 2. Create uiBuilder.js

```javascript
export const createList = (elements) => {
  let list = document.createElement('ul');

  elements.forEach((element) => {
    let listItem = document.createElement('li');

    listItem.appendChild(document.createTextNode(element)); // Use mapper here, to extract and format data.

    list.appendChild(listItem);
  });

  return list;
};

export const appendElement = (target, item) => {
  document.getElementById(target).appendChild(item);
};
```

### 3. Let's create the bookAPI.js

```javascript
const createRequest = (url, options) => {
    const _options = (options) ? options : {};
    console.log(_options);
    return fetch(url, _options)
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            } 
            return response.json();
        });
};

const baseURL = 'http://localhost:8000/api/books';


export const retrieveBooks = () => {
    return createRequest(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
};

export const retrieveBook = (bookId) => {
    const url = `${baseURL}/${bookId}`;
    return createRequest(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
}
```
* Notice that fetch is prepared to always a promise, even the success result.

### 4. Now let's define the main.js

```javascript
import * as bookAPI from './bookAPI';

document.addEventListener('DOMContentLoaded', () => {
  const buttonRetrieveBooks = document.getElementById('button-retrieve-books');
  buttonRetrieveBooks.addEventListener('click', (event) => {
    event.stopPropagation();
    bookAPI.retrieveBook('noexists')
      .then((result) => console.log(result))
      .catch((err) => console.log(err.message));
  });
});

```