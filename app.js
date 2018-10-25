const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const keys = require('./config/keys')
require('./models/User')
require('./services/passport')


const app = express()

mongoose.connect(keys.mongoURI)
.then(()=> {
  console.log('MongoDb connected MDLAB')
})
.catch(err => console.log(err))

authRoutes(app)

app.get('/', (req, res) => {
  res.send({hi: "there"})
})

// here we are setting the listener either for local or deployed
const PORT = process.env.PORT || "5000"
app.listen(PORT, (req, res) => {
  console.log("server has started")
})
