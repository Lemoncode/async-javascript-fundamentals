const bookControllerBusiness = (Book) => ({
    insertBook: (req, res) => {
        const book = new Book(req.body);
        book.save();
        res.status(201);
        res.send(book);
    },
    handleNotValidBook: (res) => {
        res.status(400);
        res.send('Title is required'); 
    },
    retrieveBooks: (query, res) => {
        Book.find(query, (err, books) => {
            (err) ?
            res.status(500).sen(err) :
            res.json(books);
        });
    }
});

module.exports = bookControllerBusiness;
