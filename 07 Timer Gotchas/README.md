## In this demo we are going to investigate more about timer delay.
* Folder structure:

05 User interactions/
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

* Just paste this code.

```diff html
<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">
  <title>LEMONCODE 16/17 jQuery</title>
  <link rel="stylesheet" href="content/site.css">
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
-  <script src="./js/main.js"></script>
</head>

<body>
  <h1>API Rest</h1>
-  <div id="content"></div>
+  <script src="./js/main.js"></script>
</body>
</html>

```

* Do not modify `site.css`

### 2. Lets change our `main.js`, for this demo. 

* Remove all the previous code.

```javascript
(() => {
    let repitions = 0;
    const totalRepetions = 1000;
    const requestDelay = 0;
    let totalDelay = 0;

    const testDelay = () => {
        if (repitions++ > totalRepetions) {
            const avarage = totalDelay / totalRepetions;
            alert(`
                Request delay: ${requestDelay},
                Avarage delay: ${avarage}
            `);
            return;
        }

        const start = new Date();
        setTimeout(() => {
            const delay = new Date() - start;
            totalDelay += delay;
            testDelay();
        }, requestDelay);
    };

    testDelay();
})();

```
* Challange -> How many `async code fragments`?
  * Two, if we count the main. Other thing is to take into a count what is going on inside `testDelay`

* This code compares the `setTimeout actual delay` versus the `requested delay`. The value of `totalDelay` is the time that our function is waiting to be invoke. 

* The delay is initialized to `0`, when we are executing this we are asking for a `0` delay, but the avarage is close to `5ms`.

* If we change `requestDelay` to `10`, the avarage gets closer to `10ms`. The reason that this is happen is because by default the browser will set a value close to 4 by default.

