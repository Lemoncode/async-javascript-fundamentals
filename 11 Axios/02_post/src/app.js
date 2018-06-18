import * as bookAPI from './API/bookAPI';
import { appendElement, createList } from './view/uiBuilder';

document.addEventListener('DOMContentLoaded', () => {
    const buttonRetrieveBooks = document.getElementById('button-retrieve-books');
    buttonRetrieveBooks.addEventListener('click', (event) => {
        event.stopPropagation();
        bookAPI.getBooks();
    });
    const conatinerAddBookFormSubmit = document.getElementById('container-add-book-form-submit');
    conatinerAddBookFormSubmit.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        const book = {
            title: document.getElementById('title').value,
            author: document.getElementById('author').value,
            genre: document.getElementById('genre').value,
            read: document.getElementById('read').checked
        };
        bookAPI.postBook(book);
    });
});