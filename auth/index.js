const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { resolveLogin } = require('./credentialResolver');


const app = express();
const PORT = process.env.PORT || 8887;

app.use(bodyParser.json());
app.use(cors());

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const { status, response } = resolveLogin(username, password);
    res.status(status)
        .send(response);
});

app.get('*', (_, res) => {
    res.sendStatus(404);
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});