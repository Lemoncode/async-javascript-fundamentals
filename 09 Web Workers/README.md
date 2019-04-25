## In this demo we are going to work with Web Workers.
* Folder structure:

09 Web Workers/
├── src/
│   ├── content/
|   |   ├── site.css
│   ├── js/
|   |   ├── inline.js
|   |   ├── crunchNumbers.js
|   |   ├── background.js
│   ├── index.html
├── package.json

* Start from previous code demo.

## Steps.

### 1. Refactor the `index.html` for our demo.

* Just paste this code.

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
+  <!-- HTML5 element to show progress -->
+  <progress id="worker-progress" value="0" max="100"></progress>
</body>
</html>

```

### 2. Lets change our `site.css`, for this demo. 

```diff site.css
@import url('https://fonts.googleapis.com/css?family=Raleway');

body {
  font-family: 'Raleway', sans-serif;
}

.container {
  padding: 2em;
}

.container p {
  max-width: 70%;
  font-size: 0.9em;
  margin-top: 0.2em;
  margin-bottom: 0.2em;
  height: 2.3em;
}

.container p img {
  max-width: 95%;
  max-height: 95%;
  position: relative;
  top: 0.7em;
  left: 1em;
}

.container ul {
  list-style: none;
}

+progress {
+  width: 80%;
+  height: 20px;
+  -webkit-appearance: none;
+}
+
+progress::-webkit-progress-bar {
+  background: lightgrey;
+  border-radius: 50px;
+  border: 1px solid gray;
+}
+
+progress::-webkit-progress-value {
+  background: #31C6F7;
+  border-radius: 50px;
+}
+
```
### 3. Lets start by creating a new script and watch the effects on browser.

```diff index.html
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
  <!-- HTML5 element to show progress -->
  <progress id="worker-progress" value="0" max="100"></progress>

+  <script src="./js/inline.js"></script>
</body>
</html>

```

```javascript inline.js
(() => {
    const longTask = (progressCalback) => {
        for (let step = 0; step <= 10; step++) {
            progressCalback(step * 10);
            /*
             Use the developer tools to show that the console log is not blocked
            */
           console.log(step);
           const start = Date.now();
           const seconds = 1;
           const waitUntil = start + seconds * 1000;
           while (Date.now() < waitUntil) {}
        }
    };

    const progress = document.getElementById('worker-progress');

    longTask((percentage) => {
        progress.value = percentage;
    });
})();


```
* We have the element progress.
* We have `longTask`, that will update the screen on its feed it `callback`.
* `longTask` performances an intensive task blocking the UI around 1 second.
* How many little programs are? -> `2`

> NOTE: Use developer tools to watch that the console does not get blocked.

* We can watch in `console.log(step)`, how it's getting updated when we get a new step value, but the UI it's not getting updated. This is because it's not to get updated until, the code block ends (`for statement`).

* Let's write this with a web worker to avoid this issue.

### 4. We have to create two new files in order to use a Web Worker.

```javascript longTask.js
const longTask = (progressCalback) => {
    for (let step = 0; step <= 10; step++) {
        progressCalback(step * 10);
        /*
         Use the developer tools to show that the console log is not blocked
        */
       console.log(step);
       const start = Date.now();
       const seconds = 1;
       const waitUntil = start + seconds * 1000;
       while (Date.now() < waitUntil) {}
    }
};

longTask(postMessage);

```

```javascript background.js
(() => {
    const progress = document.getElementById('worker-progress');

    const longTaskWorker = new Worker('./longTask.js');

    longTaskWorker.onmessage = (message) => {
        progress.value = message.data;
    };
})();
```

* `longTask(postMessage);` El callback que le pasamos es un método del propio worker (el worker inyecta el callback) que al ser invocado el statement: `progressCallback(step * 10);` manda el mensaje, que recibe el worker `worker.onmessage`. La comunicación puede ser bidireccional.

* NOTA: NO tiene acceso al DOM.

### REFERENCE https://developer.mozilla.org/es/docs/Web/Guide/Performance/Usando_web_workers

* Now we can change `index.html`, to watch results.

```diff index.html
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
  <!-- HTML5 element to show progress -->
  <progress id="worker-progress" value="0" max="100"></progress>

+  <script src="./js/background.js"></script>
-  <script src="./js/inline.js"></script>
</body>
</html>

```
// TODO: Translate

* En conclusión, cuando el web worker se ejecuta, `longTask` es llamado, `postMessage` es la función que se usa para mandar mensajes al principal, el engine de JavaScript que controla la UI.
* Este ejemplo de IPC, en realidad no lo es. Este web workerque hemos creado con new, es un web worker dedicado, sólo es un thread que se ejecuta dentro del mismo proceso, pero aún así tenemos cierta separación entre la ejecución del JavaScript que esta ejcutando estos workers. 
* Existe una asincronicidad debido a la separación de hilos. Los shared workers, si ejecutan sus propios procesos, y son un ejemplo claro de IPC.
