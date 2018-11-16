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
    //user.name will return on json only the name
    cb(null, user);
  });
});


// const User = mongoose.model("User", userSchema);
//Google Passport
passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: "/auth/google/callback"
},
  async (accessToken, refreshToken, profile, done) => {
  console.log('Google Profile',profile);
  console.log('Google Email>>>**',profile.name.familyName);
   const existingUser = await User.findOne({'googleId': profile.id})

      if(existingUser){
        return done(null, existingUser)
      }
        user = new User({
          googleId: profile.id,
          name:{
            familyName: profile.name.familyName,
            givenName: profile.name.givenName,
          },
          displayName: profile.displayName,
          email: profile.emails[0].value,
          provider: 'Google'
        })
        const user = await user.save()
          done(null, user)

  }
 )
);

// Facebook Passport
passport.use(new FacebookStrategy({
  clientID: keys.facebookClientId,
  clientSecret: keys.facebookClientSecret,
  callbackURL: "/auth/facebook/callback",
  // profileFields: ['id', 'displayName', 'photos', 'emails'],
  profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified', 'displayName', 'photos'],
  proxy: true
},
async (accessToken, refreshToken, profile, done) => {
  // console.log('profileFacebook>>>>>', profile);
  // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
  //   return cb(err, user);
  // });
  const existingUser =  await User.findOne({ 'facebookId': profile.id})
    if(existingUser){
      console.log(`this user ${existingUser.name}, already exist`);
      return done(null, existingUser)
    }
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
      await user.save()
      done(null, user)

}));
