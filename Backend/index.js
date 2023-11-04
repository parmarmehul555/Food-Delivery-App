const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const User = require('./modals/User');

mongoose.connect('mongodb+srv://MehulParmar:Mehul3451@cluster0.ij80lvl.mongodb.net/food_Delivery?retryWrites=true&w=majority')
    .then(() => {
        const app = express();
        app.use(bodyParser.urlencoded({ extended: false }))
        app.use('/food/auth', require('./routes/auth'));

        app.listen(3030, () => {
            console.log('Server started at @ 3030');
        })
    });