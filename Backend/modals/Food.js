const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({
    sellerName : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Seller'
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
    foodDescription:{
        type : String,
        required : true,
    },
    foodImg : {
        type : String,
        required: true,
        default : null
    },
    foodType: {
        type: String,
        required: true,
        default: 'VEG'
    }
});

module.exports = mongoose.model('Food', foodSchema);