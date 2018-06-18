import axios from 'axios';
import { appendElement, createList } from '../view/uiBuilder';

export const getBookById = (bookId) => (
    axios.get(`http://localhost:8000/api/books/${bookId}`)
);

export const getBooks = (cancelSettings) => (
    axios.get('http://localhost:8000/api/books', cancelSettings)
);

export const getBooksByParams = (params) => (
    axios.get('http://localhost:8000/api/books', params)
);

export const postBook = (book) => (
    axios.post('http://localhost:8000/api/books', book)
);

export const patchBook = (bookId, book) => (
    axios.patch(`http://localhost:8000/api/books/${bookId}`, book)
);