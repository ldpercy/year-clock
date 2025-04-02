//
// Maths
//




Math.TAU = 2 * Math.PI;

function Point (x, y)
{
	this.x = x;
	this.y = y;
}

function polarPoint (angle, radius)
{
	return new Point(
		radius * Math.sin(angle),
		radius * -Math.cos(angle)
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
	result = {
		start  : (number-1)   * (360 / divisions),
		middle : (number-0.5) * (360 / divisions),
		end    : (number)     * (360 / divisions),
	}
	return result;
}


// clock

function clockAngle( revolutions )
{
	return Math.TAU * (revolutions)
}

function dateRadians(date)
{
	return clockAngle( dateRatio(date) )
}

//
// Dates
//

function isoDate(date) {
	return date.toISOString().substring(0, 10);
}

function incrementDay(d)
{
	d.setDate(d.getDate() + 1)
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

function isWeekend(d)
{
	const dayNumber = d.getDay()
	return dayNumber == 0 || dayNumber == 6
}


function getDayClass(date) { // this needs attention
	result = 'weekday';
	if (date.getDay() === 0 || date.getDay() == 6) result = 'weekend';
	if (date.getDate() === 1) result += ' first';
	return result;
}


function datesAreEqual(d1,d2) {
	return (d1.getFullYear() === d2.getFullYear()) && (d1.getMonth() === d2.getMonth()) && (d1.getDate() === d2.getDate());
}
