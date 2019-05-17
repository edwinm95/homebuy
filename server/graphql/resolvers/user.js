const User = require('../../models/user')
module.exports = {
    getUser: async (args,req) => {
        if(req.isAuth){
            try{
            const {userId} = req
            var user = await User.findById(userId)
            if(!user){
                throw new Error('User not found')
            }
            return {_id: user._id, firstname: user.firstname, lastname: user.lastname, email: user.email, userphoto: user.userphoto, username: user.username }
            }catch(error){
               throw new Error(error)
            }
        }else{
            throw new Error('User not authenticated')
        }
    },
    editUser: async(args,req) => {
        if(req.isAuth){
            const {userId} = req
            console.log(args)
            const {
                email,
                firstname,
                lastname,
                username,
                userphoto,
                category,
                title,
                buisnessName,
                buisnessAddress,
                buisnessCity,
                buisnessState,
                buisnessZIP
            } = args.userInput
            try{
                const user = await User.findById(userId)
                user.email = email
                user.firstname = firstname
                user.lastname = lastname
                user.username = username
                user.userphoto = userphoto
                user.profressional.category = category
                user.profressional.title = title
                user.profressional.buisnessName = buisnessName
                user.profressional.buisnessAddress = buisnessAddress
                user.profressional.buisnessCity = buisnessCity
                user.profressional.buisnessState = buisnessState
                user.profressional.buisnessZIP = buisnessZIP  
                const result = await user.save()
                const userSaved = result ? true : false
                return userSaved;
                
            }catch(error){
                throw error
            }
        }else{
            throw new Error('User not authenticated')
        }
    } 
}