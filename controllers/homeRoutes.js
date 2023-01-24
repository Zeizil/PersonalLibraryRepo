const router = require('express').Router();


router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// 'home' page, shows the search form, as well as results in the case that occurs
router.get('/', (req, res) => {

  let results;
  if (req.session.searchResults) {
    results = req.session.searchResults;
    delete req.session.searchResults;
    res.render('homepage', { results, logged_in: req.session.logged_in })
  } else {
    res.render('homepage', { logged_in: req.session.logged_in });
  }
});

// handles search results
router.post('/', (req, res) => {      // probably SHOULD move this to '/api/searchRoutes' or something

  const { resultsArr } = req.body;

  req.session.searchResults = resultsArr;

  res.status(200).json(resultsArr);

});

// // catch all bad paths
// router.all('*', (req, res) => {
//   res.render('404', { logged_in: req.session.logged_in });
// });


module.exports = router;
