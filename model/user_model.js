const mongoose = require('mongoose');

const useeSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female','male','female']
    },
    birthDate: {
        type: Date
    },
    mobileNumber: {
        type: String,
        minlength: 6,
        maxlength: 10
    },
    photo: [{
        type: String
    }],
    isAdmin: {
        type: Boolean,
        default: false
    },
    isDelete: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('users', useeSchema);