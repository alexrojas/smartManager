const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook')


module.exports = app =>{

  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  app.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/login'}), function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


  app.get('/auth/facebook',
  passport.authenticate('facebook'));

  app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    console.log(req);
    // Successful authentication, redirect home.
    res.redirect('/');
  });


}
