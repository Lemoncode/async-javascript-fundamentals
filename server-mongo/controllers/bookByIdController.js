const bookIdController = () => {
    const populateBook = (req) => {
        req.book.title = req.body.title;
        req.book.author = req.body.author;
        req.book.genre = req.body.genre;
        req.book.read = req.body.read;
        // http://node.green/#ESNEXT-candidate--stage-3--object-rest-spread-properties
        // req.book = {...req.body}
    };

    const handleUpdateBook = (req, res) => {
        req.book.save((err) => {
            console.log(err);
            (err) ?
                res.status(500).send(err) :
                res.json(req.book);
        });
    };

    const populatePatchBook = (req) => {
        for (var variable in req.body) {
            if (req.body.hasOwnProperty(variable) && !req.body['_id']) {
                req.book[variable] = req.body[variable];
            }
        }
    }

    const handleRemoveBook = (req, res) => {
        req.book.remove((err) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(204).send('Remove');
            }
        });
    };

    return {
        get: (req, res) => res.json(req.book),
        put: (req, res) => {
            populateBook(req);
            handleUpdateBook(req, res);
        },
        patch: (req, res) => {
            populatePatchBook(req);
            handleUpdateBook(req, res);
        },
        delete: (req, res) => handleRemoveBook(req, res),
    };
};

module.exports = bookIdController ;
