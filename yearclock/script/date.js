//
// Date
//


function incrementDay(d) {
	d.setDate(d.getDate() + 1);
}


function startOfYear(date) {
	return new Date(date.getFullYear(), 0, 1);
}

function nextYear(date) {
	return new Date(date.getFullYear()+1, 0, 1);
}

function startOfMonth(date) {
	return new Date(date.getFullYear(), date.getMonth(),1);
}

function nextMonth(date) {
	return new Date(date.getFullYear(), date.getMonth()+1,1);
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


function isoDate(date) {
	// return date.toISOString().substring(0, 10);
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
	// The timezone is always UTC,
	// https://stackoverflow.com/a/72581185
	var localDate = new Date(date.getTime() - date.getTimezoneOffset()*60000);
	return localDate.toISOString().substring(0, 10);
}


/* dateRangeRadians
Given two days in the same year, return the start, middle and end angles in radians.
*/
function dateRangeRadians(year, dayOfYear1, dayOfYear2) {

	const days = daysInYear(year);
	const radiansStart = divisionRadians(days, dayOfYear1).start;
	const radiansEnd = divisionRadians(days, dayOfYear2).start;

	let result = {
		start  : radiansStart,
		middle : (radiansStart + radiansEnd) / 2,
		end    : radiansEnd,
		width  : radiansEnd - radiansStart,
	}
	return result;
}/* dateRangeRadians */



//
// Period Arrays
//



/* getMonthArray
This needs a lot of cleanup/rationalisation:
	Remove globals/paramterise
	Change monthname map to something else
	Change radians calc to fn

*/
function getMonthArray(displayDate, monthNames=config.monthNames) {
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
function getPeriodDayArray(dateStart, dateEnd, displayDate, locale=config.locale) {
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
		season.radians = dateRangeRadians(year, dayOfYear(season.dateStart), dayOfYear(season.dateEnd));
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
		quarter.radians = dateRangeRadians(year, dayOfYear(quarter.dateStart), dayOfYear(quarter.dateEnd));
		quarter.class = (dateIsInPeriod(date, quarter.dateStart, quarter.dateEnd)) ? 'current' : '';
	}

	return quarterArray;
}/* getQuarterArray */



/* getYearWeekArray
*/
function getYearWeekArray(date) {

	let dateStart   = startOfYear(config.date.object);
	let dateEnd     = nextYear(config.date.object);

	let weekNumber = 1;

	let weekArray = [
		{
			name:      `${weekNumber}`,
			dateStart: dateStart,
			dateEnd:   dateEnd,
			radians:   undefined,
			class:     '',
		}
	];

	// log(weekNumber);

	for (let thisDate = new Date(dateStart); thisDate < dateEnd; incrementDay(thisDate))
	{
		//log(thisDate);
		if (thisDate.getDay() === 1)
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
	weekArray[weekArray.length-1].dateEnd = dateEnd;

	for (let week of weekArray) {
		week.radians = dateRangeRadians(date.getFullYear(), dayOfYear(week.dateStart), dayOfYear(week.dateEnd));
		week.class = (dateIsInPeriod(date, week.dateStart, week.dateEnd)) ? 'current' : '';
	}

	return weekArray;
}/* getYearWeekArray */
