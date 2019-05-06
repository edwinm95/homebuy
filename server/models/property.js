const mongoose = require('mongoose')
const {Schema} = mongoose;

const propertySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})
module.exports = mongoose.model('Property',propertySchema)