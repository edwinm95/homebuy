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
        password: String
        firstname: String
        lastname: String
        username: String
        email: String!
        userphoto: String
        propertiesOwned: [Property]
      }

      type AuthData {
        userId: ID!
        token: String
        tokenExpiration: Int!
      }

      input PropertyInput {
        title: String!
        description: String!
        date: String!
      }
      input UserInput {
        facebookID: String
        googleID: String
        password: String!
        email: String!
        userphoto: String
      }


      type RootQuery {
          properties: [Property!]!
          users: [User!]!
          login(email: String!, password: String!): AuthData!
          refreshToken: AuthData!
          getUser: User!
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