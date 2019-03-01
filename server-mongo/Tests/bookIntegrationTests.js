const should = require('should'),
      request = require('supertest'),
      app = require('../app.js'),
      mongoose = require('mongoose'),
      Book = mongoose.model('Book'), // I can pull directly from mongoose because is loaded on app.js
      agent = request.agent(app); // Something from supertest to execute all our http calls.

describe('Book crud Test', function () { // Go through our test database
  it('should allow a book to be posted and return a read and _id', function (done) {
    const bookPost = {
      title: 'new Book',
      author: 'Jhon Doe',
      genre: 'Fiction'
    };

    agent.post('/api/books')
      .send(bookPost)
      .expect(200)
      .end(function (err, results) {
        results.body.read.should.equal(false);
        results.body.should.have.property('_id');
        done(); // Lets supertest this is done so move on.
      });
  });

  afterEach(function (done){
    Book.remove().exec();
    done();
  });
});
