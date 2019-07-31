## We're going to create a new page that will contain a login form, if we're authenticated, the response will return a JWT, that we will use to call an API. If everything goes fine we well allow to access to server resources.

* For this demo we will create a new project.

```
npm init -y
```

```
npm i axios -S
```

```
npm i parcel -D
```

* Lets start by creating _index.html_ in root folder solution.

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

* All our solution code will be placed in __src__ folder. Create this folder in root folder solution.

* Lets create the code to handle this _form_, first we're going to create a new entry in _src/API/loginAPI.js_

```javascript
import axios from 'axios';

export default ({username, password}) => (
    axios.post('http://localhost:8887/login', {username, password})
);
```

* Now it's time handle the UI code, but first we're going to create a new style for handling events, we're going o create an event emitter. Create __src/eventEmitter.js__ 

```javascript
const observer = () => {
    const observers = [];
    return {
        subscribe(f) {
            observers.push(f);
        },
        unsubscibe(f) {
            observers = observers.filter((subscriber) => subscriber !== f);
        },
        notify(data) {
            observers.forEach((observer) => observer(data));
        }
    }
};

export const eventSubscription = (targetId) => (event) => {
    const eventTarget = document.getElementById(targetId);
    
    let obs = observer();

    eventTarget.addEventListener(event, (evt) => {
        evt.stopPropagation();
        evt.preventDefault();
        obs.notify(evt);
    });

    return obs;
}

```

* Now we can create _src/app.js_

```javascript
import { eventSubscription } from './eventEmitter';
import login from './API/loginAPI';

const readCredentials = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    return {
        username,
        password
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const submitButton = eventSubscription('login');
    submitButton('click').subscribe(() => {
        const credentials = readCredentials();
        login(credentials)
            .then(({data}) => {
                console.log(data);
            })
            .catch(err => console.log(err));
    });
});
```

* Modify __package.json__ to start our app

```diff
{
  "name": "temp_auth_review",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
+   "start": "parcel index.html",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "axios": "^0.19.0"
  },
  "devDependencies": {
    "parcel": "^1.12.3"
  }
}

```

* With our _auth_ server up and running we can check that this is already working.

* Ok, so we're retrieving our token we want to inject it so lets define _src/API/interceptors.js_

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
import { eventSubscription } from './eventEmitter';
import login from './API/loginAPI';
+import { setUpRequest } from './API/interceptors';

const readCredentials = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    return {
        username,
        password
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const submitButton = eventSubscription('login');
    submitButton('click').subscribe(() => {
        const credentials = readCredentials();
        login(credentials)
-           .then(({data}) => {
+           .then(({data}) => {
+               const { access_token } = data;
+               setUpRequest(access_token);
+           })
            .catch(err => console.log(err));
    });
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
import { eventSubscription } from './eventEmitter';
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
        password
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const submitButton = eventSubscription('login');
    submitButton('click').subscribe(() => {
        const credentials = readCredentials();
        login(credentials)
            .then(({data}) => {
                const { access_token } = data;
                setUpRequest(access_token);
            })
            .catch(err => console.log(err));
    });
    /*diff*/
    const loadCarsButton = eventSubscription('cars');
    loadCarsButton('click').subscribe(() => {
        axios.get('http://localhost:3050/api/cars')
            .then((result) => console.log(result))
            .catch((err) => console.log(err));
    });
    /*diff*/
});
```
* Lets test that is working, with and without authenticaton