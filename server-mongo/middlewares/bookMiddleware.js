const bookIdMiddleware = (Book) => (req, res, next) => {
    Book.findById(req.params.bookId, (err, book) => {
        if (err) {
            res.status(500).send(err);
        } else if (book) {
            req.book = book;
            next();
        } else {
            res.status(404).send('no book found');
        }
    });
};

module.exports = {
    bookIdMiddleware
}
