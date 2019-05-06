const authResolver = require('./auth')
const propertyResolver = require('./property')
module.exports = {
    ...authResolver,
    ...propertyResolver
}