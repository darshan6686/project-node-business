const mongoose = require('mongoose');

const businessSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    categery: {
        type: String,
        require: true
    },
    keyword: {
        type: String
    },
    website: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    address: {
        type: String
    },
    address2: {
        type: String
    },
    distric: {
        type: String
    },
    state: {
        type: String
    },
    country: {
        type: String
    },
    photo: [{
        type: String
    }],
    isDelete: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('business', businessSchema);