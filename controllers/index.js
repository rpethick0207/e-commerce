const router = require('express').Router();

const apiRoutes = require('../controllers/api');
const homeRoutes = require('../controllers/home-routes');


router.use('/', homeRoutes);

router.use('/api', apiRoutes);

module.exports = router;
