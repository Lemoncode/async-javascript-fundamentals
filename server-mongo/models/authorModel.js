const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

var authorModel = new Schema({
  name: {
    type: String
  },
  lastName: {
    type: String
  },
  birthDate: {
    type: Date
  }
});

module.exports = mongoose.model('Author', authorModel);
