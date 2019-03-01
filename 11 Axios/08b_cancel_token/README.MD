## In this demo we're going to play with axios cancel token.

* Lets update _src/app.js_

```diff
import { submitButtonPromise } from './asyncApi';
import login from './API/loginAPI';
import { setUpRequest } from './API/interceptors';
import axios from 'axios';

const readCredentials = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    return {
        username,
        password,
    };
};

+const getCars = (cancelSettings) => (
+    axios.get('http://localhost:3050/api/cars', cancelSettings)
+);
+
document.addEventListener('DOMContentLoaded', () => {
    submitButtonPromise('click', 'login')
        .then(() => {
            const credentials = readCredentials();
            return login(credentials)
        })
        .then((result) => {
            const { access_token } = result.data;
            setUpRequest(access_token);
        })
        .catch((err) => console.log(err));

    document.getElementById('cars')
        .addEventListener('click', (event) => {
            event.stopPropagation();
-           axios.get('http://localhost:3050/api/cars')
-               .then((result) => console.log(result))
-               .catch((err) => console.log(err));
        });
});
```

* Now we can edit _app/app.js_ to use a cancel token

```diff
import { submitButtonPromise } from './asyncApi';
import login from './API/loginAPI';
import { setUpRequest } from './API/interceptors';
import axios from 'axios';

const readCredentials = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    return {
        username,
        password,
    };
};

const getCars = (cancelSettings) => (
    axios.get('http://localhost:3050/api/cars', cancelSettings)
);

document.addEventListener('DOMContentLoaded', () => {
    submitButtonPromise('click', 'login')
        .then(() => {
            const credentials = readCredentials();
            return login(credentials)
        })
        .then((result) => {
            const { access_token } = result.data;
            setUpRequest(access_token);
        })
        .catch((err) => console.log(err));

    document.getElementById('cars')
        .addEventListener('click', (event) => {
            event.stopPropagation();
+           const CancelToken = axios.CancelToken;
+           let source = CancelToken.source();
+           getCars({ cancelToken: source.token })
+               .then((result) => console.log(result))
+               .catch((err) => console.log(err));
+                
+           source.cancel();
        });
});
```
* `axios` provides static methods to deal with response in a globally way. Lets update _src/API/interceptors.js_

```javascript
import axios from 'axios';

export const setUpRequest = (token) => {
    axios.interceptors.request.use((config) => {
        config.headers['Authorization'] = `Bearer ${token}`;
        return config;
    }, (err) => {
        return Promise.reject(err);
    });
};

/*diff*/
export const setUpResponse = () => {
    axios.interceptors.response.use((response) => {
        // Do something with data
        console.log(response);
        return response;
    }, (error) => {
        if (err.response && error.response.status === 401) {
            console.log('you are not allowed');
        }
        return Promise.reject(error.response);
    });
}
/*diff*/
```
* Now we can use it into our code. Edit as follows _app/app.js_

```diff
import { submitButtonPromise } from './asyncApi';
import login from './API/loginAPI';
-import { setUpRequest } from './API/interceptors';
+import { setUpRequest, setUpResponse } from './API/interceptors';
import axios from 'axios';

const readCredentials = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    return {
        username,
        password,
    };
};

const getCars = (cancelSettings) => (
    axios.get('http://localhost:3050/api/cars', cancelSettings)
);

document.addEventListener('DOMContentLoaded', () => {
+   setUpResponse();
    submitButtonPromise('click', 'login')
        .then(() => {
            const credentials = readCredentials();
            return login(credentials)
        })
        .then((result) => {
            const { access_token } = result.data;
            setUpRequest(access_token);
        })
        .catch((err) => console.log(err));

    document.getElementById('cars')
        .addEventListener('click', (event) => {
            event.stopPropagation();
            const CancelToken = axios.CancelToken;
            let source = CancelToken.source();
            getCars({ cancelToken: source.token })
                .then((result) => console.log(result))
                .catch((err) => console.log(err));

            source.cancel();
        });
});
```
* Lets give it a try, remind to start _auth_ and _server-in-memory_
* Play invoking _source.cancel()_ and comment this line of code.