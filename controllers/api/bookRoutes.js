const router = require('express').Router();
const { User, Book } = require('../models');  
const withAuth = require('../utils/auth');


// Get all books
router.get('/', async (req, res) => {
    try {
      const bookData = await Book.findAll({
        include: [{ model: User }],
      });
      res.status(200).json(bookData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // Get a single book
  router.get('/:id', async (req, res) => {
    try {
      const bookData = await Book.findByPk(req.params.id, {
        include: [{ model: User }],
      });
  
      if (!bookData) {
        res.status(404).json({ message: 'No results found.' });
        return;
      }
  
      res.status(200).json(bookData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;