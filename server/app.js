var express = require('express');
var cookieParser = require('cookie-parser');
const graphqlHttp = require('express-graphql')
const mongoose = require('mongoose')
var app = express();
var keys = require('./config/keys')
const schema = require('./graphql/schema')
const resolvers = require('./graphql/resolvers')
const isAuth = require('./middleware/is-auth')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

mongoose.connect(keys.mongoURI, { useNewUrlParser: true})
//GraphQL
app.use(isAuth)
app.use('/graphql',graphqlHttp({
  schema,
  rootValue: resolvers,
  graphiql: true
}))


module.exports = app;
