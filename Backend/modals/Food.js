const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({
    restorentName : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Restorent'
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
    foodType: {
        type: String,
        required: true,
        default: 'VEG'
    },
    foodImg:{
        tyoe : String,
        required : true
    }
});

module.exports = mongoose.model('Food', foodSchema);