const { buildSchema } = require('graphql')
module.exports = buildSchema(`
      scalar Upload
      type Property {
        _id: ID!
        description: String!
        date: String!
        address: Address!
        rent: String!
        securitydeposit: String!
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
        views: [String]
        saves: [ID]
      }
      scalar Address{
        streetName: String
        city: String
        state: String
        zipcode: String
        lat: Int
        lon: Int
      }
      type Message {
        _id: ID!
        timestamp: String!,
        property: Property!
        body: String!

      }
      type MessageReference {
        message: ID!
        to: User!
        from: User!
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
        dateCreated: String
      }
      type AuthData {
        userId: ID
        token: String
        tokenExpiration: Int
        googleUserFound: Boolean
      }
      input PropertyInput {
        _id: ID
        description: String
        address: Address
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
      input MessageInput {
        to: ID!
        body: String!
        property: ID!
      }
      type RootQuery {
          getProperties: [Property!]!
          users: [User!]!
          refreshToken: AuthData!
          getUser: User!
          getProperty(propertyID: ID!): Property!
      }
      type RootMutation {
          login(email: String!, password: String!): AuthData!
          createProperty(propertyInput: PropertyInput): Property
          createUser(userInput: UserInput): User
          editUser(userInput: UserInput): Boolean
          testPhoto(file: Upload!) : Boolean
          verifyGoogleToken(token: String!): AuthData!
          addGoogleUser(userInput: UserInput): AuthData
          addViews(propertyID: ID!, ipAddress: String!): Property
          addSaves(propertyID: ID!): Boolean
          createMessage(messageInput: MessageInput): Boolean
          editProperty(propertyInput: PropertyInput): Property

      }
      schema {
          query: RootQuery
          mutation: RootMutation
      }
  `)