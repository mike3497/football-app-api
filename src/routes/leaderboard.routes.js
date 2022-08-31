const express = require('express');
const { getLeaderboard } = require('../controllers/leaderboard.controller');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');

router.get('/', getLeaderboard);

module.exports = router;
