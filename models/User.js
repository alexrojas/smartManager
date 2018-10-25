const mongoose = require('mongoose')
// const Schema = mongoose.Schema
const { Schema } = mongoose
//Create Schema

const userSchema = new Schema({
  provider: {type: String},
  googleId: {type: String},
  facebookId: {type: String},
  name: {type: String},
  email: {type: String},
  password: {type: String},
  image: {type: String},
  date: {type: Date, defaul: Date.now},
})


const User = mongoose.model("User", userSchema);

module.exports = User
// module.exports = User
