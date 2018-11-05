const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook')
const keys = require('../config/keys')
const mongoose = require("mongoose");
const User = require('../models/User')



passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});


// const User = mongoose.model("User", userSchema);
//Google Passport
passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: "/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
  console.log('Google Profile',profile);
  console.log('Google Email>>>**',profile.name.familyName);
  User.findOne({'googleId': profile.id})
    .then((existingUser)=>{
      if(existingUser){

        return done(null, existingUser)
      }else{
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
        return user.save()
        .then(user =>{
          done(null, user)
        })
      }
    })
    .catch(error =>{
      console.log("carajo", error)
    })

  }
 )
);

// Facebook Passport
passport.use(new FacebookStrategy({
  clientID: keys.facebookClientId,
  clientSecret: keys.facebookClientSecret,
  callbackURL: "/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'photos', 'email'],
  proxy: true
}, function(accessToken, refreshToken, profile, done) {
  console.log('profileFacebook>>>>>', profile);
  // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
  //   return cb(err, user);
  // });
  User.findOne({ 'facebookId': profile.id})
  .then((existingUser, err)=>{
    if(existingUser){
      // console.log(`this user ${existingUser}, already exist`);
      return done(null, existingUser)
    }else{
      console.log('mierda', profile);
      user = new User({
        facebookId: profile.id,
        name:{
          familyName: profile.name.familyName,
          givenName: profile.name.givenName,
        },
        displayName: profile.displayName,
        gender: profile.gender,
        // email: profile.emails[0].value,
        provider: 'facebook'
      })
      return user.save()
      .then(user =>{
        done(null, user)
      });
    }
  })
  .catch(error =>{
    console.log("carajo", error)
  })
}));
