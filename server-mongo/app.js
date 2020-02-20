const express = require('express'),
      cors = require('cors'),
      app = express(),
      port = process.env.PORT || 3000,
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      dotenv = require('dotenv');
      dotenv.config();

   // mongoose.connect('mongodb://localhost/bookAPI')

/*
  Enable ALL CORS Requests. If it does not work use, this instead:
  app.options('*', cors()); // include before other routes.
  http://enable-cors.org/server_expressjs.html
*/
app.use(cors());
/*
  In order to understand what we are going to insert on the database we use
  body-parse. We have to install a package
*/
app.use(bodyParser.urlencoded({extended: true}));
/*
  Let that we are going to use body-parser. Our middleware is loaded,
  and it is going to look at the body and see if it has any JSON objects
  in it, and if it does it is going to take that JSON object and it is
  going to added it to req.body.
*/
app.use(bodyParser.json());
/*
  Creates a connection string with the database if does
  not exists (the database), will create it for us.
*/
let db;

mongoose.Promise = global.Promise;

if(process.env.ENV === 'Test') {
  // db = mongoose.connect('mongodb://localhost/bookAPI_test'); // Our database is going to connect here in tests environment
  db = mongoose.connect(`mongodb://${process.env.ENVIRONMENT}/bookAPI_test`); // Our database is going to connect here in tests environment
} else {
  // db = mongoose.connect('mongodb://localhost/bookAPI'); // Local
  db = mongoose.connect(`mongodb://${process.env.ENVIRONMENT}/bookAPI`); // docker
}

const Book =  require('./models/bookModel'); // We get the mongoose schema to work with it.
const Author = require('./models/authorModel');
const bookRouter = require('./Routes/bookRoutes')(Book); // As we are returning a function we have to execute this.
const authorRouter = require('./Routes/authorRoutes')(Author);
const accessRouter = require('./Routes/accessRoutes')();

app.use('/api/books', bookRouter);
app.use('/api/authors', authorRouter);
app.use('/api/access', accessRouter);
app.get('/', (_, res) => res.send('welcome to my API!')); // We are sending just a string

app.listen(port, function() {
  console.log('Gulp is running my app on PORT: ' + port);
});

module.exports = app; // We need to do this to provided it to supertest.
