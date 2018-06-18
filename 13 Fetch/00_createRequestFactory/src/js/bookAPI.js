const createRequest = (url, options) => {
    const _options = (options) ? options : {};
    console.log(_options);
    return fetch(url, _options)
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            } 
            return response.json();
        });
};

const baseURL = 'http://localhost:8000/api/books';

export const retrieveBooks = () => {
    return createRequest(baseURL, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
};

export const retrieveBook = (bookId) => {
    const url = `${baseURL}/${bookId}`;
    return createRequest(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
}