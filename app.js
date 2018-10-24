const express = require('express')
require('./services/passport')
const authRoutes = require('./routes/authRoutes')

const app = express()

authRoutes(app)


app.get('/', (req, res) => {
  res.send({hi: "there"})
})


// here we are setting the listener either for local or deployed
const PORT = process.env.PORT || "5000"
app.listen(PORT, (req, res) => {
  console.log("server has started")
})
