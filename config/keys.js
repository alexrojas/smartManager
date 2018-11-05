//here we will figure it our fi we are in dev or production
if (process.env.NODE_ENV === "production"){
  const prod_keys = require('./prod')
  module.exports = prod_keys
}else{
  const dev_keys = require('./dev')
  module.exports = dev_keys
}
