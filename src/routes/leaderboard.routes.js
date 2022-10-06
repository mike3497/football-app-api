const express = require('express');
const {
	getLeaderboard,
	getLeaderboardChart,
} = require('../controllers/leaderboard.controller');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');

router.get('/', getLeaderboard);
router.get('/chart/:userId', getLeaderboardChart);

module.exports = router;
