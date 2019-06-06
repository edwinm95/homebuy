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
        type: Boolean,
        required: true
    },
    profressionalcategory: String,
    profressionaltitle: String,
    buisnessname: String,
    buisnessaddress: String,
    buisnesscity: String,
    buisnessstate: String,
    buisnesszipcode: String,
    buisnessphone: String,
    propertiesOwned: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Property'
        }
    ]
})
module.exports = mongoose.model('User',userSchema)