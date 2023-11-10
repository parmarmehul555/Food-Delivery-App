const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SEC = 'meh$#2005!';

function sellerLogedIn(req, res, next) {
    try {
        const sellerHeader = req.headers['authorization'];
        const token = sellerHeader.split(' ')[1];

        if (!token) return res.status(401).send('token not exists!');

        const payload = jwt.verify(token, JWT_SEC);
        req.seller = payload;
        next();
    } catch (error) {
        res.status(401).json({ "msg ": error });
    }
}

module.exports = sellerLogedIn;