export async function showBooks() {
    const url = 'http://localhost:8000/api/books/';
    const response = await fetch(url);
    // const books = await response.json();
    // return books;
    return await response.json();
}

export const functionExpressionShowBooks = async () => {
    const url = 'http://localhost:8000/api/books/';
    const response = await fetch(url);
    return await response.json();
}
