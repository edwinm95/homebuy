const Message = require('../../models/message')
const MessageReference = require('../../models/messageReference')
const Property = require('../../models/property')
const User = require('../../models/user')
module.exports = {
    createMessage: async (args,req) => {
        try{
            if(req.isAuth){
                const propertyID = args.messageInput.property
                const messageBody = args.messageInput.body
                const userReceiverID = args.messageInput.to
                const getProperty = await Property.findById(propertyID)
                const userReceiver = await User.findById(userReceiverID)
                const userSender = await User.findById(req.userId)
                const message = new Message({
                    property: getProperty,
                    body: messageBody
                })
                message.save().then( async (messageSaved) => {
                    if(messageSaved){
                        const messageReference = new MessageReference({
                            message: messageSaved,
                            to: userReceiver,
                            from: userSender,
                        })
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
    }
}