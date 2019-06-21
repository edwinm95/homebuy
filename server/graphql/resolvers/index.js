const authResolver = require('./auth')
const propertyResolver = require('./property')
const userResolver = require('./user')
const messageResolver = require('./message')
module.exports = {
    ...authResolver,
    ...propertyResolver,
    ...userResolver,
    ...messageResolver
}