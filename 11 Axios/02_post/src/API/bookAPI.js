import axios from 'axios';
import { appendElement, createList } from '../view/uiBuilder';

const errorHandler = (err) => console.log(err);

export const getBooks = () => {
    axios.get('http://localhost:8000/api/books')
        .then((result) => {
            let titles = [];
            result.data.forEach((item) => {
                titles.push(item.title);
            });
            const list = createList(titles);
            appendElement('books-container', list);
        })
        .catch(errorHandler);
};

export const postBook = (book) => {
    axios.post('http://localhost:8000/api/books', book)
        .then(() => getBooks())
        .catch(errorHandler);
};