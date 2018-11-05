//productoin enviorement, commit this
module.exports = {
  //here we will add all the strategys (facebook, hotmail)
  googleClientID: process.env.GOOGLE_CLIENT_ID ,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  facebookClientId: process.env.FACEBOOK_CLIENT_ID,
  facebookClientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY
}
