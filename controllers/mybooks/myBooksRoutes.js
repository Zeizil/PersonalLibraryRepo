const router = require('express').Router();
const { Book, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


// Get all books associated with a user (no need to grab comments here)
router.get('/', withAuth, async (req, res) => {   // this path probly should be a user id and will probly move out of this file
  try {

  // Find all books assocaited with that user
  const bookData = await Book.findAll({
    attributes: { exclude: ['user_id'] },
    where: { user_id : req.session.user_id }
  });

  // Serialize
  const books = bookData.map((book) => book.get({ plain: true }));

  // dev-step -- curious what this looks like
  console.log(books);

  res.end();

  // Render 'yourbooks' template, with the array passed in (as object)
  //res.render('inventory template', { books });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single book by its ID, assoicated with that user -- also gets the comment for that book, from that user
router.get('/:id', withAuth, async (req, res) => {  //this path should be a userId, then the bookId, and again, move out of this file
  try {

    // Find the one book and its comment
    const bookData = await Book.findOne({
      include: {
        model: Comment,
        attributes: ['content'],
      },
      attributes: { exclude: ['user_id'] },
      where: {
        id: req.params.id
      }
    });

    // Serialize
    const book = bookData.get({ plain: true });

    console.log(book);

    res.end();

    // Render 'book' template with that one book, and its assoc. user comment passed in
    // res.render('show one book template', { book });

  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
