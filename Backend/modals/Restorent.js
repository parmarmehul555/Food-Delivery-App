const mongoose = require('mongoose');

const restorentSchema = mongoose.Schema({
    restorentName : {
        type : String,
        required : true
    },
    restorentAddress : {
        type : String,
        required : true
    },
    restorentRating : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Rating',
        required : true
    }
})

module.exports = mongoose.model('Restorent',restorentSchema);