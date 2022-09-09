const express = require('express');
const router = express.Router();
const {
	signUp,
	signIn,
	getMe,
	get,
} = require('../controllers/user.controller');
const { protect } = require('../middleware/auth.middleware');

router.post('/sign-up', signUp);
router.post('/sign-in', signIn);
router.get('/me', protect, getMe);
router.get('/:userId', protect, get);

module.exports = router;
