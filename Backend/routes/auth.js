const express = require('express');
const User = require('../modals/User');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userLogedIn = require('../middleware/userLogedIn');
const JWT_SEC = 'meh$2005!';

// User sign up  route:
router.post('/signup', async (req, res) => {
    const { userName, email, password } = req.body;

    const isUser = await User.findOne({ email });

    if (isUser) {
        console.log(isUser);
        return res.status(401).send(false);
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

        const token = jwt.sign(payload, JWT_SEC);
        res.status(200).send({ user, token });
    }
});

// User login route : 
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log("Email : ",email);

    try {
        const isUser = await User.findOne({ email });
        console.log(isUser)
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

        const token = jwt.sign(payload, JWT_SEC);
        res.status(200).send({ isUser, token });
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
        res.send({ isUser, token });
    } catch (error) {
        console.log("ERROR MSG : ", error);
    }
});

// UPDATE user's password 
router.post('/changepassword', userLogedIn, async (req, res) => {
    try {
        const { email, password, newPassword } = req.body;
        const user = req.user;
        const id = req.user.id;
        const isUser = await User.findById({ _id: id });

        if ((isUser.email != email)) {
            return res.status(401).json({ "ERROR ": "Invalid Email address!!" });
        }
        console.log(isUser);

        const checkPass = await bcrypt.compare(password, user.password);

        if (!checkPass) {
            return res.status(401).json({ "ERROR ": "User not found!!" });
        }

        const newPass = await bcrypt.hash(newPassword, 10);
        await User.findOneAndUpdate({ _id: req.user.id }, { $set: { password: newPass } });

        const payload = {
            id: User._id,
            username: User.username,
            password: User.password
        }
        const token = jwt.sign(payload, JWT_SEC);
        res.status(200).send({ isUser, token });
    } catch (error) {
        return res.status(500).json({ "ERROR ": "Internal server error" });
    }
})

module.exports = router;