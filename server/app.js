var express = require('express');
var cookieParser = require('cookie-parser');
const graphqlHttp = require('express-graphql')
const { buildSchema } = require('graphql')
const mongoose = require('mongoose')
var app = express();
var keys = require('./config/keys')
const Property = require('./models/property')
const User = require('./models/user')
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

mongoose.connect(keys.mongoURI, { useNewUrlParser: true})
//GraphQL
app.use('/graphql',graphqlHttp({
  schema: buildSchema(`

      type Property {
        _id: ID!
        title: String!
        address: String!
        price: Float!
        date: String!
        beds: String!
        baths: String!
        squareFeet: String!
        leaseterms: String!
        description: String!
        contactInfo: String!
        Amenities: String!
        Photos: String!
        showingAvaliability: String!
      }
      type User{
        _id: ID!
        facebookID: String
        googleID: String
        username: String!
        password: String
        email: String!
        userphoto: String
        propertiesOwned: [Property]
      }

      input PropertyInput {
        title: String!
        description: String!
        date: String!
      }
      input UserInput {
        facebookID: String
        googleID: String
        username: String!
        passowrd: String!
        email: String!
        userphoto: String
      }


      type RootQuery {
          properties: [Property!]!
          users: [User!]!
      }
      type RootMutation {
          createProperty(propertyInput: PropertyInput): Property
          createUser(userInput: UserInput): User
      }
      schema {
          query: RootQuery
          mutation: RootMutation
      }
  `),
  rootValue: {
    properties: () => {
        return Property.find().then().catch(err => {
          console.log(err)
          throw err
        })
    },
    createProperty: (args) => {
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
    },
    createUser: (args) => {
      const {facebookID, googleID, username, password, email, userphoto} = args.userInput
      const user = new User({
        facebookID,
        googleID,
        username,
        password,
        email,
        userphoto
      })
    }
  },
  graphiql: true
}))


module.exports = app;
