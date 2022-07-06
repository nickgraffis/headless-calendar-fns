
const assert = require('assert');
const createMatrix = require('..');

function test(view, year, month, day, hour, expected) {
	const matrix = createMatrix({ view, year, month, day, hour })
	assert(matrix?.prev !== undefined, 'prev is undefined');
	assert(matrix?.next !== undefined, 'next is undefined');
	assert(matrix?.current !== undefined, 'current is undefined');
	console.log(matrix);
}

function performance(view, year, month, day, hour, expected) {
	console.time();
	const matrix = createMatrix({ 
		view, 
		year, 
		week: day,
		month, 
		day, 
		hour, 
		includeHours: true,
		daysInWeek: 5, 
		startOfWeek: 1,
		daysOfWeek: 'narrow', 
		timeZone: 'America/New_York',
		startOfDay: 8,
		hoursInDay: 9
	})
	console.log(matrix.current.days[2])
	console.timeEnd();
}

performance('week', 2022, 6, 1, 1);