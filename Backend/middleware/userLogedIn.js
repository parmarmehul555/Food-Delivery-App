const jwt = require('jsonwebtoken');
const JWT_SEC = 'meh$#2005!';

const userLogedIn = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).send('token not exists!');

    jwt.verify(token, JWT_SEC, async (err, user) => {
        // if (err) {
        //     console.log(err);
        //     // return res.status(403).json({"ERROR " : err});
        // }
        req.user = await user;
        next();
    });
};

module.exports = userLogedIn;