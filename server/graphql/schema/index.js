const { buildSchema } = require('graphql')
module.exports = buildSchema(`

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
        password: String!
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
  `)