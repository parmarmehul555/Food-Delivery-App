const mongoose = require('mongoose');

const deliveredOrderSchema = mongoose.Schema({
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
    foodImg: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('DeliveredOrder', deliveredOrderSchema);