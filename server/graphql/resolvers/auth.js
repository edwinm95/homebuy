const User = require('../../models/user')
const bcrypt = require('bcryptjs')
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
        }
}