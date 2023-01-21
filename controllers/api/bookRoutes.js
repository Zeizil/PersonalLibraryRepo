const router = require('express').Router();
const { User, Book, UserBook } = require('../../models');
const withAuth = require('../../utils/auth');

// !! Both of these 'gets' (the ensuing two routes) will be moved OUT of '/api'

// Get all books associated with a user (no need to grab comments here)
router.get('/', async (req, res) => {
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
router.get('/:id', async (req, res) => {
  try {

    // Find the one book (by ID - req.params.id) assoc with that user THROUGH UserBook
    const bookData = await Book.findOne({
      include: [{ model: User, through: UserBook, as: 'books_in_inventory'}],
      where: { user_id : req.session.user_id,
               book_id: req.params.id
       }
    })

    // Serialize
    const book = bookData.get({ plain: true });

    // Find the comment assocaited with this book AND this user

    // Render 'book' template with that one book, and its assoc. user comment passed in
    // res.render('show one book template', { book, comment });

  } catch (err) {
    res.status(500).json(err);
  }
});


// The following two WILL stay in this file

// Adds a book to DB, and LINKS it to a user (WIP)
router.post('/', withAuth, async (req, res) => {
  try {
    // May want to add logic to check if this book is already in the DB (match isbns)

    const newBook = await Book.create({
      ...req.body,                        // make sure the front end JS passes the correct fields in, as I'm not validating req.body here
      user_id: req.session.user_id
    });

    // Link the user to that book thru UserBook (I actually don't think this is how this works -- utilize the M:M rel'n ship in the above 'book' creeation..)
    const newUserBookLink = await UserBook.create({
      book_id: newBook.id,
      user_id: req.session.user_id
    });

    res.status(200).json(newBook, newUserBookLink);
  } catch (error) {
    res.status(500).json(err);
  }
});


// Removes a book from user's inventory -- doesn't delete the book, but deletes the link of that book from that user
router.delete('/:id', withAuth, async (req, res) => {
  try {

    // Look for BOTH the userID (who wants to remove the book) (req.session.user_id), AND the ID of that book (req.params.id)
    const deledLink = await UserBook.destroy({
      where: {
        book_id: req.params.id,
        user_id: req.session.user_id
      }
    });

    res.status(200).json(deledLink);  //make sure the front-end fetch request redirects to the right spot (probly the inventory list of a users books, now without this one)
  } catch (error) {
    res.status(500).json(error)
  }
});


module.exports = router;
