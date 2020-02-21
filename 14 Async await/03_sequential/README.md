## In this demo we want to make consecutive calls to our API.

> Remember to have up and running api server:

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

* Development URL: http://localhost:8000/api/books/


### 1. Let's change the `src/js/api/bookAPI.js` (Remove previous code)

```javascript
export async function fetchFromApi(endpoint) {
    const url = `http://localhost:8000/api${endpoint}`;
    const response = await fetch(url); // ok
    return await response.json();
}
```

### 2. What we want it's to make two consecutive calls. We can achieve this behavior, just waiting for each call.

* To  show that the requests are made sequentially, we can open the developer tools and watch the network and the spend time on each request.

```javascript app.js
import { 
    fetchFromApi 
} from './api/bookAPI';

const showBooksAndAuthors = async () => {
    const books = await fetchFromApi(`/books/`);
    const authors = await fetchFromApi(`/authors/`);

    console.log(books);
    console.log(`${authors.lenght} authors`);
};

showBooksAndAuthors();
```

### 3. To make this on parallel, we can refactor this to achieve this behavior.

```diff app.js
import { 
    fetchFromApi 
} from './api/bookAPI';

const showBooksAndAuthors = async () => {
-    const books = await fetchFromApi(`/books/`);
-    const authors = await fetchFromApi(`/authors/`);

+    const booksPromise = fetchFromApi(`/books/`);
+    const authorsPromise = fetchFromApi(`/authors/`);
+    
+    /* At this point both request are running on parallel. This way
+     bot are thrown in parallel. The time that it takes will be the
+    longer one in both requests. */
+
+    const books = await booksPromise;
+    const authors = await authorsPromise;

    console.log(books);
    console.log(`${authors.lenght} authors`);
};

showBooksAndAuthors();
```
* Open the developer tools to watch this behavior.
