import axios from 'axios';
import { appendElement, createList } from '../view/uiBuilder';

export const getBooks = () => (
    axios.get('http://localhost:8000/api/books')
);

export const postBook = (book) => (
    axios.post('http://localhost:8000/api/books', book)
);