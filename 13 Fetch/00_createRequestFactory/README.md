## In this demo we are going to create a bookAPI.js that will use the native fetch.

> Reference: https://medium.com/@shahata/why-i-wont-be-using-fetch-api-in-my-apps-6900e6c6fe78
> Reference: https://www.tjvantoll.com/2015/09/13/fetch-and-errors/

### 1. Create project scaffolding

* Create _src_ folder on _<rootDir>_
* Create _src/content_
* Create _src/js_
* Generate _package.json_, use `npm init` default initialization.
* Install related dependencies
```bash
$ npm i parcel -D
```

### 2. Create index.html on rootDir and src/content/site.css

```javascript
<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Async fetch</title>
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

```css
@import url('https://fonts.googleapis.com/css?family=Raleway');

body {
  font-family: 'Raleway', sans-serif;
}

.container {
  padding: 2em;
}
```

### 3. Create uiBuilder.js in src/js

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

### 4. Let's create the bookAPI.js in src/js

* We need server up and running on server root 

```bash
$ npm start
```

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
    const url = baseUrl;
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

### 5. Now let's define the src/js/main.js and check that is working on happy path

```javascript
import * as bookAPI from './bookAPI';
import * as uiBuilder from './uiBuilder';

document.addEventListener('DOMContentLoaded', () => {
    const buttonRetrieveBooks = document.getElementById('button-retrieve-books');
    buttonRetrieveBooks.addEventListener('click', (event) => {
        event.stopPropagation();
        bookAPI.retrieveBooks()
            .then((result) => {
                const list = uiBuilder.createList(result.map((i) => i.title));
                uiBuilder.appendElement('books-container', list);
            }).catch(
                (err) => console.log(err)
            );
    }); 
});
```

### 6. To get this up and running lets define start in package.json

```diff
....
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
+   "start": "parcel index.html"
},
....
```

### 7. Now what will happen if we force an error, lets see it.

```diff
document.addEventListener('DOMContentLoaded', () => {
    const buttonRetrieveBooks = document.getElementById('button-retrieve-books');
    buttonRetrieveBooks.addEventListener('click', (event) => {
        event.stopPropagation();
-       bookAPI.retrieveBooks()
-           .then((result) => {
-               const list = uiBuilder.createList(result.map((i) => i.title));
-               uiBuilder.appendElement('books-container', list);
-           }).catch(
-               (err) => console.log(err)
-           );
+        bookAPI.retrieveBook('noexists')
+            .then((result) => console.log(result))
+            .catch(
+                (err) => console.log(err)
+            );
    }); 
});
```

* Why I have an error on console? Discuss with students.

### 8. Now lets create a new book, lets modify main.js code to retrieve data from form.

```javascript
import * as bookAPI from './bookAPI';
import * as uiBuilder from './uiBuilder';

/*diff*/
const retrieveFormValues = () => ({
    title: document.getElementById('title').value,
    genre: document.getElementById('genre').value,
    author: document.getElementById('author').value,
});
/*diff*/

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
    
    /*diff*/
    const buttonAddBook = document.getElementById('container-add-book-form-submit');
    buttonAddBook.addEventListener('click', (event) => {
        event.stopPropagation();
        event.preventDefault();
        const book = retrieveFormValues();
        console.log(book);
    });
    /*diff*/
});
```

* Ok we have create a new book from book form. 

### 9. Now we can define the request as follows

```javascript bookAPI
/*diff*/
export const addBook = (book) => {
    const url = baseUrl;
    return createRequest(url, {
        method: 'POST',
        body: JSON.stringify(book),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
} 
/*diff*/
```

* Upadate _main.js_ to post book:

```diff
const buttonAddBook = document.getElementById('container-add-book-form-submit');
    buttonAddBook.addEventListener('click', (event) => {
        event.stopPropagation();
        event.preventDefault();
        const book = retrieveFormValues();
-       console.log(book);
+       bookAPI.addBook(book)
+           .then((result) => console.log(result))
+           .catch((err)  => console.log(err));
    });
```