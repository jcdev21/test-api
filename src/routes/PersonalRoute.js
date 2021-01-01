const router = require('express').Router();
const { getMyAccount } = require('../controllers/PersonalController');

// middleware
const { auth } = require('../middlewares/AuthMiddleware');

router.get('/', auth, getMyAccount);

module.exports = router;