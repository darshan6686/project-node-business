const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
    admin: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    askId: {
        type: mongoose.Types.ObjectId,
        ref: 'asks'
    },
    title: {
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

module.exports = mongoose.model('leads', leadSchema);