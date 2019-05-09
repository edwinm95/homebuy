const User = require('../../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
module.exports = {
    createUser: async (args) => {
        const {facebookID, googleID, password, email, userphoto} = args.userInput
            try{
                const existingUser = await User.findOne({email})
                if(existingUser){
                throw new Error('User exists already')
                }
                const hashed = await bcrypt.hash(password, 12)
                const user = new User({
                facebookID,
                googleID,
                password: hashed,
                email,
                userphoto
                })
                const result = await user.save()
                return  {...result._doc, password: null }
            }catch(error){
                throw error
            }
        },
    login: async ({email, password}) =>{
        const user = await User.findOne({email})
        if(!user){
            throw new Error('User doenst exist')
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            throw new Error('Password is invalid')
        }
        const token = await jwt.sign({userId: user.id, email: user.email},'secretkey',{
            expiresIn: '1h'
        })
        return {userId: user.id, token: token, tokenExpiration: 1}
    }
}