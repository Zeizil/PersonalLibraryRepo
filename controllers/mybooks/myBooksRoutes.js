const router = require('express').Router();
const { Book, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


// Get all books associated with a user (no need to grab comments here)
router.get('/', withAuth, async (req, res) => {
  try {
    // Find all books assocaited with that user
    const bookData = await Book.findAll({
      attributes: { exclude: ['user_id'] },
      where: { user_id: req.session.user_id }
    });

    // Serialize and render
    const books = bookData.map((book) => book.get({ plain: true }));

    res.render('yourBooks', { books });

  } catch (err) {
    res.render('server-error');
  }
});

// Get a single book by its ID, assoicated with that user -- also gets the comment for that book, from that user
router.get('/:id', withAuth, async (req, res) => {
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

    // Serialize and render
    const book = bookData.get({ plain: true });

    res.render('book', { book });
  } catch (err) {
    res.render('server-error');
  }
});


module.exports = router;
