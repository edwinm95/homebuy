const User = require('../../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {OAuth2Client} = require('google-auth-library')
const keys = require('../../config/keys')
const {CLIENT_ID} = keys.google
const client = new OAuth2Client(CLIENT_ID)
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
    verifyGoogleToken: async (args) => {
        console.log(args)
        const ticket = await client.verifyIdToken({
            idToken: args.token,
            audience: CLIENT_ID
        })
        const payload = ticket.getPayload()
        console.log(payload)
        const googleID = payload.sub
        var user = await User.findOne({googleID})
        if(user){
            console.log(user)
            const token = await jwt.sign({userId: user.id, email: user.email},'secretkey',{
                expiresIn: 60 * 60
            })
            return {userId: user.id, token: token, tokenExpiration: 1}
    
        }
        return {googleUserFound: false}
    },
    addGoogleUser: async (args,req) => {
        const ticket = await client.verifyIdToken({
            idToken: args.userInput.googleToken,
            audience: CLIENT_ID
        })
        const payload = ticket.getPayload()
        console.log(payload)
        const googleID = payload.sub
        const {
            email,
            firstname,
            lastname,
            username,
            userphoto,
            profressionalcategory,
            profressionaltitle,
            industryProfressional,
            buisnessname,
            buisnessaddress,
            buisnesscity,
            buisnessstate,
            buisnesszipcode,
            buisnessphone
        } = args.userInput
        const user = new User({
            googleID,
            email,
            firstname,
            lastname,
            username,
            userphoto,
            profressionalcategory,
            profressionaltitle,
            industryProfressional,
            buisnessname,
            buisnessaddress,
            buisnesscity,
            buisnessstate,
            buisnesszipcode,
            buisnessphone
        })
        const result = await user.save()
        if(result){
            const token = await jwt.sign({userId: user.id, email: user.email},'secretkey',{
                expiresIn: 60 * 60
            })
            return {userId: user.id, token: token, tokenExpiration: 1}
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
            expiresIn: 60 * 60
        })
        return {userId: user.id, token: token, tokenExpiration: 1}
    },
    refreshToken: async (args, req) => {
        try{
            if(req.isAuth){
                const { userId } = req
                const user = await User.findById(userId)
                const token = await jwt.sign({userId: user.id, email: user.email},'secretkey',{
                    expiresIn: 60 * 60
                })
                return {userId, token, tokenExpiration: 1}  
            }else{
                throw new Error('User not authenticated')
            }
        }catch(error){
            throw error
        }
    }
}