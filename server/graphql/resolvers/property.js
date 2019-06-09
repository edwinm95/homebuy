const Property = require('../../models/property')
const User = require('../../models/user')
const { GraphQLUpload } = require('graphql-upload')
var pick = require('lodash.pick')
const fs = require('fs')
var listingImagesDir = `public/images/listing`
const storeFS = ({stream, filename},propertyID) => {
    const path = `${listingImagesDir}/${propertyID}/${filename}`;
    return new Promise((resolve, reject) => {
        stream.on("error", error => {
            if(stream.truncated)
                fs.unlinkSync(path)
            reject(error)
        }).pipe(fs.createWriteStream(path))
        .on("error", error => reject(error))
        .on("finish", () => resolve({propertyID, filename}))
    })
}
module.exports = {
    Upload: GraphQLUpload,
    properties: () => {
        return Property.find().then().catch(err => {
          console.log(err)
          throw err
        })
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
                    const result = await property.save()
                    if(result){
                        return true
                    }else{
                        return false
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