const mongoose = require('mongoose');

const gameSchema = mongoose.Schema(
	{
		apiId: {
			type: String,
			required: true,
		},
		date: {
			type: Date,
			required: true,
		},
		homeTeamId: {
			type: String,
			required: true,
		},
		homeTeam: {
			type: String,
			required: true,
		},
		awayTeamId: {
			type: String,
			required: true,
		},
		awayTeam: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Game', gameSchema);
