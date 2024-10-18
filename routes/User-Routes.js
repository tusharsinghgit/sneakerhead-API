const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController');

router.post('/signup', UserController.registerUser);
router.post('/signin', UserController.authUser);
router.get('/admin', UserController.getAllUsers);
router.post('/verify-password', UserController.verifyPassword);
router.post('/reset-password', UserController.resetPassword);

module.exports = router;