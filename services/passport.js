const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook')
const keys = require('../config/keys')
const mongoose = require("mongoose");
const User = require('../models/User')

// const User = mongoose.model("User", userSchema);
//Google Passport
passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: "/auth/google/callback"
}, (accessToken, refreshToken, profile, cb) => {
  console.log('Google Profile',profile);
  console.log('Google Email>>>**',profile.name.familyName);
  User.findOne({
    'googleId': profile.id
  }, function(err, user) {
    if (err) {
      return done(err)
    }
    if (!user) {
      user = new User({
        googleId: profile.id,
        name:{
          familyName: profile.name.familyName,
          givenName: profile.name.givenName,
        },
        displayName: profile.displayName,
        email: profile.emails[0].value,
        // username: profile.username,
        provider: 'Google'
      })
      user.save(function(err) {
        if (err)
          console.log(err);
        // return done(err, user);
      });
    }
  })
  }
 )
);

// Facebook Passport
passport.use(new FacebookStrategy({
  clientID: keys.facebookClientId,
  clientSecret: keys.facebookClientSecret,
  callbackURL: "/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'photos', 'email']
}, function(accessToken, refreshToken, profile, cb) {
  // console.log('accessTokenFacebook', accessToken);
  // console.log('refreshTokenFacebook', refreshToken);
  console.log('profileFacebook>>>>>', profile);
  // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
  //   return cb(err, user);
  // });
  User.findOne({
    'facebookId': profile.id
  }, function(err, user) {
    if (err) {
      return done(err)

    }
    if (!user) {
      user = new User({
        facebookId: profile.id,
        name:{
          familyName: profile.name.familyName,
          givenName: profile.name.givenName,
        },
        displayName: profile.displayName,
        gender: profile.gender,
        email: profile.emails[0].value,
        provider: 'facebook'
      })
      user.save(function(err) {
        if (err)
          console.log(err);
        // return done(err, user);
      });
    }
  })
}));
