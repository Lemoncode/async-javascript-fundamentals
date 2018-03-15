document.onreadystatechange = () => {
    if(document.readyState === 'complete') {
  
      console.log('1');
  
      setTimeout(function() {
  
        console.log('2');
  
         setTimeout(function() {
  
           console.log('3');
  
         }, 0);
  
         console.log('4');
  
      }, 0);
  
      console.log('5');
      
    }
  };
