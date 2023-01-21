const router = require('express').Router();
const { User, Book, Comment } = require('../../models');  
const withAuth = require('../../utils/auth');

// Find all comments (associated with a single book) -- not needed for rendering, but we can still have an api path for this
router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: {
        model: Book,
        attributes: ['id', 'title'],
      }
    });

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a comment
router.post('/', async (req, res) => {
  try {
    const newComment = await Comment.create(req.body);
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE a comment
router.put('/:id', withAuth, async (req, res) => {
  console.log(req.body, "Updated")
  try {
    const updateComment = await Comment.update(req.body, {
      where: {
        id: req.params.id
      }
    })

    if (!req.session.user) {
      return res.status(404).json({ message: 'Please login to update comment.' });
    }
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

    if (!req.session.user) {
      res.status(404).json({ message: 'Please login to delete comment.' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});
  
module.exports = router;
  