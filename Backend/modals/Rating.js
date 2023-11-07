const mongoose = require('mongoose');

const ratingSchama = mongoose.Schema({
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    }
});

module.exports = mongoose.model('Rating', ratingSchama);