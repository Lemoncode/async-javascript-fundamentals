
const authorController = (Author) => {
  const business = require('./authorControllerBusiness')(Author);

  return {
    post: (req, res) => {
      (req.body.name && req.body.lastName) ?
        business.insertAuthor(req, res) :
        business.handleNotValidAuthor(res);
    },
    get: (req, res) => business.retrieveAuthors({}, res),
  }
};

module.exports = authorController;
