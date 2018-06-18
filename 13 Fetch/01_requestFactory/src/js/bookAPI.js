const baseURL = 'http://localhost:8000/api/books';

const requestOptionsFactory = (headers) => (...args) => {
    const [method, mode] = [...args];
    return {
        method,
        mode,
        headers
    };
};
const requestJson = requestOptionsFactory(new Headers({ 'Content-Type': 'application/json' }));

const handleErrors = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
};

const fetchJson = (request) => fetch(request)
    .then(handleErrors)
    .then((response) => response.json());

export const retrieveBooks = () => {
    return fetchJson(
        new Request(baseURL, requestJson('GET', 'cors'))
    );
};

export const retrieveBook = (bookId) => {
    const url = `${baseURL}/${bookId}`;
    return fetchJson(
        new Request(url, requestJson('GET', 'cors'))
    );
};
