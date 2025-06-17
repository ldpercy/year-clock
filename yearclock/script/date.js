//
// Date
//


/* createDisplayDate
This is a temporary-ish function to re-create the big fat object sitting in the setup function called `config.date`.
It needs to be rationalised (much) further.
*/
function createDisplayDate(date, language) {
	log('createDisplayDate...',date);
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
	};

	result.monthNames = getMonthNames(language);

	// Set up period arrays
	result.monthArray   = getMonthArray(result, result.monthNames);
	result.yearDayArray = getPeriodDayArray(startOfYear(date), nextYear(date), date);
	result.seasonArray  = getSeasonArray(date);

	log('createDisplayDate',result);
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

function getDayClass(date, displayDate) { // this needs attention
	//log(arguments);
	result = 'weekday';
	if (date.getDay() === 0 || date.getDay() == 6) result = 'weekend';
	if (date.getDate() === 1) result += ' first';
	if (datesAreEqual(date, displayDate)) {
		log('current day:',date);
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

function dayOfYear(date)
{
	return Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
}

function daysInYear(date) {
	return dayOfYear(new Date(date.getFullYear(),11,31));
}


/* dateRangeRadians
Given two dates return the start, middle and end angles in radians, as well as the width in radians.
*/
function dateRangeRadians(date1, date2) {
	const diy1 = daysInYear(date1);
	const diy2 = daysInYear(date2);

	const radiansStart = divisionRadians(diy1, dayOfYear(date1)).start;
	const radiansEnd   = divisionRadians(diy2, dayOfYear(date2)).start + (Math.TAU * yearDifference(date1, date2));
	// Need to add or subtract additional 2pi rotations based on the year difference

	let result = {
		start  : radiansStart,
		middle : (radiansStart + radiansEnd) / 2,
		end    : radiansEnd,
		width  : radiansEnd - radiansStart,
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
	Change radians calc to fn

*/
function getMonthArray(displayDate, monthNames) {
	const result = monthNames.map(
		function( monthName, monthNumber ) {
			const startDate    = new Date(displayDate.year, monthNumber);
			const nextMonth    = new Date(displayDate.year, monthNumber + 1);
			const endDate      = new Date(nextMonth - 1000);
			const radiansStart = dateRadians(startDate);
			const radiansEnd   = dateRadians(endDate);
			const radiansWidth = radiansEnd - radiansStart;

			const month = {
				'name'         : monthName,
				'code'         : config.monthCodes[monthNumber],
				'startDate'    : new Date(displayDate.year, monthNumber),
				'nextMonth'    : nextMonth,
				'endDate'      : new Date(nextMonth - 1000),
				'radiansStart' : radiansStart,
				'radiansEnd'   : radiansEnd,
				'radiansWidth' : radiansWidth,
				'radiansMid'   : midpoint(radiansStart, radiansEnd),
				'class'        : getMonthClass(startDate, displayDate.object)
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
function getPeriodDayArray(dateStart, dateEnd, displayDate, locale) {
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
			class        : getDayClass(thisDate, displayDate),
			isoShort     : isoDate(thisDate),
			radians      : dateRangeRadians(thisDate, nextDay(thisDate)),
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
			name:      'Summer',
			dateStart: new Date(year,11,1),
			dateEnd:   new Date(year,2,1),
			radians:   undefined,
			class:     '',
		},
		{
			name:      'Autumn',
			dateStart: new Date(year,2,1),
			dateEnd:   new Date(year,5,1),
			radians:   undefined,
			class:     '',
		},
		{
			name:      'Winter',
			dateStart: new Date(year,5,1),
			dateEnd:   new Date(year,8,1),
			radians:   undefined,
			class:     '',
		},
		{
			name:      'Spring',
			dateStart: new Date(year,8,1),
			dateEnd:   new Date(year,11,1),
			radians:   undefined,
			class:     '',
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
			name:      'Q1',
			dateStart: new Date(year,0,1),
			dateEnd:   new Date(year,3,1),
			radians:   undefined,
			class:     '',
		},
		{
			name:      'Q2',
			dateStart: new Date(year,3,1),
			dateEnd:   new Date(year,6,1),
			radians:   undefined,
			class:     '',
		},
		{
			name:      'Q3',
			dateStart: new Date(year,6,1),
			dateEnd:   new Date(year,9,1),
			radians:   undefined,
			class:     '',
		},
		{
			name:      'Q4',
			dateStart: new Date(year,9,1),
			dateEnd:   new Date(year,12,1),
			radians:   undefined,
			class:     '',
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
			name:      `${weekNumber}`,
			dateStart: yearStart,
			dateEnd:   undefined,
			radians:   undefined,
			class:     '',
		}
	];

	for (let thisDate = new Date(yearStart); thisDate < yearEnd; incrementDay(thisDate))
	{
		if (thisDate.getDay() === 1 && !datesAreEqual(thisDate, yearStart)) // need this condition otherwise weeks get borked
		{
			weekArray[weekArray.length-1].dateEnd = new Date(thisDate);

			weekNumber++;
			weekArray.push({
				name:      `${weekNumber}`,
				dateStart:  new Date(thisDate),
				radians:    undefined,
				class:      '',
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
