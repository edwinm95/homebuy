const authResolver = require('./auth')
const propertyResolver = require('./property')
const userResolver = require('./user')
module.exports = {
    ...authResolver,
    ...propertyResolver,
    ...userResolver
}