## We're going to create a basic project to have a start point for our fetch demos.

### 1. Create project scaffolding

* Create _src_ folder on _<rootDir>_
* Create _src/content_
* Create _src/js_
* Generate _package.json_, use `npm init` default initialization.
* Install related dependencies
```bash
$ npm i parcel -D
```

### 2. Create index.html on rootDir and src/content/site.css

```javascript
<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Async fetch</title>
  <link rel="stylesheet" href="./src/content/site.css">
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body>
  <h2>Fetch</h2>
  <div clas="container-add-book">
    <!-- TODO: Use label and create styles for this form -->
    <form>
      Title:</br>
      <input type="text" id="title" name="title" />
      <br/>

      Genre:</br>
      <input type="text" id="genre" name="genre" />
      <br/>

      Author:</br>
      <input type="text" id="author" name="author" />
      </br>

      Have you read this book?:</br>
      <input type="checkbox" id="read" name="read" />
      </br></br>
      <button id="container-add-book-form-submit">Add book</button>
    </form>
  </div>
  <div id="books-container" class="container">
    <button id="button-retrieve-books">Retrieve books</button>
  </div>

  <script src="./src/js/main.js"></script>
</body>
</html>

```

```css
@import url('https://fonts.googleapis.com/css?family=Raleway');

body {
  font-family: 'Raleway', sans-serif;
}

.container {
  padding: 2em;
}
```

### 3. Create uiBuilder.js in src/js

```javascript
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
```

### 4. To get this up and running lets define start in package.json

```diff
....
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
+   "start": "parcel index.html"
},
....
```