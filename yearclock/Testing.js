//
// Testing
//

import * as dates from './Dates.js';

function runTest(tests, outputString='') {
	let result = [];

	const testArray  = tests.split(',');

	if (testArray.includes('october'))
	{
		result.push(octoberTest());
	}

	result.push(smokeTest(outputString));


	return result;
}


/* smokeTest
*/
function smokeTest(outputString) {
	let result = [];
	const smokeString = ['NaN', 'undefined', 'null', 'Infinity', 'Object', 'Invalid'];

	smokeString.forEach(
		(string) => {
			const count = matchCount(outputString, string);
			if (count) {
				const sr = {};
				sr[`${string}`] = count;
				result.push(sr);
			}
		}
	);
	console.log('Smoke test:', result);
	return result;
}


function matchCount(string, regex) {
	const count  = string.matchAll(regex).toArray().length;
	return count;
}




export function octoberTest(){
	console.log('October Test');

	const october1970 = new dates.DisplayDate('1970-10-15');
	console.debug(october1970);

	const october1971 = new dates.DisplayDate('1971-10-15');
	console.debug(october1971);
	return [];
}


export {
	runTest
}
