export class BookApiClient {
    async fetchBooks() {
        const url = 'http://localhost:8000/api/books/';
        const response = await fetch(url);
        return await response.json();
    }
}
