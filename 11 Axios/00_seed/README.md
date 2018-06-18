## 0 Base

### 1. We are going to start our examples from here. For that purpose we have this folder structure


 |--src
 |  |-- API
 |  |-- content
 |  |-- view
 |--|-- app.js
 |--index.html

 ### 2. We start from a mock service. And just verify we can  render the list of books

 ```javascript src/API/bookAPI.js
 export const getBooks = () => {
    return [
        { title: 'testA', author: 'testA', genre: 'fiction', read: true },
        { title: 'testB', author: 'testB', genre: 'fiction', read: true }
    ];
};
 ```

 ### 3. The index html looks this way

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="./src/content/site.css">
</head>

<body>
    <div id="books-container" class="container">
        <button id="button-retrieve-books">Retrieve books</button>
    </div>
    <script src="./src/app.js"></script>
</body>

</html>

### 4. app.js has this look

```javascript
import * as bookAPI from './API/bookAPI';
import { appendElement, createList } from './view/uiBuilder';

document.addEventListener('DOMContentLoaded', () => {
    const buttonRetrieveBooks = document.getElementById('button-retrieve-books');
        buttonRetrieveBooks.addEventListener('click', (event) => {
            event.stopPropagation();
            const books = bookAPI.getBooks()
                .map(b => `${b.title}, ${b.author}`);
            const bookList = createList(books);
            appendElement('books-container', bookList);
        });
});
```
