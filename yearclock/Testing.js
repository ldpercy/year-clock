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

	if (testArray.includes('april'))
	{
		result.push(aprilTest());
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

	const result = [];

	const start = 1920;
	const end = 2020;

	let dateString;
	let thisDate;


	for (let i = start; i <= end; i++) {
		dateString = `${i}-10-15`;
		thisDate = new dates.DisplayDate(dateString);
		console.debug(dateString, thisDate.daysInMonth, thisDate.monthRange.length);

		if ( thisDate.daysInMonth !== thisDate.monthRange.length) {
			console.warn(thisDate.monthRange);
		}
		else {
			console.log(thisDate.monthRange);
		}

	}


	/* const october1970 = new dates.DisplayDate('1970-10-15');
	console.debug(october1970);
	console.debug(october1970.daysInMonth);

	const october1971 = new dates.DisplayDate('1971-10-15');
	console.debug(october1971);
	console.debug(october1971.daysInMonth); */
	return [];
}


export function aprilTest(){
	console.log('April Test');

	const result = [];

	const start = 1920;
	const end = 2020;

	let dateString;
	let thisDate;


	for (let i = start; i <= end; i++) {
		dateString = `${i}-04-15`;
		thisDate = new dates.DisplayDate(dateString);
		console.debug(dateString, thisDate.daysInMonth, thisDate.monthRange.length);

		if ( thisDate.daysInMonth !== thisDate.monthRange.length) {
			console.warn(thisDate.monthRange);
		}
		else {
			console.log(thisDate.monthRange);
		}

	}


	/* const october1970 = new dates.DisplayDate('1970-10-15');
	console.debug(october1970);
	console.debug(october1970.daysInMonth);

	const october1971 = new dates.DisplayDate('1971-10-15');
	console.debug(october1971);
	console.debug(october1971.daysInMonth); */
	return [];
}



export {
	runTest
}
