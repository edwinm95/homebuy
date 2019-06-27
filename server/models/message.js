const mongoose = require('mongoose')
const {Schema} = mongoose

const messageSchema = new Schema ( {
    timestamp: {
        type: Date,
        required: true,
        default: Date.now()
    },
    body: {
        type: String,
        required: true,
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recepient: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    read: {
        type: Boolean,
        required: true,
        default: false
    },
})

module.exports = mongoose.model('Message',messageSchema)

