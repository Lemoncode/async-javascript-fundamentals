const express = require('express'),
      bookRouter = express.Router(),
      bookParser = require('../parsers/bookParser'),
      bookIdMiddleware = require('../middlewares/bookMiddleware').bookIdMiddleware;

const routes = (Book) => {
  const bookController = require('../controllers/bookController')(Book, bookParser);
  const bookIdController = require('../controllers/bookByIdController')();
  bookRouter.route('/')
  .post(bookController.post)
  .get(bookController.get);
  
  bookRouter.use('/:bookId', bookIdMiddleware(Book));

  bookRouter.route('/:bookId')
  .get(bookIdController.get)
  .put(bookIdController.put)
  .patch(bookIdController.patch)
  .delete(bookIdController.delete); // Removes whatever book that it finds on middleware

  return bookRouter;
};

module.exports = routes;
