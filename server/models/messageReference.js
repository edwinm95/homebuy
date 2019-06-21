const mongoose = require('mongoose')
const {Schema} = mongoose

const messageReferenceSchema = new Schema ({
    message: {
        type: mongoose.Types.ObjectId,
        ref: 'Message',
        required: true
    },
    to: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    from: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    read:{
        type: Boolean,
        required: true,
        default: false
    }
})

module.exports = mongoose.model('MessageReference',messageReferenceSchema)