const router = require('express').Router();


router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');  // this will need to change to the 'show all of a users books' template
    return;
  }

  res.render('login');  // make sure we have a view that matches
});

// 'home' page, shows the search form, as well as results in the case that occurs
router.get('/', (req, res) => {

  let results;
  if (req.session.searchResults) {
    results = req.session.searchResults;
    delete req.session.searchResults;
    res.render('homepage', { results })
  } else {
    res.render('homepage');
  }

});

// handles search results
router.post('/', async (req, res) => {      // probably SHOULD move this to '/api/searchRoutes' or something

  const { resultsArr } = req.body;    // make sure when passing this in from the front-end that the vbl matches 'resultsArr'

  req.session.searchResults = resultsArr;

  res.status(200).json(resultsArr);

});

//catchall bad paths
// router.get('*', async (req, res) => {
//   res.render('404');
// });


module.exports = router;
