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
    // find the user_id of the book to be deleted
    const bookData = await Book.findOne({
      attributes: { exclude: ['title', 'isbn', 'author', 'image_url'] },
      where: {
        id: req.params.id
      }
    });
    
    // check to make sure the deleter is the owner of the book, then delete it
      //not serializing because I only need the one field from boookData
    if (bookData.dataValues.user_id === req.session.user_id) {
      const deletedBook = await Book.destroy({
        where: {
          id: req.params.id
        }
      });
  
      res.status(200).json(deletedBook);
    } else {
      res.status(403).json({ "message": "Forbidden"});
    }
  } catch (error) {
    res.render('server-error');
  }
});


module.exports = router;
