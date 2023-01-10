const router = require('express').Router();
const { User } = require('../models');  // will need ot add other models
const withAuth = require('../utils/auth');

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');  // this will need to change
    return;
  }

  res.render('login');  // make sure we have a view that matches
});

// do a 404 page '*' route


module.exports = router;
