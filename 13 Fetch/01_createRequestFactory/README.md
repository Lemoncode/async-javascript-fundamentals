## In this demo we are going to create a bookAPI.js that will use the native fetch.

> Reference: https://medium.com/@shahata/why-i-wont-be-using-fetch-api-in-my-apps-6900e6c6fe78
> Reference: https://www.tjvantoll.com/2015/09/13/fetch-and-errors/

### 1. Let's create the bookAPI.js in src/js

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

const baseUrl = 'http://localhost:8000/api/books';


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
    const url = `${baseUrl}/${bookId}`;
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
* Notice that fetch is prepared to always return a promise, even the success result.

### 2. Now let's define the src/js/main.js and check that is working on happy path

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

### 3. Now what will happen if we force an error, lets see it.

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
> Reference: https://stackoverflow.com/questions/41515732/hide-401-console-error-in-chrome-dev-tools-getting-401-on-fetch-call

### 4. Now lets create a new book, lets modify main.js code to retrieve data from form.

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

### 5. Now we can define the request as follows

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