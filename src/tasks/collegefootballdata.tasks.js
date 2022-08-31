const {
	callCollegeFootballDataApi,
} = require('../helpers/collegefootballdata.helpers');
const Task = require('../models/task.model');

async function updateGames(year, week) {
	const result = await callCollegeFootballDataApi(year, week);
	await Task.create({
		type: 'UpdateGames',
		timeStarted: result.startTime,
		timeCompleted: result.endTime,
		result: result,
	});
}

module.exports = {
	updateGames,
};
