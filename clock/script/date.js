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
		date        : date.getDate(),
		name        : date.toLocaleString(language, {weekday: "long"}),
		dayOfYear   : dayOfYear(date),
		daysInYear  : daysInYear(date),
		yearStart   : startOfYear(date),
		yearEnd     : nextYear(date),
		dateRange   : new DateRange(startOfYear(date), nextYear(date)),
	};

	result.monthNames = getMonthNames(language);

	// Set up period arrays
	result.monthArray   = getMonthArray(result, result.monthNames);

	//log('createDisplayDate',result);
	return result;
}/* createDisplayDate */



/* mutators:
*/

function incrementDay(d) {
	d.setDate(d.getDate() + 1);
}

/* constructors:
*/

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

/* decisions, calculations:
*/


//https://stackoverflow.com/a/1353711
function isValidDate(date) {
	return date instanceof Date && !isNaN(date);
}

function isWeekend(d) {
	const dayNumber = d.getDay()
	return dayNumber == 0 || dayNumber == 6
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


/* dateRangeRadians
Given two dates return the start, middle, end & width in radians.
Gives angles in the context of years.
*/
function dateRangeRadians(date1, date2, radianDelta = new RadianDelta) {
	const diy1 = daysInYear(date1);
	const diy2 = daysInYear(date2);

	const start = divisionRadians(diy1, dayOfYear(date1), radianDelta).start;
	const end   = divisionRadians(diy2, dayOfYear(date2), radianDelta).start + (Math.TAU * yearDifference(date1, date2)); // INCORRECT for arcs

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



function yearDifference(date1, date2) {
	return date2.getFullYear() - date1.getFullYear();
}

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


//
// Period Arrays
//



/* getMonthArray
This needs a lot of cleanup/rationalisation:
	Remove globals/paramterise
	Change monthname map to something else
*/
function getMonthArray(displayDate, monthNames) {
	const monthId = [ "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec" ];

	const result = monthNames.map(
		function( monthName, index ) {
			const dateStart   = new Date(displayDate.year, index);
			const dateEnd     = new Date(displayDate.year, index + 1);

			const month = {
				'id'           : monthId[index],
				'number'       : index+1,
				'name'         : monthName,
				'dateStart'    : dateStart,
				'dateEnd'      : dateEnd,
				'lastDate'     : new Date(nextMonth - 1000),
				'class'        : getMonthClass(dateStart, displayDate.object)
			};
			return month;
		}
	);
	return result;
}/* getMonthArray */



/* getPeriodDayArray
Attempt at generalising to an arbitrary period.
Will try to use half-open intervals.
Might need to tweak the loop-end condition though.
*/
function getPeriodDayArray(dateStart, dateEnd, currentDate, locale) {
	const result = [];

	let dayCounter = 1;
	for (let thisDate = new Date(dateStart); thisDate < dateEnd; incrementDay(thisDate))
	{
		const dayInfo = {
			name         : thisDate.toLocaleString(locale, {weekday: "long"}),
			dayOfPeriod  : dayCounter,
			dayOfMonth   : thisDate.getDate(),
			dayOfYear    : dayOfYear(thisDate),
			date         : new Date(thisDate),
			isFirst      : thisDate.getDate() === 1,
			isWeekend    : isWeekend(thisDate),
			class        : getDayClass(thisDate, currentDate),
			isoShort     : isoDate(thisDate),
		}
		result.push(dayInfo);
		dayCounter++;
	}

	return result;
}/* getPeriodDayArray */



/* getSeasonArray
*/
function getSeasonArray(date) {

	const year = date.getFullYear();

	const seasonArray = [
		{
			id          : 'summer',
			name        : 'Summer',
			dateStart   : new Date(year,11,1),
			dateEnd     : new Date(year,2,1),
			radians     : undefined,
			class       : '',
		},
		{
			id          : 'autumn',
			name        : 'Autumn',
			dateStart   : new Date(year,2,1),
			dateEnd     : new Date(year,5,1),
			radians     : undefined,
			class       : '',
		},
		{
			id          : 'winter',
			name        : 'Winter',
			dateStart   : new Date(year,5,1),
			dateEnd     : new Date(year,8,1),
			radians     : undefined,
			class       : '',
		},
		{
			id          : 'spring',
			name        : 'Spring',
			dateStart   : new Date(year,8,1),
			dateEnd     : new Date(year,11,1),
			radians     : undefined,
			class       : '',
		},
	];

	for (let season of seasonArray) {
		season.radians = dateRangeRadians(season.dateStart, season.dateEnd);
		season.class = (dateIsInPeriod(date, season.dateStart, season.dateEnd)) ? 'current' : '';
	}

	return seasonArray;
}/* getSeasonArray */


/* getQuarterArray
*/
function getQuarterArray(date) {

	const year = date.getFullYear();

	const quarterArray = [
		{
			id          : '1',
			name        : 'Q1',
			dateStart   : new Date(year,0,1),
			dateEnd     : new Date(year,3,1),
			radians     : undefined,
			class       : '',
		},
		{
			id          : '2',
			name        : 'Q2',
			dateStart   : new Date(year,3,1),
			dateEnd     : new Date(year,6,1),
			radians     : undefined,
			class       : '',
		},
		{
			id          : '3',
			name        : 'Q3',
			dateStart   : new Date(year,6,1),
			dateEnd     : new Date(year,9,1),
			radians     : undefined,
			class       : '',
		},
		{
			id          : '4',
			name        : 'Q4',
			dateStart   : new Date(year,9,1),
			dateEnd     : new Date(year,12,1),
			radians     : undefined,
			class       : '',
		},
	];

	for (let quarter of quarterArray) {
		quarter.radians = dateRangeRadians(quarter.dateStart, quarter.dateEnd);
		quarter.class = (dateIsInPeriod(date, quarter.dateStart, quarter.dateEnd)) ? 'current' : '';
	}

	return quarterArray;
}/* getQuarterArray */



/* getYearWeekArray
*/
function getYearWeekArray(date) {

	const yearStart   = startOfYear(date);
	const yearEnd     = nextYear(date);

	let weekNumber = 1;

	let weekArray = [
		{
			id          : `${weekNumber}`,
			name        : `${weekNumber}`,
			dateStart   : yearStart,
			dateEnd     : undefined,
			radians     : undefined,
			class       : '',
		}
	];

	for (let thisDate = new Date(yearStart); thisDate < yearEnd; incrementDay(thisDate))
	{
		if (thisDate.getDay() === 1 && !datesAreEqual(thisDate, yearStart)) // need this condition otherwise weeks get borked
		{
			weekArray[weekArray.length-1].dateEnd = new Date(thisDate);

			weekNumber++;
			weekArray.push({
				id          : `${weekNumber}`,
				name        : `${weekNumber}`,
				dateStart   : new Date(thisDate),
				radians     : undefined,
				class       : '',
			});
		}
	}
	weekArray[weekArray.length-1].dateEnd = yearEnd;

	for (let week of weekArray) {
		week.radians = dateRangeRadians(week.dateStart, week.dateEnd);
		week.class = (dateIsInPeriod(date, week.dateStart, week.dateEnd)) ? 'current' : '';
	}

	return weekArray;
}/* getYearWeekArray */




class DateRange {
	constructor(start, end) {
		this.start = new Date(start);
		this.end = new Date(end);
	}
}/* DateRange */


/*
dr = new DateRange('2025-01-01','2026-01-01')
*/
