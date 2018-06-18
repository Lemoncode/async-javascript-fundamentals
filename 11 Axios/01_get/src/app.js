import * as bookAPI from './API/bookAPI';
import { appendElement, createList } from './view/uiBuilder';

document.addEventListener('DOMContentLoaded', () => {
    const buttonRetrieveBooks = document.getElementById('button-retrieve-books');
        buttonRetrieveBooks.addEventListener('click', (event) => {
            event.stopPropagation();
            bookAPI.getBooks();
        });
});