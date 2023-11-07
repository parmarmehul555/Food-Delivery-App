const jwt = require('jsonwebtoken');
const JWT_SEC = 'meh$#2005!';

const userLogedIn = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).send('token not exists!');

    jwt.verify(token, JWT_SEC, (err, user) => {
        if (err) {
            res.status(403).send(false);
        }
        req.user = user;
        next();
    });

};

module.exports = userLogedIn;