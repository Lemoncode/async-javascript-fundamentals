export async function showBooks(url) {
    const response = await fetch(url);
    if (!response.ok) {
        const err = await response.text();
        throw Error(err);
    }
    const body = await response.json();
    return body;
}

export const functionExpressionShowBooks = async () => {
    const url = 'http://localhost:8000/api/books/';
    const response = await fetch(url);
    return await response.json();
}
