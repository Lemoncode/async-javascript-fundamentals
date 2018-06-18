import * as bookAPI from './API/bookAPI';
import * as authorAPI from './API/authorAPI';
import axios from 'axios';
import { appendElement, createList } from './view/uiBuilder';

const onSuccessBooks = (result, container) => {
    let titles = [];
    // Remove data to watch how error is handle.
    result.data.forEach((item) => {
        titles.push(item.title);
    });
    const list = createList(titles);
    appendElement(container, list);
};

const onSuccessAuthors = (result, container) => {
    let titles = [];
    // Remove data to watch how error is handle.
    result.data.forEach((item) => {
        titles.push(`${item.name} ${item.lastName}`);
    });
    const list = createList(titles);
    appendElement(container, list);
};

const onError = (error) => console.log(error);

document.addEventListener('DOMContentLoaded', () => {
    const buttonRetrieveBooks = document.getElementById('button-retrieve-books');
    buttonRetrieveBooks.addEventListener('click', (event) => {
        event.stopPropagation();
        bookAPI.getBooks()
            .then((result) => onSuccessBooks(result, 'books-container'))
            .catch(onError);

        source.cancel('I am canceled!');
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
        bookAPI.postBook(book)
            .then(() => bookAPI.getBooks())
            .then((result) => onSuccessBooks
                (result, 'books-container'))
            .catch(onError);
    });

    const buttonRetrieveBooksAndAuthors = document.getElementById('books-authors-container');
    buttonRetrieveBooksAndAuthors.addEventListener('click', (event) => {
        event.stopPropagation();
        axios.all([
            bookAPI.getBooks(),
            authorAPI.getAuthors()
        ])
            .then(axios.spread((books, authors) => {
                onSuccessBooks(books, 'books-authors-container');
                onSuccessAuthors(authors, 'books-authors-container');
            }))
            .catch(onError);
    });
});