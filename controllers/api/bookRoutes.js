const router = require('express').Router();
const { User, Book, UserBook } = require('../../models');
const withAuth = require('../../utils/auth');

// Adds a book to DB, and LINKS it to a user
router.post('/', withAuth, async (req, res) => {    // withAtuh needed
  try {

    const newBook = await Book.create({
      ...req.body,                        // make sure the front end JS passes the correct fields in, as I'm not validating req.body here
      user_id: req.session.user_id
    });

    // Link the user to that book thru UserBook
    const newUserBookLink = await UserBook.create({
      book_id: newBook.id,
      user_id: req.session.user_id
    });

    res.status(200).json({newBook, newUserBookLink});
  } catch (error) {
    res.status(500).json(error);
  }
});

// Removes a book from user's inventory -- doesn't delete the book, but deletes the link of that book from that user
router.delete('/:id', withAuth, async (req, res) => {
  try {

    // Look for BOTH the userID (who wants to remove the book) (req.session.user_id), AND the ID of that book (req.params.id)
    const deletedLink = await UserBook.destroy({
      where: {
        book_id: req.params.id,
        user_id: req.session.user_id
      }
    });

    res.status(200).json(deletedLink);  //make sure the front-end fetch request redirects to the right spot (probly the inventory list of a users books, now without this one)
  } catch (error) {
    res.status(500).json(error)
  }
});


module.exports = router;
