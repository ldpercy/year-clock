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
*/
function divisionDegrees(divisions, number) {
	let result = {
		start  : (number-1)   * (360 / divisions),
		middle : (number-0.5) * (360 / divisions),
		end    : (number)     * (360 / divisions),
	}
	result.width = result.end - result.start;
	return result;
}

/* divisionRadians
Given integer divisions of a circle, return the start, middle and end angle of the numbered division.
Divisions are discrete so counting is 1-based.

radiansEnd is currently working as an offset from radiansStart.
*/
function divisionRadians(divisions, number, radiansStart=0, radiansEnd=Math.TAU) {

	const result = {
		start  : radiansStart + radiansEnd * ((number - 1.0) / divisions),
		middle : radiansStart + radiansEnd * ((number - 0.5) / divisions),
		end    : radiansStart + radiansEnd * ((number - 0.0) / divisions),
	}
	result.width = result.end - result.start;
	return result;
}


/* addRadians
This might be tricky to do is a fully general way.
*/
function addRadians(array, radiansStart=0, radiansEnd=Math.TAU) {
	array.forEach(
		(element, index) => {element.radians = divisionRadians(array.length, index+1, radiansStart, radiansEnd);} // nb one-based
	);
}/* addRadians */



// clock

function dateRadians(date)
{
	return clockAngle( dateRatio(date) )
}

function clockAngle( revolutions )
{
	return Math.TAU * (revolutions)
}

function dateRatio(date)
{
	const year = date.getFullYear()
	const yearStart = new Date (year, 0)
	const yearEnd   = new Date (year + 1, 0)
	const yearLength = yearEnd - yearStart
	const timeElapsed = date - yearStart
	return timeElapsed / yearLength
}

