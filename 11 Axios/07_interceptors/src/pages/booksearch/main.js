import * as bookAPI from '../../API/bookAPI';
import { appendElement, createList } from '../../view/uiBuilder';

const onSuccess = (result, container) => {
    let titles = [];
    // Remove data to watch how error is handle.
    result.data.forEach((item) => {
        titles.push(item.title);
    });
    const list = createList(titles);
    appendElement(container, list);
};

const onError = (error) => console.log(error);

const parseParams = () => {
    let obj = { params: {} };

    if(document.getElementById('title').value !== '') obj.params.title = document.getElementById('title').value;
    if(document.getElementById('author').value !== '') obj.params.author = document.getElementById('author').value;
    if(document.getElementById('genre').value !== '') obj.params.genre = document.getElementById('genre').value;

    return obj;
  };

document.addEventListener('DOMContentLoaded', () => {
    const buttonSearchBooks = document.getElementById('button-search-books');
    buttonSearchBooks.addEventListener('click', (event) => {
        event.stopPropagation();
        bookAPI.getBooksByParams(parseParams())
        .then((result) => onSuccess(result, 'books-container'))
        .catch(onError);
    });
});