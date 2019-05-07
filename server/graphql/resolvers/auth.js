const User = require('../../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
module.exports = {
    createUser: (args) => {
        const {facebookID, googleID, username, password, email, userphoto} = args.userInput
        return User.findOne({email}).then( user => {
            if(user){
            throw new Error('User exists already')
            }
            return bcrypt.hash(password, 12)
        }).then(hashed => {
            const user = new User({
            facebookID,
            googleID,
            username,
            password: hashed,
            email,
            userphoto
            })
            return user.save().catch(err => {throw err})
        }).then(result => {
            return {...result._doc, password: null }
        }).catch(err => {
            throw err
        })
        },
    login: async ({username, password}) =>{
        const user = await User.findOne({username})
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