(() => {
    const progress = document.getElementById('worker-progress');

    const longTaskWorker = new Worker('./js/longTask.js');

    longTaskWorker.onmessage = (message) => {
        progress.value = message.data;
    };
})();
