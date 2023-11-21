const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Seller = require('../modals/Seller');
const sellerLogedIn = require('../middleware/sellerLogedIn');
const JWT_SEC = 'meh$#2005!';

// Seller Sign  Up route
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, phno } = req.body;

        const seller = await Seller.findOne({ email });

        if (seller) {
            return res.status(409).json({ msg: "user already exists" });
        }

        const hashedPass = await bcrypt.hash(password, 10);

        const newSeller = new Seller();
        newSeller.sellerName = name;
        newSeller.sellerEmail = email;
        newSeller.sellerPassword = hashedPass;
        newSeller.sellerPhNo = phno;
        await newSeller.save();

        const payload = {
            id: newSeller._id,
        };

        const token = jwt.sign(payload, JWT_SEC);
        res.status(200).send({ seller, token });
    } catch (error) {
        console.log("Error", error);
        res.status(500).send({ "error": error });
    }
});

// Seller log in route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const isSeller = await Seller.findOne({ sellerEmail: email });

        if (!isSeller) {
            return res.status(404).json({ "msg : ": "user not found" });
        }

        const checkPass = await bcrypt.compare(password, isSeller.sellerPassword);

        if (!checkPass) {
            return res.status(404).json({ "msg : ": "user not found" });
        }

        const payload = {
            id: isSeller._id,
        };

        const token = jwt.sign(payload, JWT_SEC);
        res.status(200).send({ isSeller, token });
    } catch (error) {
        res.status(401).json({ "error": error });
    }
});

//GET seller details
router.get('/sellerdetails', sellerLogedIn, async (req, res) => {
    try {
        const sellerId = req.seller.id;
        const isSeller = await Seller.findOne({ _id: sellerId }).select('-sellerPassword');

        if (!isSeller) {
            return res.status(404).send({ error: 'User not found!' });
        }
        res.status(200).send({ isSeller, token });
    }
    catch (err) {
        res.status(401).json({ "Error ": err });
    }
})

module.exports = router;