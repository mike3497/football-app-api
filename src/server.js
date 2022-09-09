const path = require('path');
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/error.middleware');
const port = process.env.PORT || 5000;
const cors = require('cors');
const cron = require('node-cron');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.send('<p>Football App API!</p>');
});

const db = require('./config/db.config');
db.sync()
	.then(() => {
		console.log('Synced db.');
	})
	.catch((err) => {
		console.log('Failed to sync db: ' + err.message);
	});

app.use('/api/users', require('./routes/user.routes'));
app.use('/api/games', require('./routes/game.routes'));
app.use('/api/picks', require('./routes/pick.routes'));
app.use('/api/leaderboard', require('./routes/leaderboard.routes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
