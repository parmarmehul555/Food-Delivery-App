const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    customerDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    restorentName : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Restorent'
    },
    foodName: {
        type: String,
        required: true
    },
    foodPrice: {
        type: Number,
        required: true
    },

    customerAddress: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);