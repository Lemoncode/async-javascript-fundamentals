import { forEach } from './utils';

(() => {
    const numbers = [1, 2, 3];
    console.log('start');
    forEach(numbers, (number) => console.log(number * 2)); // async or not async
    console.log('end');
})();
