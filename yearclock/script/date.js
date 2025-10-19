//
// Date
//


/* createDisplayDate
This is a temporary-ish function to re-create the big fat object sitting in the setup function called `config.date`.
It needs to be rationalised (much) further.
*/
function createDisplayDate(date, language) {
	//log('createDisplayDate', arguments);
	const result = {
		object      : new Date(date),
		language    : language,
		year        : date.getFullYear(),
		month       : date.getMonth() + 1,		// js month starts at 0
		monthRange  : new DateRange(startOfMonth(date), nextMonth(date)),
		daysInMonth : daysInMonth(date),
		date        : date.getDate(),
		name        : date.toLocaleString(language, {weekday: "long"}),
		dayOfYear   : dayOfYear(date),
		daysInYear  : daysInYear(date),
		yearStart   : startOfYear(date),
		yearEnd     : nextYear(date),
		yearRange   : new DateRange(startOfYear(date), nextYear(date)),
	};

	result.monthNames = yearclock.l10n.getMonthNames(language);

	// Set up period arrays
	result.monthArray   = getMonthArray(result, result.monthNames);

	//log('createDisplayDate',result);
	return result;
}/* createDisplayDate */


//
// mutators:
//

function incrementDay(date) {
	date.setDate(date.getDate() + 1);
}

function decrementDay(date) {
	date.setDate(date.getDate() - 1);
}

//
// constructors:
//

function startOfYear(date) {
	return new Date(date.getFullYear(), 0, 1);
}

function startOfMonth(date) {
	return new Date(date.getFullYear(), date.getMonth(),1);
}

function nextYear(date) {
	return new Date(date.getFullYear()+1, 0, 1);
}

function nextMonth(date) {
	return new Date(date.getFullYear(), date.getMonth()+1,1);
}

function nextDay(date) {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
}

function truncateTime(date) {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}


//
// decisions, calculations:
//


function isValidDate(date) {
	//https://stackoverflow.com/a/1353711
	return date instanceof Date && !isNaN(date);
}

function isWeekend(d) {
	const dayNumber = d.getDay()
	return dayNumber == 0 || dayNumber == 6
}

function isLastDayOfMonth(date) {
	return (date.getDate() === daysInMonth(date));
}

function getDayClass(date, currentDate) { // this needs attention
	//log(arguments);
	result = 'weekday';
	if (date.getDay() === 0 || date.getDay() == 6) result = 'weekend';
	if (date.getDate() === 1) result += ' first';
	if (datesAreEqual(date, currentDate)) {
		result += ' current';
	}
	return result;
}

function getMonthClass(date, displayDate) {
	result = '';
	if (monthsAreEqual(date, displayDate)) result += ' current';
	return result;
}

function datesAreEqual(d1,d2) {
	return (d1.getFullYear() === d2.getFullYear()) && (d1.getMonth() === d2.getMonth()) && (d1.getDate() === d2.getDate());
}

function monthsAreEqual(d1,d2) {
	return (d1.getFullYear() === d2.getFullYear()) && (d1.getMonth() === d2.getMonth());
}

function dateIsInPeriod(date, periodStart, periodEnd) {
	return ((date >= periodStart) && (date < periodEnd));
}

function dateIsInRange(date, dateRange) {
	return ((date >= dateRange.start) && (date < dateRange.end));
}

function daysInMonth(date) {
	return new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
}

function dayOfYear(date) {
	return dayDifference(new Date(date.getFullYear(), 0, 1), date) + 1;
}

function dayDifference(date1, date2) {
	return Math.floor((truncateTime(date2) - truncateTime(date1)) / (1000 * 60 * 60 * 24));
}

function daysInYear(date) {
	return dayOfYear(new Date(date.getFullYear(),11,31));
}

function yearDifference(date1, date2) {
	return date2.getFullYear() - date1.getFullYear();
}


/* dateRangeRadians
Given two dates return the start, middle, end & width in radians.
Gives angles in the context of years.
*/
function dateRangeRadians(dateRange, arcDateRange, radianDelta = new RadianDelta, outlier = '') {
	//const diy1 = daysInYear(date1);
	//const diy2 = daysInYear(date2);
	//const start = divisionRadians(diy1, dayOfYear(date1)-1, radianDelta).start;
	//const end   = divisionRadians(diy2, dayOfYear(date2)-1, radianDelta).start + (Math.TAU * yearDifference(date1, date2)); // INCORRECT for arcs

	const start = dateRadians(dateRange.start, arcDateRange, radianDelta).start;
	const end = dateRadians(dateRange.end, arcDateRange, radianDelta).start;

	/*
	switch(outlier) {
		case 'truncate'    : result += (Math.cos(radians) < 0) ? 180 : 0; break;
		case 'extrapolate' : result += (Math.sin(radians) < 0) ? 180 : 0; break;
		case 'wrap'    : result += (Math.sin(radians) > 0) ? 180 : 0; break;
	} */


	/* 	Need to add or subtract additional 2pi rotations based on the year difference
	TODO:
	This will have to change with angular context - need to figure out what to do with negatives and year crossings for arcs

	In an arc context it will depedn what the start and length radians represent.
	For example it will be okay to represent a year crossing if the arc date range covers it, but if not then it will be an error, or a truncated sector.
	Will need to think about how to handle these cases.

	*/

	let result = {
		start  : start,
		middle : (start + end) / 2,
		end    : end,
		width  : end - start,
	}

	return result;
}/* dateRangeRadians */



//
// Date formatting
//

function isoDate(date) {
	// return date.toISOString().substring(0, 10);
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
	// The timezone is always UTC,
	// https://stackoverflow.com/a/72581185
	var localDate = new Date(date.getTime() - date.getTimezoneOffset()*60000);
	return localDate.toISOString().substring(0, 10);
}


function isoMonthDay(date) {
	return isoDate(date).substring(5, 10);
}


/*
Return the last day of a half-open date range instead of its open limit.
Equivalent to previousDay(date)
closedIntervalEnd(date) {}
*/



class DateRange {
	constructor(start, end) {
		this.start = new Date(start);		// not sure yet if i want to keep these 'new Date(...)' constructors in here
		this.end = new Date(end);
	}

	length = function() { return dayDifference(this.start, this.end); }

}/* DateRange */


/*
dr = new DateRange('2025-01-01','2026-01-01')
*/


function getSeason(date, seasonArray) {
	result = seasonArray.find(
		(season) => dateIsInRange(date, season.dateRange)
	);
	return result;
}

