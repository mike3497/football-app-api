const express = require('express');
const { getAllGames, updateGames } = require('../controllers/game.controller');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');

router.get('/', protect, getAllGames);
router.post('/update', updateGames);

module.exports = router;
