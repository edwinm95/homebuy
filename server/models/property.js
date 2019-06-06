const mongoose = require('mongoose')
const {Schema} = mongoose;

const propertySchema = new Schema({
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    address : {
        type: String,
        required: true
    },
    rent: {
        type: Number,
        required: true
    },
    securitydeposit:{
        type: Number,
        required: true
    },
    beds: {
        type: String,
        required: true
    },
    baths: {
        type: String,
        required: true
    },
    squarefeet: {
        type: Number,
        required: true
    },
    leaseduration: {
        type: String,
        required: true
    },
    leaseterms: {
        type: String,
        required: true
    },
    contactinfoname: {
        type: String,
        required: true
    },
    contactinfophone: {
        type: String,
        required: true
    },
    contactinfoemail: {
        type: String,
        required: true
    },
    contactinfoforrentby: {
        type: String,
        required: true
    },
    amenitiesoptional: {
        type: [String],
    },
    amenitieslaundry: {
        type: String,
        required: true
    },
    amenitiespets: {
        type: String,
        required: true
    },
    photos : {
        type: [String],
        required: true
    },
    additionalamenities: {
        type: [String],
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})
module.exports = mongoose.model('Property',propertySchema)