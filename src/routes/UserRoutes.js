const router = require('express').Router();
const { getAll, getOne } = require('../controllers/UserController');

// middleware
const { auth } = require('../middlewares/AuthMiddleware');

router.get('/', auth, getAll);
router.get('/:id', auth, getOne);

module.exports = router;