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
