## Challange ¿Cuantos pequeños programas?
* Folder structure:

08 Not Always Async/
├── src/
│   ├── content/
|   |   ├── site.css
│   ├── js/
|   |   ├── utils.js
|   |   ├── main.js
│   ├── index.html
│   └── bootstrap-theme.min.css
├── gulpfile.js
├── package.json

## Steps.

### 1. Open `main.js`.

* Challange -> How many little programs? // 1
* What it's going to be show up on console? // 2, 4, 6

* We can ask ourselves if this function is an async function or not. The fact is that there is no way to know it, without know how `forEach` function is implemented.

* We can wrap the function with `setTimeout`, and we obtain another thing.
