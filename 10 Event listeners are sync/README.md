## In this demo we are going to work with Event Listeners.
* Folder structure:

10 Web Workers/
├── src/
│   ├── content/
|   |   ├── site.css
│   ├── js/
|   |   ├── main.js
│   ├── index.html
├── package.json

* Start from previous code demo.

## Steps.

### 1. Refactor the `index.html` for our demo.

```diff html
<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">
  <title>LEMONCODE 16/17 jQuery</title>
  <link rel="stylesheet" href="content/site.css">
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>

<body>
  <h1>API Rest</h1>
-  <!-- HTML5 element to show progress -->
-  <progress id="worker-progress" value="0" max="100"></progress>
-  <script src="./js/background.js"></script>
+  <button id="btn">Click me!!</button>
+  <script src="./js/main.js"></script>
</body>
</html>

```

### 2. Lets change our `site.css`, for this demo. 

```diff site.css
@import url('https://fonts.googleapis.com/css?family=Raleway');

-body {
-  font-family: 'Raleway', sans-serif;
-}
-
-.container {
-  padding: 2em;
-}
-
-.container p {
-  max-width: 70%;
-  font-size: 0.9em;
-  margin-top: 0.2em;
-  margin-bottom: 0.2em;
-  height: 2.3em;
-}
-
-.container p img {
-  max-width: 95%;
-  max-height: 95%;
-  position: relative;
-  top: 0.7em;
-  left: 1em;
-}

-.container ul {
-  list-style: none;
-}
-
-progress {
-  width: 80%;
-  height: 20px;
-  -webkit-appearance: none;
-}
-
-progress::-webkit-progress-bar {
-  background: lightgrey;
-  border-radius: 50px;
-  border: 1px solid gray;
-}
-
-progress::-webkit-progress-value {
-  background: #31C6F7;
-  border-radius: 50px;
-}
-
```
### 3. Now we can add `main.js`

```javascript main.js
(function () {
  const btn = document.getElementById('btn');

  btn.addEventListener('click', function () {
    console.log('click-1');
  });

  btn.addEventListener('click', function () {
    console.log('click-2');
  });

  setTimeout(function () {
    console.log('pre-click');
    btn.click(); // De manera síncrona, llama a cada uno de los handlers.
    console.log('post-click');
  }, 0);
})();

```
### Challanege -> ¿Cuantos programas pequeños tenemos aquí? // 2
###¿Y cuando lo ejecutemos que se verá en la consola? // pre-click click-1 click-2 post-click

* Lo normal es tender a pensar que hubiera 3 o 4 pequeños programas. Habría 4, si los EventListeners fueran disparados de manera asíncrona, pero los EventListeners son disparados de forma síncrona.

* Tiene que ser así básicamente, para poder lanzar otra iteración del mismo evento.

* NOTA: En el debugger nos podemos cercionar de ello, porque ambos estan en el call stack.

### 4. Alternative `main.js` code.

```javascript
(() => {
    const btn = document.getElementById('btn');
    const logger = (message) => (evt) => {
        evt.stopPropagation();
        console.log(message);
    };
    btn.addEventListener('click', logger('first click'));
    btn.addEventListener('click', logger('second click'));

    setTimeout(() => {
        console.log('pre-click');
        btn.click();
        console.log('post-click');
    }, 0);
})();
```
