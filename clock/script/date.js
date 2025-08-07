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
		date        : date.getDate(),
		name        : date.toLocaleString(language, {weekday: "long"}),
		dayOfYear   : dayOfYear(date),
		daysInYear  : daysInYear(date),
		yearStart   : startOfYear(date),
		yearEnd     : nextYear(date),
		yearRange   : new DateRange(startOfYear(date), nextYear(date)),
	};

	result.monthNames = getMonthNames(language);

	// Set up period arrays
	result.monthArray   = getMonthArray(result, result.monthNames);

	//log('createDisplayDate',result);
	return result;
}/* createDisplayDate */


//
// mutators:
//

function incrementDay(d) {
	d.setDate(d.getDate() + 1);
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
				'class'        : getMonthClass(dateStart, displayDate.object),
				'dateRange'    : new DateRange(dateStart, dateEnd),
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
			id           : thisDate.getDate(),
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

This version returns 5 elements with the first season split at the beginning/end

*/
function getSeasonArray(displayDate, hemisphere) {

	const year = displayDate.year;


	const seasonArray = [
		{
			id          : (hemisphere === 'southern') ? 'summer' : 'winter',
			name        : (hemisphere === 'southern') ? 'Summer' : 'Winter',
			dateRange   : new DateRange(new Date(year,0,1), new Date(year,2,1)),
			class       : '',
		},
		{
			id          : (hemisphere === 'southern') ? 'autumn' : 'spring',
			name        : (hemisphere === 'southern') ? 'Autumn' : 'Spring',
			dateRange   : new DateRange(new Date(year,2,1), new Date(year,5,1)),
			class       : '',
		},
		{
			id          : (hemisphere === 'southern') ? 'winter' : 'summer',
			name        : (hemisphere === 'southern') ? 'Winter' : 'Summer',
			dateRange   : new DateRange(new Date(year,5,1), new Date(year,8,1)),
			class       : '',
		},
		{
			id          : (hemisphere === 'southern') ? 'spring' : 'autumn',
			name        : (hemisphere === 'southern') ? 'Spring' : 'Autumn',
			dateRange   : new DateRange(new Date(year,8,1), new Date(year,11,1)),
			class       : '',
		},
		{
			id          : (hemisphere === 'southern') ? 'summer' : 'winter',
			name        : (hemisphere === 'southern') ? 'Summer' : 'Winter',
			dateRange   : new DateRange(new Date(year,11,1), new Date(year+1,0,1)),
			class       : '',
		},
	];

	for (let season of seasonArray) {
		season.class = (dateIsInRange(displayDate.object, season.dateRange)) ? 'current' : '';
	}

	addDateRangeRadians(seasonArray, displayDate.yearRange);

	return seasonArray;
}/* getSeasonArray */




/* getSeasonArrayWrapped

This version wraps the last season around so that it can be used in full-circles

This needs to change in a few ways.
* needs to be hemisphere aware
* needs to accommodate the year crossing hack for some clocks
* should probably take out the presentation items like name and emoji

*/
function getSeasonArrayWrapped(displayDate, hemisphere) {

	const year = displayDate.year;

	const thisYearSummerEnd = new Date(year,2,1);
	const thisYearSummerDays = dayDifference(displayDate.yearStart, thisYearSummerEnd);
	const fauxSummerEnd = new Date(displayDate.yearEnd);
	fauxSummerEnd.setDate(fauxSummerEnd.getDate() + thisYearSummerDays);

	const seasonArray = [
		{
			id          : (hemisphere === 'southern') ? 'autumn' : 'spring',
			name        : (hemisphere === 'southern') ? 'Autumn' : 'Spring',
			dateRange   : new DateRange(new Date(year,2,1), new Date(year,5,1)),
			class       : '',
		},
		{
			id          : (hemisphere === 'southern') ? 'winter' : 'summer',
			name        : (hemisphere === 'southern') ? 'Winter' : 'Summer',
			dateRange   : new DateRange(new Date(year,5,1), new Date(year,8,1)),
			class       : '',
		},
		{
			id          : (hemisphere === 'southern') ? 'spring' : 'autumn',
			name        : (hemisphere === 'southern') ? 'Spring' : 'Autumn',
			dateRange   : new DateRange(new Date(year,8,1), new Date(year,11,1)),
			class       : '',
		},
		{
			id          : (hemisphere === 'southern') ? 'summer' : 'winter',
			name        : (hemisphere === 'southern') ? 'Summer' : 'Winter',
			dateRange   : new DateRange(new Date(year,11,1), fauxSummerEnd),	// NB now next year
			class       : '',
		},
	];

	for (let season of seasonArray) {
		season.class = (dateIsInRange(displayDate.object, season.dateRange)) ? 'current' : '';
	}

	addDateRangeRadians(seasonArray, displayDate.yearRange);

	return seasonArray;
}/* getSeasonArrayWrapped */


/* getQuarterArray
*/
function getQuarterArray(displayDate) {

	const year = displayDate.year;

	const quarterArray = [
		{
			id          : '1',
			name        : 'Q1',
			dateRange   : new DateRange(new Date(year,0,1), new Date(year,3,1)),
			radians     : undefined,
			class       : '',
		},
		{
			id          : '2',
			name        : 'Q2',
			dateRange   : new DateRange(new Date(year,3,1), new Date(year,6,1)),
			radians     : undefined,
			class       : '',
		},
		{
			id          : '3',
			name        : 'Q3',
			dateRange   : new DateRange(new Date(year,6,1), new Date(year,9,1)),
			radians     : undefined,
			class       : '',
		},
		{
			id          : '4',
			name        : 'Q4',
			dateRange   : new DateRange(new Date(year,9,1), new Date(year,12,1)),
			radians     : undefined,
			class       : '',
		},
	];

	for (let quarter of quarterArray) {
		quarter.class = (dateIsInRange(displayDate.object, quarter.dateRange)) ? 'current' : '';
	}

	addDateRangeRadians(quarterArray, displayDate.yearRange);

	return quarterArray;
}/* getQuarterArray */



/* getYearWeekArray
*/
function getYearWeekArray(displayDate) {

	const yearStart   = displayDate.yearStart;
	const yearEnd     = displayDate.yearEnd;

	let weekNumber = 1;

	let weekArray = [
		{
			id          : `${weekNumber}`,
			name        : `${weekNumber}`,
			dateRange   : new DateRange(yearStart, undefined),
			radians     : undefined,
			class       : '',
		}
	];

	for (let thisDate = new Date(yearStart); thisDate < yearEnd; incrementDay(thisDate))
	{
		if (thisDate.getDay() === 1 && !datesAreEqual(thisDate, yearStart)) // need this condition otherwise weeks get borked
		{
			weekArray[weekArray.length-1].dateRange.end = new Date(thisDate);

			weekNumber++;
			weekArray.push({
				id          : `${weekNumber}`,
				name        : `${weekNumber}`,
				dateRange   : new DateRange(thisDate, undefined),
				radians     : undefined,
				class       : '',
			});
		}
	}
	weekArray[weekArray.length-1].dateRange.end = yearEnd;

	for (let week of weekArray) {
		week.class = (dateIsInRange(displayDate.object, week.dateRange)) ? 'current' : '';
	}
	addDateRangeRadians(weekArray, displayDate.yearRange);

	return weekArray;
}/* getYearWeekArray */



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

function getYearEvent(date) {

	const key = isoMonthDay(date);

	const yearEvent = {
		'01-01' : { symbol:'🌅', name: "New Year's Day" },
		'02-14' : { symbol:'💘', name: "Valentines day" },
		'10-31' : { symbol:'🎃', name: "Halloween" },
		'12-24' : { symbol:'🎅', name: 'Christmas Eve' },
		'12-25' : { symbol:'🎄', name: 'Christmas Day' },
		'12-26' : { symbol:'🥊', name: 'Boxing Day' },
		'12-31' : { symbol:'🎇', name: "New Year's Eve" }, // 🎇🎆
	};

	return yearEvent[key];

}/* yearEvent */

function getWeekEvent(date) {
	const key = date.getDay();
	const weekEvent = {
		1 : { symbol:'🌚', name: "" },
		2 : { symbol:'', name: "" },
		3 : { symbol:'🐪', name: "Hump day" },
		4 : { symbol:'', name: '' },
		5 : { symbol:'🍺', name: '' },
		6 : { symbol:'🏖️', name: '' },
		7 : { symbol:'🌞', name: "" },
	};

	return weekEvent[key];

}


function getMonthEvent(date) {
	const key = date.getDate();
	const monthEvent = {
		1 : { symbol:'🥇', name: "" },
		2 : { symbol:'🥈', name: "" },
		3 : { symbol:'🥉', name: "" },
	};

	let result = monthEvent[key]

	if (isLastDayOfMonth(date)) {
		result = { symbol:'🔚', name: "" };
	}

	return result;
}


function getCustomEvent(date) {

	const key = isoMonthDay(date);

	const customEvent = {
		'03-14' : { symbol:'🥧', name: "Pi day" },
		'05-04' : { symbol:'¼', name: "May the Fourth be with you" },
	};

	return customEvent[key];
}


function getSeasonEvent(season) {

	const seasonEvent = {
		'autumn' : { symbol:'🍂', name: "Autumn" },
		'winter' : { symbol:'🥶', name: "Winter" },
		'spring' : { symbol:'🌱', name: "Spring" },
		'summer' : { symbol:'🌞', name: "Summer" },
	}

	return seasonEvent[season];
}


function getSeason(date, seasonArray) {
	result = seasonArray.find(
		(season) => dateIsInRange(date, season.dateRange)
	);
	return result;
}

