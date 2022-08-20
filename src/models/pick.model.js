const mongoose = require('mongoose');

const pickSchema = mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		gameId: {
			type: String,
			required: true,
		},
		teamId: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Pick', pickSchema);
