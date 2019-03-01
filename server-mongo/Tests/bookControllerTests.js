const should =  require('should'),
      sinon = require('sinon');

// We do not need an instance of mocha, because it is currently running on gulp
describe('Book controller tests', function() {
  describe('Post', function () {
    it('should not allow an empty title on book', function () {
      // Arrange
      var Book = function (book) {
        this.save = function(){}
      };

      var req = {
        body: {
          author: 'Jhon Doe'
        }
      };

      var res = {
        status: sinon.spy(), //
        send: sinon.spy() // Tracks what is called, what is called with, how many times...
      };

      var bookController = require('../controllers/bookController')(Book);

      // Act
      bookController.post(req, res);

      // Assert
      res.status.calledWith(400).should.equal(true, 'Bad status ' + res.status.args[0][0]); // Array with the arguments that this function was called
      res.send.calledWith('Title is required').should.equal(true);
    });
  });
});
