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

app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if(req.method === 'OPTIONS'){
      return res.sendStatus(200)
  }
  next()
})
app.use(isAuth)
app.use('/graphql',graphqlHttp({
  schema,
  rootValue: resolvers,
  graphiql: false
}))


module.exports = app;
