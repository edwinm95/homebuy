const mongoose = require('mongoose')
const {Schema} = mongoose;

const userSchema = new Schema ({
    facebookID: {
        type: String
    },
    googleID: {
        type: String
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    userphoto:{
        type: String
    },
    propertiesOwned: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Property'
        }
    ]
})
module.exports = mongoose.model('User',userSchema)