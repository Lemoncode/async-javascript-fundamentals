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
        const p = document.createElement("p");
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
  
