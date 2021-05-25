const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const userController = require('../controllers/api/v1/users')

/* GET users listing. */
router.get('/', userController.getAll);
router.get('/:id', userController.getUserById);

router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;
