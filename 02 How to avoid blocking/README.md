## In order to get the code working:

* Open terminal at the same level as `package.json`, and type:
```bash
$ npm install
```
* After installation, we can run the application using:
```bash
$ npm install
```
* To get results on the open browser app:
    * house: `House Lannister of Casterly Rock`
    * character input: `Jaime Lannister`

## In this demo we are going to stablish the blocking nature of JavaScript

## Steps.

### 1. Open `src/js/apiIceAndFire.js`

```diff
const sendGetRequest = (req, url) => {
-   req.open('get', url, true);
+   req.open('get', url, false);
    req.send();
};

```
* This way `XHR` work SYNC.

### 2. Now if we change these values again we can watch that goes on parallel

```diff apiIceAndFire.js
const sendGetRequest = (req, url) => {
+   req.open('get', url, true);
-   req.open('get', url, false);
    req.send();
};

```
* Open and show results on developer tools.
