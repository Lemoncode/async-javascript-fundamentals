const jwt = require('jsonwebtoken');

const users = [
    { id: 1, username: 'admin', password: 'admin' },
    { id: 2, username: 'guest', password: 'guest' },
];

exports.resolveLogin = (username, password) => {
    let status;
    let response;
    let emptyCredentials = !username || !password;
    if (emptyCredentials) {
        status = 400;
        response = 'You need a username and password';
    }

    if (!emptyCredentials) {
        const user = users.find((u) =>
            u.username === username && u.password === password
        );

        if (!user) {
            status = 401;
            response = 'User not found';
        } else {
            const token = jwt.sign(
                {
                    sub: user.id,
                    username: user.username
                },
                'mysupersecretkey',
                { expiresIn: '3 hours' }
            );

            status = 200;
            response = { access_token: token };
        }
    }

    return {
        status,
        response,
    }
};