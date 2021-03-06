const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook')


module.exports = app =>{
//Google
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  app.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/api/current_user'}), function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/surveys');

  });



//Facebook
  app.get('/auth/facebook',
  passport.authenticate('facebook'));

  app.get('/auth/facebook/callback', passport.authenticate('facebook',
  {scope: ['email'] }), function(req, res) {
    // console.log(req);
    // Successful authentication, redirect home.
    res.redirect('/surveys');

  });

  app.get('/api/current_user', (req, res) =>{
    // console.log('currentUser',req)

    res.json(req.user)
  })



  app.get('/api/logout', (req, res)=>{
    req.logout()
    res.redirect('/')
  })


}
// https://smart-manager1.herokuapp.com/auth/facebook/callback


// https://smart-manager1.herokuapp.com/auth/facebook/callbackRemovehttps://smart-manager1.herokuapp.com/auth/googleRemovehttps://smart-manager1.herokuapp.com/api/current_userRemove
