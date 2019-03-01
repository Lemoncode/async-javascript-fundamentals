const express = require('express'),
  getNumber = require('../utils/randomNumber').getNumber;
  resolveAccess = require('../controllers/accessControllerBusiness').resolveAccess;
  accessRouter = express.Router();

const routes = () => {
  const accessController = require('../controllers/accessController')(resolveAccess, getNumber);
  accessRouter.route('/')
    .get(accessController.get);
  return accessRouter;
};

module.exports = routes;
