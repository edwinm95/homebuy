const User = require('../../models/user')
const fs = require('fs')
var pick = require('lodash.pick')
const { GraphQLUpload } = require('graphql-upload')
const storeFS = ({stream, filename}) => {
    const id = Date.now()
    const path = `public/images/${id}-${filename}`;
    return new Promise((resolve, reject) => {
        stream.on("error", error => {
            if(stream.truncated)
                fs.unlinkSync(path)
            reject(error)
        }).pipe(fs.createWriteStream(path))
        .on("error", error => reject(error))
        .on("finish", () => resolve({id, filename}))
    })
}
module.exports = {
    Upload: GraphQLUpload,
    getUser: async (args,req) => {
        if(req.isAuth){
            try{
            const {userId} = req
            var user = await User.findById(userId)
            if(!user){
                throw new Error('User not found')
            }
            const result = pick(
                            user, 
                            [
                                '_id',
                                'firstname',
                                'lastname',
                                'username',
                                'email',
                                'userphoto',
                                'profressionalcategory',
                                'profressionaltitle',
                                'industryProfressional',
                                'buisnessname',
                                'buisnessaddress',
                                'buisnesscity',
                                'buisnessstate',
                                'buisnesszipcode',
                                'buisnessphone',
                                'buisnessfacebook',
                                'buisnesstwitter',
                                'buisnesslinkedin',
                                'buisnesswebsite'
                            ])
            result['dateCreated'] = user.dateCreated.toString()
            return result
            }catch(error){
               throw new Error(error)
            }
        }else{
            throw new Error('User not authenticated')
        }
    },
    testPhoto: async (args, req) => {
        try{
            const { stream, filename, mimetype, encoding } = await args.file
            const variable =  await storeFS({stream, filename})
            console.log('Variable',variable)
        }catch(error){
            console.log(error)
        }
    },
    editUser: async(args, req) => {
        if(req.isAuth){
            const {userId} = req
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
            try{
                const user = await User.findById(userId)
                user.email = email
                user.firstname = firstname
                user.lastname = lastname
                user.username = username
                user.userphoto = userphoto
                user.industryProfressional = industryProfressional
                user.profressionalcategory = profressionalcategory
                user.profressionaltitle = profressionaltitle
                user.buisnessname = buisnessname
                user.buisnessaddress = buisnessaddress
                user.buisnesscity = buisnesscity
                user.buisnessstate = buisnessstate
                user.buisnesszipcode = buisnesszipcode 
                if(userphoto){
                    const { stream, filename, mimetype, encoding} = await userphoto
                    const userPhotoSaved =  await storeFS({stream, filename})
                    if(!userPhotoSaved){
                        throw new Error('Error saving User Photo')
                    }
                    user.userphoto = `${userPhotoSaved.id}-${userPhotoSaved.filename}`
                }else{
                    user.userphoto = null
                }
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