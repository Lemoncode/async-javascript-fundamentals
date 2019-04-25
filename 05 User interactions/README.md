## In this demo we are goin to polay with the user interactions.
* References: https://developer.mozilla.org/es/docs/Web/API/DataTransfer
https://codepen.io/patrickhlauke/pen/azbYWZ

* Folder structure:

05 User interactions/
├── src/
│   ├── content/
|   |   ├── site.css
│   ├── js/
|   |   ├── main.js
│   ├── index.html
├── package.json

## Steps.

### 1. Create the `index.html` for our demo.

* Just paste this code.

```html
<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">
  <title>User interactions demo</title>
  <link rel="stylesheet" href="content/site.css">
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>

<body>
  <h1>Drag and drop</h1>
  <div id="drag-element" draggable="true" class="drag"></div>
  <br>
  <div id="drop-element-a" class="drop"></div>
  <div id="drop-element-b" class="drop"></div>
  <script src="./js/main.js"></script>
</body>
</html>

```

### 2. Create `site.css`

* Just paste this code,

```css
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

.drag {
  background-color: cyan;
  width: 200px;
  height: 200px;
}

.drop {
  border: 1px solid black;
  width: 300px;
  height: 300px;
  float: left;
}

```
* Run the application and have a look

### 3. Lets type the javascript code to manage the drag and drop

```javascript
document.onreadystatechange = () => {
  if(document.readyState === 'complete') {

    const dragStart = (event) => {
      event.dataTransfer.setData('text/plain', event.target.id);
      console.log("dragStart", event);
    };

    const dragElement = document.getElementById('drag-element');
    dragElement.addEventListener('dragstart', dragStart);

    const dragOver = (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
      console.log({
        x: event.pageX,
        y: event.pageY
      });
    };

    const drop = (event) => {
      const id = event.dataTransfer.getData('text');
      console.log('drop', id);
      event.target.appendChild(dragElement);
    };

    const dropElementA = document.getElementById('drop-element-a');
    const dropElementB = document.getElementById('drop-element-b');

    dropElementA.addEventListener('dragover', dragOver);
    dropElementB.addEventListener('dragover', dragOver);

    dropElementA.addEventListener('drop', drop);
    dropElementB.addEventListener('drop', drop);
  }
};

```
* We are using data transfer:
  - The `DataTransfer object` is used to hold the data that is being dragged during a drag and drop operation. It may hold one or more data items, each of one or more data types. 
  - Reference: `https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer`
* Drag and drop it's a great example of async sources, code that it's executed later.
* Obviously these are user interactions, that it's getting the elements and moving around the page.
* When we click the drag element and start the dragging around, the `dragstart` event it's triggered. The associated handler will be pushed to the queue, and later on executed.
* How many little programs do we have here? One per event handler plus the main one, 4.
