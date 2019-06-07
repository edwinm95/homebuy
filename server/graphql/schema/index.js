const { buildSchema } = require('graphql')
module.exports = buildSchema(`
      scalar Upload
      type Property {
        _id: ID!
        description: String!
        date: String!
        address: String!
        rent: Int!
        securitydeposit: Int!
        beds: String!
        baths: String!
        squarefeet: Int!
        leaseduration: String!
        leaseterms: String!
        contactinfoname: String!
        contactinfophone: String!
        contactinfoemail: String!
        contactinfoforrentby: String!
        amenitiesoptional: [String]
        amenitieslaundry: String!
        amenitiespets: String!
        photos: [String!]!
        additionalamenities: [String]
        createdBy: ID!
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
        profressionalcategory: String
        profressionaltitle: String
        industryProfressional: Boolean!
        buisnessname: String
        buisnessaddress: String
        buisnesscity: String
        buisnessstate: String
        buisnesszipcode: String
        buisnessphone: String
        buisnessfacebook: String
        buisnesstwitter: String
        buisnesslinkedin: String
        buisnesswebsite: String
        propertiesOwned: [Property]
      }
      type AuthData {
        userId: ID!
        token: String
        tokenExpiration: Int!
        googleUserFound: Boolean
      }
      input PropertyInput {
        description: String
        address: String
        date: String
        rent: String
        securitydeposit: String
        beds: String
        baths: String
        squarefeet: String
        leaseduration: String
        leaseterms: String
        contactinfoname: String
        contactinfophone: String
        contactinfoemail: String
        contactinfoforrentby: String
        amenitiesoptional: [String]
        amenitieslaundry: String
        amenitiespets: String
        additionalamenities: [String]
        photos: [Upload!]!
      }
      input UserInput {
        facebookID: String
        googleID: String
        googleToken: String
        password: String
        email: String!
        firstname: String
        lastname: String
        username: String
        userphoto: Upload
        profressionalcategory: String
        profressionaltitle: String
        industryProfressional: Boolean!
        buisnessname: String
        buisnessaddress: String
        buisnesscity: String
        buisnessstate: String
        buisnesszipcode: String
        buisnessphone: String
        buisnessfacebook: String
        buisnesstwitter: String
        buisnesslinkedin: String
        buisnesswebsite: String
      }
      type RootQuery {
          properties: [Property!]!
          users: [User!]!
          refreshToken: AuthData!
          getUser: User!
      }
      type RootMutation {
          login(email: String!, password: String!): AuthData!
          createProperty(propertyInput: PropertyInput): Boolean
          createUser(userInput: UserInput): User
          editUser(userInput: UserInput): Boolean
          testPhoto(file: Upload!) : Boolean
          verifyGoogleToken(token: String!): AuthData!
          addGoogleUser(userInput: UserInput): AuthData
      }
      schema {
          query: RootQuery
          mutation: RootMutation
      }
  `)