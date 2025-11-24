//
// Testing
//



function runTest(string) {
	let result = [];
	result.push(smokeTest(string));
	return result;
}


/* smokeTest
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


export {
	runTest
}
