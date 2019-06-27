const mongoose = require('mongoose')
const User = require('./user')
const {Schema} = mongoose
const messageReferenceSchema = new Schema ({
    messages: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Message'
        }
    ],
    property:{
        type: Schema.Types.ObjectId,
        ref: 'Property'
    },
    recepients: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
})
messageReferenceSchema.statics.findByUser = function(id, callback){
    try{
        const query = this.find()
        User.findById(id, function(error, user){
            query.where({recepients: user._id}).exec(callback)
        })
        return query
    }catch(error){
        console.log(error)
        throw error
    }
}


module.exports = mongoose.model('MessageReference',messageReferenceSchema)