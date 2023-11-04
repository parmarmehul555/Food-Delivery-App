const express = require('express');
const User = require('../modals/User');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');

const JWT_SEC = 'meh$#2005!';

// User sign up  route:

router.post('/signup', async (req, res) => {
    const { userName, email, password } = req.body;

    const isUser = await User.findOne({ email });

    if (isUser) {
        console.log(isUser);
        res.status(401).send(false);
        return;
    }
    else {

        const hashedPass = await bcrypt.hash(password, 5);

        const user = new User();

        user.username = userName;
        user.email = email;
        user.password = hashedPass;

        await user.save();

        const tokenData = {
            id: user._id,
            username: user.username,
            password: user.password
        }

        const token = jwt.sign(tokenData, JWT_SEC);
        res.status(200).json({ token });
    }
})

module.exports = router;