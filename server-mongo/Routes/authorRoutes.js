const express = require('express'),
      authorRouter = express.Router();
      // TODO: Create authorParser

const routes = function (Author) { // TODO: Inject Author
  const authorController = require('../controllers/authorController')(Author);
  // Create controller to handle these requests.
  authorRouter.route('/')
  .post(authorController.post)
  .get(authorController.get);

  return authorRouter;
};

module.exports = routes;
