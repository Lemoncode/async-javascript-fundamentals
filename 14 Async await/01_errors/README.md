## In this demo we are going to show how to treat errors with `async/await`

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

### 1. Let's feed the url as parameter in `src/api/bookAPI.js`

```javascript
export async function showBooks(url) {
    const response = await fetch(url);
    return await response.json();
}
```
* Now we can modify `app.js`

```javascript
import { 
     showBooks
} from './api/bookAPI';

const url = `http://localhost:8000/api/boos/`; // Wrong url.
showBooks(url).then((books) => console.log(books));
```
* If we run this, we got an exception and undefined value.
* Run the app, open dev tools and show results.

### 2. Now lets handle the error inside the function

```diff javascript
export async function showBooks(url) {
    const response = await fetch(url);
+    const body = await response.json();
-    return await response.json();
+    return body;
}
```

* Automatically rejects the promise, because of 'throw Error' 

* Now here we have two different scenarios:

```javascript
const url = `http://localhost:8000/api/boos/`; // Wrong url. // 
const url2 = `http://localhost:8000/api/books/5
```

* The first one no internal route it's handle by our code (no controller responds to that route). In this case there is not response error handle from 

* In the second case, the response it's handle from our controller's code sending to us a 500. 

* With url2 we got the following message:

```javascript 
{message: "Cast to ObjectId failed for value "5" at path "_id" for model "Book"", name: "CastError", stringValue: ""5"", kind: "ObjectId", value: "5", …}
```
* This not what we want, we want to reject the promise with the error message.

### 3. We can reject the promise as follows

```diff src/js/api/bookAPI
export async function showBooks(url) {
    const response = await fetch(url);
    const body = await response.json();
+    // Automatically rejects the promise, because of 'throw Error'
+    if (!response.ok) {
+        const err = await response.text();
+        throw Error(err);
+    }
+    
    return body;
}
```

```diff app.js
import { 
     showBooks
} from './api/bookAPI';

const url = `http://localhost:8000/api/boos/`; // Wrong url. // 
const url2 = `http://localhost:8000/api/books/5` // Wrong bookId
showBooks(url2)
    .then((books) => console.log(books))
+    .catch((err) => console.log(err.message));
```
* This works because an async function will automatically reject a promise when throws an error.

### 4. Another approach that we can use it's use try/catch blocks. This it's nice because gives to us a bigger flexibility.

```diff app.js
import { 
     showBooks
} from './api/bookAPI';

const url = `http://localhost:8000/api/boos/`; // Wrong url. // 
const url2 = `http://localhost:8000/api/books/5` // Wrong bookId
-showBooks(url2)
-    .then((books) => console.log(books))
-    .catch((err) => console.log(err.message));
+(async () => {
+    try {
+        const response = await showBooks(url2);
+    } catch (error) {
+        console.log(error.message);
+    }
+})();

```
