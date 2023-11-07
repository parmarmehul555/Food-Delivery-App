const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    foodName: {
        type: String,
        required: true
    },
    foodPrice: {
        type: Number,
        required: true
    },
    customerDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    customerAddress: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Order', orderSchema);