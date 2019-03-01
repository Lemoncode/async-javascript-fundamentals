const queryParse = function (req) {
  // Check if it is an empty object.
  // if( Object.keys(query).length > 0) {
  //   console.log(query);
  // }

  const query = {}; // The request query string on JSON format!!! We can do casting on TypeScript

  if(req.query.genre) {
    query.genre = req.query.genre;
  }

  if(req.query.author) {
    query.author = req.query.author;
  }

  if(req.query.title) {
    query.title = req.query.title;
  }

  if(req.query.read) {
    query.read = req.query.read;
  }

  console.log(query);

  return query;
};

module.exports = {
  queryParse
};
