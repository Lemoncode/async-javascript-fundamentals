import axios from 'axios';
import { appendElement, createList } from '../view/uiBuilder';

export const getBooks = () => {
    axios.get('http://localhost/api/books')
        .then((result) => {
            let titles = [];
            result.data.forEach((item) => {
                titles.push(item.title);
            });
            const list = createList(titles);
            appendElement('books-container', list);
        })
        .catch((err) => console.log(err));
};