const mongoose = require('mongoose')
// const Schema = mongoose.Schema
const { Schema } = mongoose
//Create Schema

const supplierSchema = new Schema({

  name: {type: String},
  displayName: {type: String},
  address: {type: String},
  email: {type: String},
  phone: {type: String},

  address:       {
        street: {
          type: String,
        },
        city: {
          type: String,
        },
        state: {
            type: String,// ,enum: statesArray (maybe)
        },
        zip: {
          type: Number,
        }
  },
  password: {type: String},
  image: {type: String},
  date: {type: Date, default: Date.now},
})


const Supplier = mongoose.model("Supplier", supplierSchema);

module.exports = Supplier
// module.exports = User
