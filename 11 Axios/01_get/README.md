## In this demo we are going to implement a basic get with `axios`

## 1 Get

### 1. Lets refactor our `bookAPI.js` to retrieve books from server instead of using harcoding data.


```diff bookAPI.js
+import axios from 'axios';
+import { appendElement, createList } from '../view/uiBuilder';
+
export const getBooks = () => {
- return [
-     { title: 'testA', author: 'testA', genre: 'fiction', read: true },
-     { title: 'testB', author: 'testB', genre: 'fiction', read: true }
- ];
+    axios.get('http://localhost/api/books')
+        .then((result) => {
+           let titles = [];
+            result.data.forEach((item) => {
+              titles.push(item.title);
+            });
+          const list = createList(titles);
+           appendElement('books-container', list);
+      })
+        .catch((err) => console.log(err));
};
```

```diff app.js
import * as bookAPI from './API/bookAPI';
import { appendElement, createList } from './view/uiBuilder';

document.addEventListener('DOMContentLoaded', () => {
    const buttonRetrieveBooks = document.getElementById('button-retrieve-books');
        buttonRetrieveBooks.addEventListener('click', (event) => {
            event.stopPropagation();
+            bookAPI.getBooks();
-            const books = bookAPI.getBooks()
-                .map(b => `${b.title}, ${b.author}`);
-            const bookList = createList(books);
-            appendElement('books-container', bookList);
        });
});
```

### 2. We have to get the server and mongo running in order to get this working.

* To get running mongod

$ mongod
"C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe" --dbpath "D:\mongodb\data"

To get running mongo console
$ mongo

Now we can rtun the server
$ gulp
