const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    // customerDetails: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    customerDetails: {
        type: String,
        required: true
    },
    restorentName: {
        type: String,
        required: true
    },
    foodName: {
        type: String,
        required: true
    },
    foodPrice: {
        type: Number,
        required: true
    },
    // customerAddress: {
    //     type: String,
    //     required: true
    // }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);