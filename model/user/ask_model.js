const mongoose = require('mongoose');

const askSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    categery: {
        type: String,
        require: true
    },
    keyword: {
        type: String
    },
    ask: {
        type: String
    },
    isDelete: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('asks', askSchema)