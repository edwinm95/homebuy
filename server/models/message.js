const mongoose = require('mongoose')
const {Schema} = mongoose

const messageSchema = new Schema ( {
    timestamp: {
        type: Date,
        required: true,
        default: Date.now()
    },
    property: {
        type: mongoose.Types.ObjectId,
        ref: 'Property',
        required: true
    },
    body: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Message',messageSchema)

