import gql from 'graphql-tag'
export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    userId: ID!
  }
`
export const resolvers = {}