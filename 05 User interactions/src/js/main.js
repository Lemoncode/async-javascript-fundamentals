document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    const dragStart = (event) => {
      event.dataTransfer.setData('text/plain', event.target.id);
      console.log('dragStart', event);
    };

    const dragElement = document.getElementById('drag-element');
    dragElement.addEventListener('dragstart', dragStart);

    const drop = (event) => {
      const id = event.dataTransfer.getData('text');
      console.log('drop', id);
      event.target.appendChild(dragElement);
    };

    const dragOver = (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
      console.log({
        x: event.pageX,
        y: event.pageY
      });
    };

    const dropElementA = document.getElementById('drop-element-a');
    const dropElementB = document.getElementById('drop-element-b');

    dropElementA.addEventListener('dragover', dragOver);
    dropElementB.addEventListener('dragover', dragOver);

    dropElementA.addEventListener('drop', drop);
    dropElementB.addEventListener('drop', drop);
  }
};
