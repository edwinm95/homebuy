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
    username:{
        type:String
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
    industryProfressional:{
        type: Boolean
    },
    profressional: {
        category: String,
        title: String,
        buisnessName: String,
        buisnessAddress: String,
        buisnessCity: String,
        buisnessState: String,
        buisnessZIP: String
    },
    propertiesOwned: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Property'
        }
    ]
})
module.exports = mongoose.model('User',userSchema)