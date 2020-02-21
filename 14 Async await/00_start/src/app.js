import "regenerator-runtime/runtime";
// async function showBooks() {
//     const url = 'http://localhost:8000/api/books/';
//     const response = await fetch(url);
//     const books = await response.json();
//     console.log(books);
// }

// showBooks();
import { showBooks, functionExpressionShowBooks } from './api/bookAPI';
import { BookApiClient } from './api/BookApiClient';
// async function main() {
//     const books = await showBooks();
//     console.log(books);
// }

// main();
// functionExpressionShowBooks()
//     .then((bs) => console.log(bs));
(async() => {
    const bookAPI = new BookApiClient();
    const books = await bookAPI.fetchBooks();
    console.log(books);
})();
