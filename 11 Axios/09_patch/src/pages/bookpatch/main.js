import { 
    createElement, 
    cleanElement,
    appendElement 
} from '../../view/uiBuilder';
import * as bookAPI from '../../API/bookAPI';

const hasValue = (id) => document.getElementById(id).value !== '';
const getValueById = (id) => document.getElementById(id).value;
const generateProperty = (book, propertyValue, propertyName) => {
    if(!!propertyValue) {
        book[propertyName] = propertyValue;
    }
};

const parseBook = () => {
    const book = {};
    let title,
        author,
        genre;

    generateProperty(
        book,
        title = hasValue('title') && getValueById('title'),
        'title'
    );

    generateProperty(
        book,
        author = hasValue('author') && getValueById('author'),
        'author'
    );

    generateProperty(
        book,
        genre = hasValue('genre') && getValueById('genre'),
        'genre'
    );

    book.read = document.getElementById('read').checked;

    return book;
};

const modifiedBookHandler = (result) => {
    cleanElement('books-container');
    const modifiedBook = createElement(result.data);
    appendElement('books-container', modifiedBook);
};

const patchHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    // Retrieve this _id from database
    const bookId = document.getElementById('_id').value;
    const book = parseBook();
    
    bookAPI.patchBook(bookId, book)
        .then(bookAPI.getBookById(bookId))
        .then(modifiedBookHandler)
        .catch((err) => console.log(err))
}; 

document.addEventListener('DOMContentLoaded', () => {
    const patchBookSubmit = document.getElementById('container-patch-book-form-submit');
    patchBookSubmit.addEventListener('click', patchHandler);
});