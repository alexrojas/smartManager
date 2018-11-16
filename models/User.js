const mongoose = require('mongoose')
// const Schema = mongoose.Schema
const { Schema } = mongoose
//Create Schema

const userSchema = new Schema({
  provider: {type: String},
  googleId: {type: String},
  facebookId: {type: String},
  name: {
    familyName: {type: String},
    givenName: {type: String}
  },
  displayName: {type: String},
  email: {type: String},
  password: {type: String},
  gender: {type: String},
  image: {type: String},
  date: {type: Date, default: Date.now},
})


const User = mongoose.model("User", userSchema);

module.exports = User
// module.exports = User
