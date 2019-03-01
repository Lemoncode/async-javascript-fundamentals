const bookController = (Book, bookParser) => { // This way I can inject the Book that I want to test it.
  const business = require('./bookControllerBusiness')(Book);

  return {
    post: (req, res) => {
      (req.body.title) ?
      business.insertBook(req, res) :
      business.handleNotValidBook(res);
    },
    get: (req, res) => {
      const query = bookParser.queryParse(req);
      business.retrieveBooks(query, res);
    },
  };
}

module.exports = bookController;
