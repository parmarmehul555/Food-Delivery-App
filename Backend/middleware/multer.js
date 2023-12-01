const express = require('express');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("AVB = ",path.resolve(__dirname, '../temp/imgs'));
         cb(null, path.resolve(__dirname, '../temp/imgs'));
        //cb(null, 'E:/project/Food-Delivery-App/Backend/temp/imgs'); 
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + file.originalname);
    }
});

const upload = multer({ storage: storage });
module.exports = upload;