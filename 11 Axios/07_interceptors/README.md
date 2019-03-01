## 7 Axios interceptors

### 1. In this example we are going to use interceptors. Interceptors allows us to access the request before is sent, and handle the response before our service handle it. For that purpose we have to add a new page `src/pages/access.html`

```html
<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">
  <title>LEMONCODE 16/17 Async JavaScript jQuery</title>
  <link rel="stylesheet" href="../content/site.css">
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body>
  <h2>Access page</h2>
  <h3>The access is random so good luck!!</h3>
  <div id="container" class="container">
    <button id="button-access">Get access</button>
  </div>

  <script src="./access/main.js"></script>
</body>
</html>
```

### 2. On index.html, create a new link for the new page.

```html
<a href="./src/pages/access.html">Access</a>
```

### 3. Create a new service on API folder called accessAPI.js

```javascript
import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

export const grantAccess = () => (
    axios.get(`${BASE_URL}/api/access`)
);
```

### 4. Create a new method on uiBuilder.js

```diff
export const createList = (elements) => {
    let list = document.createElement('ul');

    elements.forEach((element) => {
        let listItem = document.createElement('li');
        listItem.appendChild(document.createTextNode(element)); // Use mapper here, to extract and format data.
        list.appendChild(listItem);
    });
    return list;
};

export const appendElement = (target, item) => {
    document.getElementById(target).appendChild(item);
};

+export const createTextEntry = (text) => {
+    let textEntry = document.createElement('p');
+    textEntry.appendChild(document.createTextNode(text));
+    return textEntry;
+};
```

### 5. Create a handler for the access page for that we create a new folder `src/pages/access/main.js`

```javascript
import * as accessAPI from '../../API/accessAPI';
import {createTextEntry, appendElement} from '../../view/uiBuilder';

document.addEventListener('DOMContentLoaded', () => {
    const buttonAccess = document.getElementById('button-access');
    buttonAccess.addEventListener('click', (event) => {
        event.stopPropagation();
        accessAPI.grantAccess()
            .then((result) => {
                const text = createTextEntry(result.data.message);
                appendElement('container', text);
            })
            .catch((err) => console.log(err));
    });
});
```

### 6. Lets create our interceptor for requests and responses. `src/API/interceptors.js`

```javascript
import axios from 'axios';

const setUp = () => {
    axios.interceptors.request.use((config) => {
        config.headers['GEN_TOKEN'] = '000aks1243545iopods'
        return config;
    }, (err) => {
        return Promise.reject(err);
    });
    
    axios.interceptors.response.use((response) => {
        // Do something with data
        console.log(response);
        // TODO: Catch response. Simulate on server different status
        return response;
    }, (error) => {
        console.log(error.response.status);
        console.log(error.response.statusText);
        window.location = "/index.html"; // Play with both
        //return Promise.reject(error.response);
    });
};

export default setUp;
```

### 7. Do not forgive to put the reference to interceptors on src/API/accessAPI.js

```diff
import axios from 'axios';
+import setUp from './interceptors';
+setUp();

export const grantAccess = () => (
    axios.get('http://localhost:8000/api/access')
);
```

To get running mongod

$ mongod
"C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe" --dbpath "D:\mongodb\data"

To get running mongo console
$ mongo

Now we can rtun the server
$ gulp
