//
// Maths
//




Math.TAU = 2 * Math.PI;

function Point(x, y)
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
	let result = {
		start  : (number-1)   * (360 / divisions),
		middle : (number-0.5) * (360 / divisions),
		end    : (number)     * (360 / divisions),
	}
	return result;
}

/* divisionRadians
Given integer divisions of a circle, return the start, middle and end angle of the numbered division.
Divisions are discrete so counting is 1-based.
*/
function divisionRadians(divisions, number) {
	let result = {
		start  : (number-1)   * (Math.TAU / divisions),
		middle : (number-0.5) * (Math.TAU / divisions),
		end    : (number)     * (Math.TAU / divisions),
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

function daysInMonth(date) {
	return new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
}


function dayOfYear(date)
{
	return Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
}




function getYearDayArray(date) {
	const result = [];

	// Setup day array
	let dayNumber = 1;
	for (let thisDate = new Date(date.getFullYear(),0); thisDate.getFullYear() <= date.getFullYear(); incrementDay(thisDate))
	{
		const dayInfo = {
			number   : dayNumber,
			date     : new Date(thisDate),
			first    : thisDate.getDate() === 1,
			weekend  : isWeekend(thisDate),
			class    : getDayClass(thisDate),
			isoShort : isoDate(thisDate),
		}
		result.push(dayInfo);
		dayNumber++;
	}

	return result;
}


function getMonthDayArray(date) {
	const result = [];
	const year = date.getFullYear();
	const month = date.getMonth();
	const days = daysInMonth(date);
	for (let d=1; d<=days; d++) {
		let thisDate = new Date(year,month,d);
		const dayInfo = {
			number   : d,
			date     : thisDate,
			first    : thisDate.getDate() === 1,
			weekend  : isWeekend(thisDate),
			class    : getDayClass(thisDate),
			isoShort : isoDate(thisDate),
		}
		result.push(dayInfo);
	}
	return result;
}


/* getPeriodDayArray
Attempt at generalising the above two an arbitrary period.
Will try to use half-open intervals.
Might need to tweak the loop-end condition though.
*/
function getPeriodDayArray(startDate, endDate) {
	const result = [];

	let dayCounter = 1;
	for (let thisDate = new Date(startDate.getFullYear(),0); thisDate < endDate; incrementDay(thisDate))
	{
		const dayInfo = {
			dayInPeriod  : dayCounter,
			dayOfMonth   : thisDate.getDate(),
			dayOfYear    : dayOfYear(thisDate),
			date         : new Date(thisDate),
			isFirst      : thisDate.getDate() === 1,
			isWeekend    : isWeekend(thisDate),
			class        : getDayClass(thisDate),
			isoShort     : isoDate(thisDate),
		}
		result.push(dayInfo);
		dayCounter++;
	}

	return result;
}/* getPeriodDayArray */

