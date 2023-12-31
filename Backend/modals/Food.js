const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({
    sellerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Seller'
    },
    sellerName: {
        type : String,
        required: true
    },
    foodName: {
        type: String,
        required: true
    },
    foodPrice: {
        type: Number,
        required: true,
        default: 0
    },
    foodDescription: {
        type: String,
        required: true,
    },
    foodImg: {
        type: String,
        required: true,
        default: null
    },
    foodType: {
        type: String,
        required: true,
        default: 'VEG'
    }
});

module.exports = mongoose.model('Food', foodSchema);