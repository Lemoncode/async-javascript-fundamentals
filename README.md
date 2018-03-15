## Run to completion

### 1. Let's have a look to the code that we have in `main.js`

```javascript
btn.addEventListener('click', (evt) => {
      evt.stopPropagation();
      modifyPage();
      blockingOperation();
    });
```
* We have an event listener for the click of the button.

* In this listener we have three statements, first, we stop the propagation of the event, then we modify the page changing its background color and adding a p tag element, for last we have a `blocking operation`.

* Before click the button ask the students, what they think it's going to happen?
    * When we click the button, we can watck the screen block, after 10 seconds the screen turns lime, the text is added, and we can interact with the screen again. 
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
