const express = require('express');
const { updateGames, getGames } = require('../controllers/game.controller');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');

router.get('/', protect, getGames);
router.post('/', updateGames);

module.exports = router;
