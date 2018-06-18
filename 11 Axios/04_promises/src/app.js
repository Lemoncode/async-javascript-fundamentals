import * as bookAPI from './API/bookAPI';
import { appendElement, createList } from './view/uiBuilder';

const onSuccess = (result) => {
    let titles = [];
    // Remove data to watch how error is handle.
    result.data.forEach((item) => {
        titles.push(item.title);
    });
    const list = createList(titles);
    appendElement('books-container', list);
};

const onError = (error) => console.log(error);

document.addEventListener('DOMContentLoaded', () => {
    const buttonRetrieveBooks = document.getElementById('button-retrieve-books');
    buttonRetrieveBooks.addEventListener('click', (event) => {
        event.stopPropagation();
        // bookAPI.getBooks(onError, onSuccess);
        bookAPI.getBooks()
            .then(onSuccess)
            .catch(onError);
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
        // bookAPI.postBook(book)
        //     (
        //         onError,
        //         (result) => bookAPI.getBooks(onError, onSuccess)
        //     );
        bookAPI.postBook(book)
            .then(() => bookAPI.getBooks())
            .then(onSuccess)
            .catch(onError);
    });
});