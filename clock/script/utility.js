//
// Utility
//


/* URL Parameters
*/
function getParameterByName(name)
{
	const url = window.location.href
	name = name.replace(/[\[\]]/g, "\\$&")
	const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)")
	const results = regex.exec(url)
	if (!results) return null
	if (!results[2]) return ''
	return decodeURIComponent(results[2].replace(/\+/g, " "))
}


/* replaceScript
*/
function replaceScript(id, scriptUrl, callback) {
	//log(`replaceScript: ${id} ${scriptUrl} ${callback}`);
	let scriptElement = document.createElement('script');

	scriptElement.setAttribute('id', id);
	scriptElement.setAttribute('src', scriptUrl);
	scriptElement.addEventListener('load', callback);

	document.getElementById(id).remove();
	document.getElementsByTagName('head')[0].appendChild(scriptElement);
}/* replaceScript */



/* createLog
Returns a log function that logs to the console with performance timing.
Use:
	mylog = createLog();
*/
function createLog() {
	return (...values) => {
		console.log(performance.now(), ...values);
	}
}


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

