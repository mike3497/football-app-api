const express = require('express');
const {
	updateGames,
	getGames,
	getNewGames,
} = require('../controllers/game.controller');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');

router.get('/', protect, getGames);
router.post('/', getNewGames);
router.put('/', updateGames);

module.exports = router;
