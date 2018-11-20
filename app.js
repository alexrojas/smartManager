const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const supplier = require('./routes/supplier')
const keys = require('./config/keys')
const cookieSession = require('cookie-session')
const passport = require("passport")
require('./models/User')
require('./services/passport')
const bodyParser = require('body-parser')


const app = express()

app.use(cookieSession({
  name: 'session',
  keys: [keys.cookieKey],
  maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());
app.get('/connect/facebook', passport.authorize('facebook', { scope : ['email'] }))
mongoose.connect(keys.mongoURI)
.then(()=> {
  console.log('MongoDb connected MDLAB')
})
.catch(err => console.log(err))

authRoutes(app)
supplier(app)

app.get('/', (req, res) => {
  res.send({hi: "you are not logged in"})
})

// here we are setting the listener either for local or deployed
const PORT = process.env.PORT || "5000"
app.listen(PORT, (req, res) => {
  console.log("server has started")
})
