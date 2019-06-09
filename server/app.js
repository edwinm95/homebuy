var express = require('express');
var cookieParser = require('cookie-parser');
const graphqlHttp = require('express-graphql')
const mongoose = require('mongoose')
var app = express();
const multer = require('multer')
var keys = require('./config/keys')
const schema = require('./graphql/schema')
const resolvers = require('./graphql/resolvers')
const isAuth = require('./middleware/is-auth')
const graphqlUpload = require('graphql-upload')
const cors = require('cors')
const { graphqlUploadExpress } = graphqlUpload

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())
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
// const storage = multer.memoryStorage()
// app.use(multer({
//   storage,
// }).single('file'))
app.use('/graphql',
  graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
  graphqlHttp({
    schema,
    rootValue: resolvers,
    graphiql: true
  }))


module.exports = app;
