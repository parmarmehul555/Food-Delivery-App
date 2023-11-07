const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({
    foodName: {
        type: String,
        required: true
    },
    foodPrice: {
        type: Number,
        required: true,
        default: 0
    },
    foodType: {
        type: String,
        required: true,
        default: 'VEG'
    }
});

module.exports = mongoose.model('Food', foodSchema);