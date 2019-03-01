const authorControllerBusiness = (Author) => ({
    insertAuthor: (req, res) => {
        const author = new Author(req.body);
        author.save();
        res.status(201);
        res.send(author);
    },
    handleNotValidAuthor: (res) => {
        res.status(400);
        res.send('Name and Last Name is required.'); // TODO: Move to errors file.
    },
    retrieveAuthors: (query, res) => {
        Author.find(query, (err, authors) => {
            (err) ? 
            res.status(500).send(err) :
            res.json(authors);
        });
    },
});

module.exports = authorControllerBusiness;
