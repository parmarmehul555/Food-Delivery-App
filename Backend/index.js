const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const User = require('./modals/User');
const helmet = require('helmet');

mongoose.connect('mongodb+srv://MehulParmar:Mehul3451@cluster0.ij80lvl.mongodb.net/food_Delivery?retryWrites=true&w=majority')
    .then(() => {
        const app = express();
        app.use(cors());
        app.use(helmet());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        app.use('/food/auth', require('./routes/auth'), require('./routes/orders'), require('./routes/deliverOrder'));
        app.use('/restorent/seller', require('./routes/seller'), require('./routes/food'));
        // app.use('/user/food', require('./routes/orders'));

        app.listen(3030, () => {
            console.log('Server started at @ 3030');
        })
    });