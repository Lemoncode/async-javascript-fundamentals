import * as bookAPI from './bookAPI';

document.addEventListener('DOMContentLoaded', () => {
  const buttonRetrieveBooks = document.getElementById('button-retrieve-books');
  buttonRetrieveBooks.addEventListener('click', (event) => {
    event.stopPropagation();
    bookAPI.retrieveBook('noexists')
      .then((result) => console.log(result))
      .catch((err) => console.log(err.message, 'main'));
    // bookAPI.retrieveBooks()
    //   .then((result) => console.log(result))
    //   .catch((err) => console.log(err.message, 'main'));
  });
});
