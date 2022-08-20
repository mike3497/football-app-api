const express = require('express');
const { addPick, getPicks } = require('../controllers/pick.controller');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');

router.get('/', protect, getPicks);
router.post('/', protect, addPick);

module.exports = router;
