const mongoose = require('mongoose')
const {Schema} = mongoose;

const userSchema = new Schema ({
    facebookID: {
        type: String
    },
    googleID: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    username: {
        type: String
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