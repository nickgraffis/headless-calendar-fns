
const assert = require('assert');
const createMatrix = require('..');

function test(view, year, month, day, hour, expected) {
	const matrix = createMatrix({ view, year, month, day, hour })
	assert(matrix?.prev !== undefined, 'prev is undefined');
	assert(matrix?.next !== undefined, 'next is undefined');
	assert(matrix?.current !== undefined, 'current is undefined');
	console.log(matrix);
}

test('year', 2020, 1, 1, 0);