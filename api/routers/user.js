/* Libs */
const express = require('express');
const router = express.Router();

/* Middleware */
const checKAuth = require('../middleware/check-auth');

/* Controllers */
const userController = require('../controller/userController');

/*********** Users ************/

/* Sign Up */
router.post('/signup', userController.signup);

/* Login */
router.post('/login', userController.login);

/* Get User Data bu userId */
router.get('/:userId', userController.getUserById);

/* Get User Data by username */
router.get('/find/:username', userController.getUserByUserName);

/* Delete a User */
router.delete('/:userId', userController.delete);

module.exports = router;
