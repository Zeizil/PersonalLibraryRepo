const router = require('express').Router();

const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api');
const myBooksRoutes = require('./mybooks');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/mybooks', myBooksRoutes);

module.exports = router;
