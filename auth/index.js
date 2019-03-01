const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 8887;
const users = [
    { id: 1, username: 'admin', password: 'admin' },
    { id: 2, username: 'guest', password: 'guest' },
];

app.use(bodyParser.json());
app.use(cors());

app.post('/login', (req, res, next) => {
    console.log(req);
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400)
            .send('You need a username and password');
        next();
    }

    const user = users.find((u) =>
        u.username === username && u.password === password
    );

    if (!user) {
        res.status(401)
            .send('User not found');
        next();
    }

    const token = jwt.sign(
        {
            sub: user.id,
            username: user.username
        },
        'mysupersecretkey',
        { expiresIn: '3 hours' }
    );

    res.status(200)
        .send({access_token: token});
});

app.get('*', (_, res) => {
    res.sendStatus(404);
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});