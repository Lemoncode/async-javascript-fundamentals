## 1. Lets have a look to this code

```javascript
document.onreadystatechange = () => {
    if(document.readyState === 'complete') {
  
      console.log('1');
  
      setTimeout(() => {
  
        console.log('2');
  
         setTimeout(() => {
  
           console.log('3');
  
         }, 0);
  
         console.log('4');
  
      }, 0);
  
      console.log('5');
      
    }
  };

```


## 2.  What is the order of the prinrt numbers in console?

1, 5, 2, 4, 3

* `setTimeout`, is another function that plans another async function, as web request would do.
* We obtain this result due to run to completion.
* The browser gives to these function a min value of 4ms.
