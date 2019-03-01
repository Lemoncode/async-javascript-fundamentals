## We're going to create a new page that will contain a login form, if we're authenticated, the response will return a JWT, that we will use to call an API. If everythoi

* Lets start by creating a _index.html_

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Axios Interceptors example</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
</head>

<body>
    <form>
        <div class="form-group">
            <label for="username">Username</label>
            <input type="text" class="form-control" id="username">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password">
        </div>
        <button id="login" type="submit">Login</button>
    </form>
    <script src="./src/app.js"></script>
</body>

</html>
```
* Lets create the code to handle this _form_, first we're going to create a new entry in _src/API/loginAPI.js_

```javascript
import axios from 'axios';

export default ({username, password}) => (
    axios.post('http://localhost:8887/login', {username, password})
);
```

* Now it's time handle the UI code, but first we're going to create a new style of handling events, a way that allow us to retun _promises_, create _src/asynApi.js_

```javascript
export const submitButtonPromise = (event, targetId) => (
    new Promise((resolve, _) => {
        document.getElementById(targetId)
            .addEventListener(event, (evt) => {
                evt.stopPropagation();
                evt.preventDefault();
                resolve();
            });
    })
); 
```

* Now we can create _src/app.js_

```javascript
// import { appendElement, createList } from './view/uiBuilder';
import { submitButtonPromise } from './asyncApi';
import login from './API/loginAPI';


const readCredentials = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    return {
        username,
        password,
    };
};

document.addEventListener('DOMContentLoaded', () => {
    submitButtonPromise('click', 'login')
        .then(() => {
            const credentials = readCredentials();
            return login(credentials)
        })
        .then((token) => {
            console.log(token);
        })
        .catch((err) => console.log(err));
});
```
* With our _auth_ server up and running we can check that this is already working.

* Ok, so we're retrieving our token we wan to inject it so lets define _src/API/interceptors.js_

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
```
* Change _src/app.js_ to use the token;

```diff
import { submitButtonPromise } from './asyncApi';
import login from './API/loginAPI';
+import { setUpRequest } from './API/interceptors';

const readCredentials = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    return {
        username,
        password,
    };
};

document.addEventListener('DOMContentLoaded', () => {
    submitButtonPromise('click', 'login')
        .then(() => {
            const credentials = readCredentials();
            return login(credentials)
        })
-       .then((token) => {
+       .then((result) => {
+           const { access_token } = result.data;
+           setUpRequest(access_token);
        })
        .catch((err) => console.log(err));
});
```

* Ok, the next step is check that is already working. Lets add a new button that will call to our secure server. Edit as follows _src/index.html_

```diff
<body>
    <form>
        <div class="form-group">
            <label for="username">Username</label>
            <input type="text" class="form-control" id="username">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password">
        </div>
        <button id="login" type="submit">Login</button>
    </form>
+   <br />
+   <div class="row">
+       <button id="cars" class="btn btn-default col-2">Load cars!</button>
+   </div>
    <script src="./src/app.js"></script>
</body>
```

* Lets edit _src/app.js_ as follows

```javascript
import { submitButtonPromise } from './asyncApi';
import login from './API/loginAPI';
import { setUpRequest } from './API/interceptors';
/*diff*/
import axios from 'axios';
/*diff*/

const readCredentials = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    return {
        username,
        password,
    };
};

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
    /*diff*/
    document.getElementById('cars')
        .addEventListener('click', (event) => {
            event.stopPropagation();
            axios.get('http://localhost:3050/api/cars')
                .then((result) => console.log(result))
                .catch((err) => console.log(err));
        });
    /*diff*/
});
```
* Lets test that is working, with and without authenticaton