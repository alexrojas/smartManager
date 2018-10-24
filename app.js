const express = require('express')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook')
const app = express()
const keys = require('./config/keys')

app.get('/', (req, res) => {
  res.send({hi: "there"})
})

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

app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

app.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/login'}), function(req, res) {
  // Successful authentication, redirect home.
  res.redirect('/');
});

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

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

// here we are setting the listener either for local or deployed
const PORT = process.env.PORT || "5000"
app.listen(PORT, (req, res) => {
  console.log("server has started")
})
