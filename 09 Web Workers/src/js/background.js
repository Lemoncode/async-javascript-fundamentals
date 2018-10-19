(() => {
    const progress = document.getElementById('worker-progress');

    const longTaskWorker = new Worker('./longTask.js');

    longTaskWorker.onmessage = (message) => {
        progress.value = message.data;
    };
})();
