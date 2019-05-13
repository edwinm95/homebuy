const Property = require('../../models/property')
module.exports = {
    properties: () => {
        return Property.find().then().catch(err => {
          console.log(err)
          throw err
        })
        },
        createProperty: (args,req) => {
            
        const{ title, description, date} = args.propertyInput
        const property = new Property({
            title,
            description,
            date: new Date(date)
        })
        return property.save().then(result => {
            console.log(result)
            return {...result._doc}
        }).catch( err => {
            console.log(err)
            throw err;
        });
        }
}