
const mongoose = require("mongoose");
const passport = require('passport')
const Supplier = require('../models/Supplier')



module.exports = app =>{
  function isAuthenticated(req, res, next){
    if(req.user){
      return next()
    } else{
      res.redirect('/')
    }
  }

  app.get('/suppliers', (req, res)=>{
    console.log("tutututu", req.user);
    res.send('its working ')
  })

  app.post('/suppliers', (req, res)=>{

    console.log(req.user);
  const newSupplier = new Supplier({
    phone: req.body.phone,
    // user: req.user.id
  })

  newSupplier.save()
  .then((post)=>{
    res.json(post)
  })
})


}

//@route  Get api/profile
//@desc   get current user profile
//@acces  private (only signed in users, based on the payload)
