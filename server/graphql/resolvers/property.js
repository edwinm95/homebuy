const Property = require('../../models/property')
const User = require('../../models/user')
const MessageReference = require('../../models/messageReference')
const { GraphQLUpload } = require('graphql-upload')
var pick = require('lodash.pick')
const fs = require('fs')
var listingImagesDir = `public/images/listing`
const storeFS = ({stream, filename},propertyID) => {
    const path = `${listingImagesDir}/${propertyID}/${filename}`;
        return new Promise((resolve, reject) => {
            if(!fs.existsSync(path)){
                stream.on("error", error => {
                    if(stream.truncated)
                        fs.unlinkSync(path)
                    reject(error)
                }).pipe(fs.createWriteStream(path))
                .on("error", error => reject(error))
                .on("finish", () => resolve({propertyID, filename}))
            }else{
                resolve({propertyID, filename})
            }
        })
}
const PhotosToArray = (photos) => {
    var promiseArray = []
    return new Promise((resolve, reject) => {
        photos.forEach((photo) => {
            let promise =  new Promise((resolve, reject) => {
                return resolve(photo)
            })
            promiseArray.push(promise)
        })
        Promise.all(promiseArray).then(photos => {
            resolve(photos)
        })
    })
}
const RemoveFiles = (fileNameArray,link) => {
    fileNameArray.forEach((file) => {
        fs.unlink(`${link}/${file}` , err => {
            if(err)
                console.log(err)
                return false
        })
        return true
    })
}
module.exports = {
    Upload: GraphQLUpload,
    getProperties: async () => {
        try{
            const property = await Property.find()
            return property
        }catch(error){
            console.log(error)
            throw error
        }
    },
    deleteProperty: async (args,req) => {
        try{
            if(req.isAuth){
                const {propertyID} = args
                Property.findOneAndRemove({_id: propertyID})
                .exec((err,removed) => {
                    User.findOneAndUpdate(
                        {_id: req.userId},
                        { $pull: {propertiesOwned: propertyID, propertieslikes: propertyID} },
                        {new: true},
                        (error, removedFromUser) => {
                            if(error){
                                throw new Error('Error deleting Property')
                            }
                            MessageReference.remove({property: propertyID}).exec((err,res) =>{
                                if(err){
                                    throw new Error('Erro deleting Message Reference')
                                }
                                return true
                            })
                        })
                })
            }else{
                throw new Error('User not authenticated')
            }
        }catch(error){
            throw error
        }
    },
    getUserProperties: async (args,req) => {
       try{ 
           if(req.isAuth){
                const {userId} = req
                const user = await User.findById(userId)
                console.log(user)
                return user.propertiesOwned
           }else{
               throw new Error('User not authenticated')
           }

       }catch(error){
           console.log(error)
           throw error
       }
    },
    handleSave: async (args,req) => {
        try{
            if(req.isAuth){
                console.log(args)
                const {command, propertyID} = args
                const property = await Property.findById(propertyID)
                if(property){
                    const userId = req.userId
                    const user = await User.findById(userId)
                    console.log(user.propertieslikes)
                    if(command === 'like'){
                        if(property.saves.indexOf(user) === -1){
                            property.saves.push(user)
                            user.propertieslikes.push(property)
                        }
                    }else if(command === 'unlike'){
                        if(property.saves.indexOf(userId) !== -1){
                            property.saves.splice(user,1)
                            user.propertieslikes.splice(property,1)
                        }
                    }
                    const userSaved = await user.save()
                    if(userSaved){
                        const result = await property.save()
                        if(result){
                            return result
                        }else{
                            throw new Error('Unable to Save Property')
                        }
                    }else{
                        throw new Error('Unable to Save User')
                    }
                }else{
                    throw new Error('Error finding property')
                }
            }else{
                throw new Error('User not authenticated')
            }
        }catch(error){
            console.log(error)
            throw error
        }
    },
    getProperty: async (args,req) => {
        try{
            if(req.isAuth){
                const {propertyID} = args
                const property = await Property.findById(propertyID)
                return property
            }else{
                throw new Error('User not authenticated')
            }   
        }catch(error){
            console.log(error)
            throw error
        }
    },
    editProperty: async (args,req) => {
        try{
            if(req.isAuth){
                const {_id} = args.propertyInput
                const property = await Property.findById(_id)
                const user = await User.findById(req.userId)
                if(property){
                    var propertyResults = pick(
                        args.propertyInput,
                        [
                            'description',
                            'address',
                            'rent',
                            'securitydeposit',
                            'beds',
                            'baths',
                            'squarefeet',
                            'leaseduration',
                            'leaseterms',
                            'contactinfoname',
                            'contactinfophone',
                            'contactinfoemail',
                            'contactinfoforrentby',
                            'amenitiesoptional',
                            'amenitieslaundry',
                            'amenitiespets',
                            'additionalamenities',
                        ]
                    )
                    for(var key in propertyResults){
                       property.key = propertyResults[key]
                    }
                    console.log(property.address)
                    const {photos} = args.propertyInput
                    const dir = `${listingImagesDir}/${property._id}`
                    const photosArray = await PhotosToArray(photos)
                    const photosArrayFileName = photosArray.map((photo) => {
                        return photo.filename
                    })
                    const removePhotoArray = []
                    const photofilename = []
                    property.photos.forEach((photo) => {
                        if(photosArrayFileName.indexOf(photo) === -1){
                            removePhotoArray.push(photo)
                        }
                    })
                    console.log(photosArray)
                    if(photosArray){
                        for(var i in photosArray){
                            var id = property._id
                            const {stream,filename} = await photosArray[i]
                            const photoSaved = await storeFS({stream,filename},id)
                            if(!photoSaved){
                                if(fs.existsSync(dir)){
                                    fs.rmdirSync(dir)
                                }
                                throw new Error('Couldnt save photo')
                            }
                            photofilename.push(filename)
                        }
                    }else{
                        if(fs.existsSync(dir)){
                            fs.rmdirSync(dir)
                        }
                        throw new Error('Photos not uploaded')
                    }
                    property.photos = photofilename
                    const propertySaved = await property.save()
                    if(propertySaved){
                        return propertySaved;
                    }else{
                         throw new Error('Unable to Save property')
                    }
                }else{
                    throw new Error('Property doesn\'t exist')
                }
            }else{
                throw new Error('User not authenticated')
            }

        }catch(error){
            console.log(error)
            throw error
        }
    },
    addViews: async (args, req) => {
        try{
            const {propertyID, ipAddress} = args
            const property = await Property.findById(propertyID)
            var ipAddressExist = false
            if(property.views){
                property.views.forEach((ip) => {
                    if(ip === ipAddress){
                        ipAddressExist = true
                    }
                })
                if(!ipAddressExist){
                    property.views = [...property.views, ipAddress]
                }
            }else{
                property.views = [ipAddress]
            }
            const result = await property.save()
            if(result){
                return property
            }else{
                throw new Error('Wasnt able to save property')
            }
        }catch(error){
            console.log(error)
            throw error
        }
    },
        createProperty: async (args,req) => {
            try{
                console.log(args.propertyInput)
                if(req.isAuth){
                    const {
                        description,
                        address,
                        rent,
                        securitydeposit,
                        beds,
                        baths,
                        squarefeet,
                        leaseduration,
                        leaseterms,
                        contactinfoname,
                        contactinfophone,
                        contactinfoemail,
                        contactinfoforrentby,
                        amenitiesoptional,
                        amenitieslaundry,
                        amenitiespets,
                        additionalamenities,
                        photos
                    } = args.propertyInput
                    const property = new Property ({
                        description,
                        address,
                        rent,
                        securitydeposit,
                        beds,
                        baths,
                        squarefeet,
                        leaseduration,
                        leaseterms,
                        contactinfoname,
                        contactinfophone,
                        contactinfoemail,
                        contactinfoforrentby,
                        amenitiesoptional,
                        amenitieslaundry,
                        amenitiespets,
                        additionalamenities,
                    })
                    const user = await User.findById(req.userId)
                    property.createdBy = user
                    const dir = `${listingImagesDir}/${property._id}`
                    var photofilename = []
                    if(!fs.existsSync(dir)){
                        fs.mkdirSync(dir)
                    }
                    if(photos){
                        for(var i in photos){
                            var id = property._id
                            const {stream,filename} = await photos[i]
                            const photoSaved = await storeFS({stream,filename},id)
                            if(!photoSaved){
                                if(fs.existsSync(dir)){
                                    fs.rmdirSync(dir)
                                }
                                throw new Error('Couldnt save photo')
                            }
                            photofilename.push(filename)
                        }
                    }else{
                        if(fs.existsSync(dir)){
                            fs.rmdirSync(dir)
                        }
                        throw new Error('Photos not uploaded')
                    }
                    property.photos = photofilename
                    console.log(property)
                    const result = await property.save()
                    if(result){
                            user.propertiesOwned.push(result)
                            const userSaved = await user.save()
                            if(userSaved){
                                return result
                            }else{
                                throw new Error('Unable to Save User')
                            }
                    }else{
                       throw new Error('Unable to save property')
                    }
                }else{
                    throw new Error('User not authenticated')
                }
            }catch(error){
                console.log(error)
                throw error
            }
        }
} 