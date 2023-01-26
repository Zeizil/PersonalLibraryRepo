const router = require('express').Router();
const { Book } = require('../../models');
const withAuth = require('../../utils/auth');


// Adds a book to DB with assoc. user
router.post('/', withAuth, async (req, res) => {
  try {
    const newBook = await Book.create({
      ...req.body,
      user_id: req.session.user_id
    });

    res.status(200).json(newBook);
  } catch (error) {
    res.render('server-error');
  }
});

// Removes a book from user's inventory
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletedBook = await Book.destroy({
      where: {
        id: req.params.id
      }
    });

    res.status(200).json(deletedBook);  //make sure the front-end fetch request redirects to the right spot (probly the inventory list of a users books, now without this one)
  } catch (error) {
    res.render('server-error');
  }
});


module.exports = router;
