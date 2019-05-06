var express = require('express');
var cookieParser = require('cookie-parser');
const graphqlHttp = require('express-graphql')
const { buildSchema } = require('graphql')
const mongoose = require('mongoose')
var app = express();
var keys = require('./config/keys')

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

      input PropertyInput {
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

      type RootQuery {
          properties: [Property!]!
      }
      type RootMutation {
          createProperty(propertyInput: PropertyInput): Property
      }
      schema {
          query: RootQuery
          mutation: RootMutation
      }
  `),
  rootValue: {
    properties: () => {
        return['New York', 'Los Angeles']
    },
    createProperty: (args) => {
      const propertyName = args.name;
      return propertyName;
    }
  },
  graphiql: true
}))


module.exports = app;
