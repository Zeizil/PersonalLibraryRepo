const router = require('express').Router();
const { User, Book, UserBook } = require('../../models');
const withAuth = require('../../utils/auth');

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
