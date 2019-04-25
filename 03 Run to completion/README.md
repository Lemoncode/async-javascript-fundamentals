## Run to completion

* The html for this demo

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="content/site.css">
    <title>Document</title>
</head>

<body>
    <button id="button">Click me!</button>
    <script src="./js/main.js"></script>
</body>

</html>

```

### 1. Let's creae code that will be blocking in some point.

```javascript
document.onreadystatechange = () => {
  if(document.readyState === 'complete') {
    const btn = document.getElementById("button");
    btn.addEventListener('click', (evt) => {
      evt.stopPropagation();
        // modify page
      document.body.style.backgroundColor =  'lime';
      let p = document.createElement("p");
      p.innerText = "let's add some text to the page";
      document.body.appendChild(p);
      
      // simulate blocking / long running operation
      const start = Date.now();
      const delaySeconds = 10;
      while (Date.now() < start + delaySeconds * 1000) {}
    });
  }
};
```

### 2. To have a little bit of better understanding lets refactor a bit

```diff
document.onreadystatechange = () => {
  if(document.readyState === 'complete') {
    const btn = document.getElementById("button");
    btn.addEventListener('click', (evt) => {
      evt.stopPropagation();
-     // modify page
-     document.body.style.backgroundColor =  'lime';
-     let p = document.createElement("p");
-     p.innerText = "let's add some text to the page";
-     document.body.appendChild(p);
-     
-     // simulate blocking / long running operation
-     const start = Date.now();
-     const delaySeconds = 10;
-     while (Date.now() < start + delaySeconds * 1000) {}
+     modifyPage();
+     blockingOperation();
    });

+    const modifyPage = () => {
+      // modify page
+      document.body.style.backgroundColor =  'lime';
+      let p = document.createElement("p");
+      p.innerText = "let's add some text to the page";
+      document.body.appendChild(p);
+    };
+
+    const blockingOperation = () => {
+      // simulate blocking / long running operation
+      const start = Date.now();
+      const delaySeconds = 10;
+      while (Date.now() < start + delaySeconds * 1000) {}
+    }
  }
};
```

### 3. Let's have a look to the code that we have in `main.js`

```javascript
btn.addEventListener('click', (evt) => {
      evt.stopPropagation();
      modifyPage();
      blockingOperation();
    });
```
* We have an event listener for the click of the button.

* In this listener we have three statements, first, we stop the propagation of the event, then we modify the page changing its background color and adding a p tag element, for last we have a `blocking operation`.

* Before we click the button, we can ask ourselves, what it's going to happen?
    * When we click the button, we can watch the screen block, after 10 seconds the screen turns lime, the text is added, and we can interact with the screen again. 
    * When we get to the blocking process, `blockingOperation()` statement, the statement that it's going to be around 10 seconds, anything else can be executed, what means that we can interact with the browser.

* The event listener callback, it's executed till completion, that includes obviously the blocking process. If it takes 10 seconds to get completed, nothing else in that range of time will be executed.

### Challange Little programs. How many little programs are here?

```javascript
document.onreadystatechange = () => {
  if(document.readyState === 'complete') {
    const btn = document.getElementById("button");
    btn.addEventListener('click', (evt) => {
      evt.stopPropagation();
      modifyPage();
      blockingOperation();
    });

    const modifyPage = () => {
      // modify page
      document.body.style.backgroundColor =  'lime';
      let p = document.createElement("p");
      p.innerText = "let's add some text to the page";
      document.body.appendChild(p);
    };

    const blockingOperation = () => {
      // simulate blocking / long running operation
      const start = Date.now();
      const delaySeconds = 10;
      while (Date.now() < start + delaySeconds * 1000) {}
    }
  }
};
```
* 3 | 2
* 3 if we consider, the part that the browser repaints the screen. We can think this way because it's not executed until the previous statement it's not completed.
