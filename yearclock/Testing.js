//
// Testing
//

import * as dates from './Dates.js';

function runTest(tests, outputString='') {
	let result = new TestResult('Test Suite');

	const testArray  = tests.split(',');

	if (testArray.includes('october'))
	{
		result.test.push(octoberTest());
	}

	if (testArray.includes('april'))
	{
		result.test.push(aprilTest());
	}

	result.test.push(smokeTest(outputString));
	result.updatePass();
	//console.log('Test Suite result:',result);
	//const passTest = (result.flat().length === 0);
	return result;
}


/* smokeTest
*/
function smokeTest(outputString) {
	let result = new TestResult('Smoke');
	const smokeString = ['NaN', 'undefined', 'null', 'Infinity', 'Object', 'Invalid'];

	smokeString.forEach(
		(string) => {
			const count = matchCount(outputString, string);
			if (count) {
				const sr = {};
				sr[`${string}`] = count;
				result.test.push(sr);
			}
		}
	);
	//console.log('Smoke test:', result);
	result.updatePass();
	return result;
}


function matchCount(string, regex) {
	const count  = string.matchAll(regex).toArray().length;
	return count;
}




export function octoberTest(start=1920, end=2020){
	//console.log('October Test');

	const result = new TestResult('October Test');

	let dateString;
	let thisDate;


	for (let i = start; i <= end; i++) {
		dateString = `${i}-10-15`;
		thisDate = new dates.DisplayDate(dateString);
		//console.debug(dateString, thisDate.daysInMonth, thisDate.monthRange.length);

		if ( thisDate.daysInMonth !== thisDate.monthRange.length) {
			//console.warn(thisDate.monthRange);
			result.test.push(dateString);
		}

	}

	result.updatePass();
	return result;
}


export function aprilTest(start=1920, end=2020){
	//console.log('April Test');

	const result = new TestResult('April Test');

	let dateString;
	let thisDate;


	for (let i = start; i <= end; i++) {
		dateString = `${i}-04-15`;
		thisDate = new dates.DisplayDate(dateString);
		//console.debug(dateString, thisDate.daysInMonth, thisDate.monthRange.length);

		if ( thisDate.daysInMonth !== thisDate.monthRange.length) {
			//console.warn(thisDate.monthRange);
			result.test.push(dateString);
		}

	}

	result.updatePass();
	return result;
}


class TestResult {
	name;
	pass;
	test = [];

	constructor(name) {
		this.name = name;
	}

	updatePass() {
		let result;
		if (this.test.length === 0) {
			result = true
		}
		else {
			result = this.test.reduce(
				(accumulator, thisTest) => accumulator && !!thisTest.pass,
  				true,
			);
		}
		//console.log('updatePass', result);
		this.pass = result;
	}/* updatePass */

}



export {
	runTest
}
