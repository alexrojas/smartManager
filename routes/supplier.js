
const mongoose = require("mongoose");
const passport = require('passport')

const Supplier = require('../models/Suppliers')


module.exports = app =>{

  function isAuthenticated(req, res, next){
    if(req.user){
      return next()
    } else{
      res.redirect('/carajo')
    }
  }



  app.get('/suppliers', isAuthenticated,(req, res)=>{
    console.log("tutututu", req.user);
    res.send('its working ')
  })


}

//@route  Get api/profile
//@desc   get current user profile
//@acces  private (only signed in users, based on the payload)
