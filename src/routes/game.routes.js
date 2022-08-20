const express = require('express');
const { getAll, getFromApi } = require('../controllers/game.controller');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');

router.get('/', protect, getAll);
router.post('/games-from-api', protect, getFromApi);

module.exports = router;
