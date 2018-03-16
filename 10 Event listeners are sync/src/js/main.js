(() => {
    const btn = document.getElementById('btn');
    const logger = (message) => (evt) => {
        evt.stopPropagation();
        console.log(message);
    };
    btn.addEventListener('click', logger('first click'));
    btn.addEventListener('click', logger('second click'));

    setTimeout(() => {
        console.log('pre-click');
        btn.click();
        console.log('post-click');
    }, 0);
})();
// (function () {
//     const btn = document.getElementById('btn');

//     btn.addEventListener('click', function () {
//         console.log('click-1');
//     });

//     btn.addEventListener('click', function () {
//         console.log('click-2');
//     });

//     setTimeout(function () {
//         console.log('pre-click');
//         btn.click(); // De manera síncrona, llama a cada uno de los handlers.
//         console.log('post-click');
//     }, 0);
// })();
