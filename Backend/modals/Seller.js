const mongoose = require('mongoose');

const sellerSchema = mongoose.Schema({
    sellerName: {
        type: String,
        required: true,
    },
    sellerEmail: {
        type: String,
        required: true,
        unique: true
    },
    sellerPassword: {
        type: String,
        required: true
    },
    sellerPhNo: {
        type: Number,
        required: true,
        unique: true,
        maxlength : 10
    }
});

module.exports = mongoose.model('Seller', sellerSchema);