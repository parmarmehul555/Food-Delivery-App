const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
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
        required:true
    },
    foodCount:{
        type:Number,
        required:true,
        default: 0
    },
    totalFoodAmount:{
        type:Number,
        required:true,
        default:0
    }
    // customerAddress: {
    //     type: String,
    //     required: true
    // }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);