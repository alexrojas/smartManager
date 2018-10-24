const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook')
const keys = require('../config/keys')

//Google Passport
passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: "/auth/google/callback"
}, (accessToken, refreshToken, profile, cb) => {
  console.log('accessToken', accessToken);
  console.log('refreshToken', refreshToken);
  console.log('profile', profile);
  console.log('cb', cb);
  // User.findOrCreate({ googleId: profile.id }, function (err, user) {
  //   return cb(err, user);
  // });
}));



// Facebook Passport
passport.use(new FacebookStrategy({
  clientID: keys.facebookClientId,
  clientSecret: keys.facebookClientSecret,
  callbackURL: "/auth/facebook/callback"
}, function(accessToken, refreshToken, profile, cb) {
  console.log('accessTokenFacebook', accessToken);
  console.log('refreshTokenFacebook', refreshToken);
  console.log('profileFacebook', profile);
  // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
  //   return cb(err, user);
  // });
}));
