
//
// Testing
//

function runTest(string) {

	let result = [];

	result.push(smokeTest(string));

	let passTest = (result.flat().length === 0);

	if (passTest) {
		document.getElementById('clockContainer').classList.remove('testFail');
		document.getElementById('clockContainer').classList.add('testPass');
	}
	else {
		document.getElementById('clockContainer').classList.remove('testPass');
		document.getElementById('clockContainer').classList.add('testFail');
		console.error(result);
	}

	document.getElementById('testResult').innerHTML = JSON.stringify(result);

}


/* passSmokeTest
*/
function smokeTest(testString) {
	let result = [];
	const smokeString = ['NaN', 'undefined', 'null', 'Infinity', 'Object', 'Invalid'];

	smokeString.forEach(
		(string) => {
			const count = matchCount(testString, string);
			if (count) {
				const sr = {};
				sr[`${string}`] = count;
				result.push(sr);
			}
		}
	);
	return result;
}


function matchCount(string, regex) {
	const count  = string.matchAll(regex).toArray().length;
	return count;
}

