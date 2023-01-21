const router = require('express').Router();
const { User, Book, Comment } = require('../../models');  
const withAuth = require('../utils/auth');

// Find all comments (associated with a single book) -- not needed***
router.get('/', async (req, res) => {
    try {
      const commentData = await Comment.findAll({
        include: { 
          model: Book, 
          attributes: ['id','title' ],
      }
    });
    
    // Serialize data so the template can read it
    const comments = commentData.map((comment) => comment.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      comments, 
      logged_in: req.session.logged_in 
    });

      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // Get one comment --- put this in bookRoutes***
  router.get('/:id', async (req, res) => {
    try {
      const commentData = await Comment.findByPk(req.params.id, {
        include: [{ model: Book }],
      });
  
      const comment = commentData.get({ plain: true });

    res.render('comment', {
      ...comment,
      logged_in: req.session.logged_in
    });
      
      if (!commentData) {
        res.status(404).json({ message: 'No results found.' });
        return;
      }
  
      res.status(200).json(commentData);
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
router.put('/:id', withAuth, async (req,res) => {
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
  
