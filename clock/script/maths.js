//
// Maths
//


Math.TAU = 2 * Math.PI;

function Point(x, y)
{
	this.x = x;
	this.y = y;
}

function polarPoint(radians, radius)
{
	return new Point(
		radius * Math.sin(radians),
		radius * -Math.cos(radians)
	)
}

function midpoint(a,b)
{
	return 0.5 * (a + b)
}

function radians(degrees) {
	return (degrees/360) * Math.TAU;
}

function degrees(radians) {
	return (radians/Math.TAU) * 360;
}


/* significantFigures
Returns a function that will call toPrecision with the supplied number of significant figures
*/
function significantFigures(integer) {
	return (number) => { return number.toPrecision(integer) }
}


/* divisionDegrees
Given integer divisions of a circle, return the start, middle and end angle of the numbered division.
Divisions are discrete so counting is 1-based.

degreesLength is an offset from radiansStart.
*/
function divisionDegrees(divisions, number, degreeDelta = new DegreeDelta) {
	let result = {
		start  : degreeDelta.start + degreeDelta.delta * ((number - 1.0) / divisions),
		middle : degreeDelta.start + degreeDelta.delta * ((number - 0.5) / divisions),
		end    : degreeDelta.start + degreeDelta.delta * ((number - 0.0) / divisions),
	}
	result.width = result.end - result.start;
	return result;
}

/* divisionRadians
Given integer divisions of an arc, return start, middle, end & width in radians of the numbered division.
Divisions are discrete so counting is 1-based.

The arc starts at `radiansStart` and is `radiansLength` wide.
Default is full-circle.
*/
function divisionRadians(divisions, number, radianDelta = new RadianDelta) {

	const result = {
		start  : radianDelta.start + radianDelta.delta * ((number - 1.0) / divisions),
		middle : radianDelta.start + radianDelta.delta * ((number - 0.5) / divisions),
		end    : radianDelta.start + radianDelta.delta * ((number - 0.0) / divisions),
	}
	result.width = result.end - result.start;
	return result;
}/* divisionRadians */


/* addRadians
This might be tricky to do is a fully general way.
Currently only works for even spacing of an array.
*/
function addRadians(array, radianDelta = new RadianDelta) {
	array.forEach(
		(element, index) => {element.radians = divisionRadians(array.length, index+1, radianDelta);} // nb one-based
	);
}/* addRadians */


/* addDateRangeRadians
Currently incomplete/incorrect due to problems with dateRangeRadians
Need to decide some things:
* What date period the arc represents
* What to do with periods outside or crossing out of the primary date range - discard, truncate, extrapolate
* Special conditions for truncates or extrapolates crossing back into an overlapping pseudo-range, eg year boundaries (seasons)

Also need to decide what to do with what would be discards - set the radians to undefined, or remove the items (mutate)?




*/
function addDateRangeRadians(array, dateRange, radianDelta = new RadianDelta) {
	array.forEach(
		(element) => {



			element.radians = dateRangeRadians(element.dateStart, element.dateEnd, radianDelta);





			/*

			*/




		}
	);
}/* addDateRangeRadians */



// clock


function dateRatio(date)
{
	const year = date.getFullYear()
	const yearStart = new Date (year, 0)
	const yearEnd   = new Date (year + 1, 0)
	const yearLength = yearEnd - yearStart
	const timeElapsed = date - yearStart
	return timeElapsed / yearLength
}


class RadianDelta {
	constructor(start = 0, delta = Math.TAU) {
		this.start = start;
		this.delta = delta;
	}
}/* RadianDelta */


class DegreeDelta {
	constructor(start = 0, delta = 360) {
		this.start = start;
		this.delta = delta;
	}
}/* RadianDelta */

