const router = require('express').Router();
const { register, login } = require('../controllers/AuthController');

// middleware
const { validateRegister, validateLogin } = require('../middlewares/AuthValidator');

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

module.exports = router;