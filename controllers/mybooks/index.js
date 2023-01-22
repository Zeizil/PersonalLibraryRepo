const router = require('express').Router();
const myBooksRoutes = require('./myBooksRoutes');

router.use('/', myBooksRoutes);

module.exports = router;