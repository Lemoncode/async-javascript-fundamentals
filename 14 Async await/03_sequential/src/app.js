import { showBooks, functionExpressionShowBooks, fetchFromAPI } from './api/bookAPI';
import { BookApiClient } from './api/BookApiClient';

const show = async () => {
    const [books, authors] = await Promise.all([
        fetchFromAPI('/books/'),
        fetchFromAPI('/authors/'),
    ]);
    
    console.log(`Books: ${books.length}, Authors: ${authors.length}`);
};

show();