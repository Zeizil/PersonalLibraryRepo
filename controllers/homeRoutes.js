const router = require('express').Router();
const { User, Book, Comment, UserBook } = require('../models');
const withAuth = require('../utils/auth');


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
  }

  delete req.session.searchResults;

  // res.render('test-home', { results });    // remember the correct view name (the home/search view)
});


// handles search results
router.post('/', async (req, res) => {      // will have to move this to '/api/searchRoutes'

  const { resultsArr } = req.body;    // make sure when passing this in from the front-end that the vbl matches 'resultsArr'

  req.session.searchResults = resultsArr;

  res.status(200).json(resultsArr);

});


// Book/comment 'get&renders' -- this should probly go in a 'userRoutes' (not to be confused with '/api/userRoutes') -- maybe 'profileRoutes'? but on base level, parallel to this file

// Get all books associated with a user (no need to grab comments here)
router.get('/:userId', async (req, res) => {   // this path probly should be a user id and will probly move out of this file
  try {

  // Find all books assocaited with that user THROUGH UserBook
  const bookData = await Book.findAll({
    include: [{ model: User, through: UserBook, as: 'books_in_inventory'}],
    where: { user_id : req.session.user_id } // where do i put in the 'where the user id matches' piece?
  });

  // Serialize
  const books = bookData.map((book) => book.get({ plain: true }));

  // dev-step -- curious what this looks like
  console.log(books);

  // Render 'yourbooks' template, with the array passed in (as object)
  //res.render('inventory template', { books });

  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single book by its ID, assoicated with that user -- also gets the comment for that book, from that user
router.get('/:userId/:bookId', async (req, res) => {  //this path should be a userId, then the bookId, and again, move out of this file
  try {

    // Find the one book (by ID - req.params.id) assoc with that user THROUGH UserBook
    const bookData = await Book.findOne({
      include: [{ model: User, through: UserBook, as: 'books_in_inventory' }],
      where: {
        user_id: req.session.user_id, // this can also probly be req.params.userId
        book_id: req.params.bookId
      }
    })

    // Serialize
    const book = bookData.get({ plain: true });

    // Find the comment assocaited with this book AND this user

    const commentData = await Comment.findByPk(req.params.id, {   // to get the ID here, well probly have to go into the 'book' object from above and get it there
      include: [{ model: Book }],
    });

    const comment = commentData.get({ plain: true });

    res.render('comment', {       // make sure this view matches
      ...comment,
      logged_in: req.session.logged_in
    });

    if (!commentData) {
      res.status(404).json({ message: 'No results found.' });
      return;
    }

    // Render 'book' template with that one book, and its assoc. user comment passed in
    // res.render('show one book template', { book, comment });

  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
