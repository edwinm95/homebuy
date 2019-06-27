const Message = require('../../models/message')
const MessageReference = require('../../models/messageReference')
const Property = require('../../models/property')
const User = require('../../models/user')
const getMessageDescription = function(messageReference)  {
        return new Promise((resolve,reject) => {
            var messageReferncePromise = []
            messageReference.forEach((messageReference) => {
                let promise = new Promise((resolve, reject) => {
                    var messagePromiseArray = []
                    messageReference.messages.forEach((id) => {
                        let messagePromise = new Promise( (resolve) => {
                            Message.findById(id).then((message) => {
                                return resolve(message)
                            })
                        })
                        messagePromiseArray.push(messagePromise)
                    })
                    Promise.all(messagePromiseArray).then(messages => {
                        console.log(messages)
                        return resolve(messages)
                    })
                })
                messageReferncePromise.push(promise)
            })
            Promise.all(messageReferncePromise)
            .then(message => resolve(message))
        })
}
module.exports = {
    createMessage: async (args,req) => {
        try{
            if(req.isAuth){
                const propertyID = args.messageInput.property
                const messageBody = args.messageInput.body
                const userReceiverID = args.messageInput.to
                const property = await Property.findById(propertyID)
                const creator = await User.findById(userReceiverID)
                const recepient = await User.findById(req.userId)
                const message = new Message({
                    timestamp: Date.now(),
                    body: messageBody,
                    creator,
                    recepient,
                })
                message.save().then( async (messageSaved) => {
                    if(messageSaved){
                        const messageReference = new MessageReference({
                            messages: messageSaved,
                            property
                        })
                        messageReference.recepients = [creator, recepient]
                        const messageReferenceSaved = await messageReference.save()
                        if(messageReferenceSaved){
                            return true
                        }else{
                            throw new Error('Unalbe to save message')
                        }
                    }
                })  
            }else{
                throw new Error('User not authenticated')
            }
        }catch(error){
            console.log(error)
            throw error
        }
    },
    getMessage: async (args, req) => {
        try{
            if(req.isAuth){
                const user = await User.findById(req.userId)
                console.log(user)
                const messageReference = await MessageReference.find({
                    recepients : { $in: [user._id] }
                })
                .populate('messages')
                .populate('recepients')
                .populate('property')
                return messageReference
            }else{
                throw new Error('User not authenticted')
            }
        }catch(error){
            console.log(error)
            throw error
        }

    }
}