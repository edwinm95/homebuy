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
            return {_id: user._id, firstname: user.firstname, lastname: user.lastname, email: user.email, userphoto: user.userphoto }
            }catch(error){
               throw new Error(error)
            }
        }else{
            throw new Error('User not authenticated')
        }
    }
}