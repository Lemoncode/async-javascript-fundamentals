import axios from 'axios';
import { appendElement, createList } from '../view/uiBuilder';

export const getBooks = (err, success) => {
    axios.get('http://localhost:8000/api/books')
        .then(success)
        .catch(err);
};

export const postBook = (book) => (err, success) => {
    axios.post('http://localhost:8000/api/books', book)
        .then(success)
        .catch(err);
};