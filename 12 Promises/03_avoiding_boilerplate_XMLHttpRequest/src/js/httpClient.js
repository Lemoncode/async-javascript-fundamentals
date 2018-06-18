const ajax = (method, url, args) => (
    new Promise((resolve, reject) => {
        const client = new XMLHttpRequest();
        let uri = url;
        let params;
        // TRIBUTE: https://plainjs.com/javascript/ajax/send-ajax-get-and-post-requests-47/
        if (method === 'POST') {
            params = typeof args == 'string' ? args : Object.keys(args).map(
                (k) => (encodeURIComponent(k) + '=' + encodeURIComponent(args[k]))
            ).join('&');
        }
        client.open(method, uri);
        if (method === 'POST') {
            client.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            client.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }
        client.onload = (event) => {
            // TODO: Check status code.
            const result = JSON.parse(event.target.response);
            resolve(result);
        };
        client.onerror = (event) => {
            // TODO: Check status code.
            const result = JSON.parse(event.target.responseText);
            reject(result);
        };
        if (method === 'POST') {
            client.send(params);
        } else {
            client.send();
        }
    })
);

export const httpClient = {
    'get': (url, args) => ajax('GET', url, args),
    'post': (url, args) => ajax('POST', url, args),
};