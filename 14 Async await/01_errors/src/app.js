import { showBooks, functionExpressionShowBooks } from './api/bookAPI';
import { BookApiClient } from './api/BookApiClient';

const url = 'http://localhost:8000/api/boos';
const url2 = 'http://localhost:8000/api/books/5';

// showBooks(url)
//     .then((books) => console.log(books))
//     .catch((err) => console.log(err));
(async () => {
    try {
        const response = await showBooks(url2);
    } catch (error) {
        console.log(error);
    }
})();
