const router = require('express').Router();
const { Comment } = require('../../models');  
const withAuth = require('../utils/auth');

// Find all comments
router.get('/', async (req, res) => {
    try {
      const commentData = await Comment.findAll({
        include: [{ model: Book }],
      });
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // Get one comment
  router.get('/:id', async (req, res) => {
    try {
      const commentData = await Comment.findByPk(req.params.id, {
        include: [{ model: Book }],
      });
  
      if (!commentData) {
        res.status(404).json({ message: 'No results found.' });
        return;
      }
  
      res.status(200).json(bookData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Create a comment
router.post('/', async (req,res) => {
try {
    const newComment = await Comment.create(req.body);
    res.status(200).json(newComment);
  }  catch (err) {
    res.status(400).json(err);
}
});

// UPDATE a comment
router.put("/:id", withAuth, async (req,res) => {
  console.log(req.body, "Updated")
  try {
    const updateComment = await Comment.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(updateComment);
  } catch (err) {
    res.status(400).json(err);
  }
})

// DELETE a comment
router.delete('/:id', async (req, res) => {
    try {
      const commentData = await Comment.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!commentData) {
        res.status(404).json({ message: 'No comment found.' });
        return;
      }
  
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;
  
