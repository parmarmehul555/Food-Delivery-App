const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address : {
        type : String,
        required:true
    },
    phNo : {
        type : Number,
        required: true,
        unique: true,
        maxlength : 10
    }
});

module.exports = mongoose.model('User', userSchema);