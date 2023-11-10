const express = require('express');
const User = require('../modals/User');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userLogedIn = require('../middleware/userLogedIn');
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

        const payload = {
            id: user._id,
            username: user.username,
            password: user.password
        }

        const token = jwt.sign(payload, process.env.JWT_SEC);
        res.status(200).json({ token });
    }
});

// User login route : 
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const isUser = await User.findOne({ email });

        if (!isUser) {
            return res.status(400).send(false);
        }

        const checkPass = await bcrypt.compare(password, isUser.password);

        if (!checkPass) {
            return res.status(400).send(false);
        }
        const payload = {
            id: isUser._id,
            email: isUser.email,
            password: isUser.password
        }
        console.log(payload);

        const token = jwt.sign(payload, process.env.JWT_SEC);
        res.status(200).json(token);
    } catch (error) {
        console.log("ERROR MSG : ", error);
    }
});

// GET user details
router.get('/user', userLogedIn, async (req, res) => {
    try {
        const user_id = req.user.id;
        const isUser = await User.findById(user_id).select('-password');
        if (!isUser) {
            return res.status(404).send({ error: 'User not found!' });
        }
        res.send(isUser);
    } catch (error) {
        console.log("ERROR MSG : ", error);
    }
});

module.exports = router;