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
			dateRange   : new DateRange(new Date(year,0,1), new Date(year,2,1)),
			class       : '',
		},
		{
			id          : (hemisphere === 'southern') ? 'autumn' : 'spring',
			dateRange   : new DateRange(new Date(year,2,1), new Date(year,5,1)),
			class       : '',
		},
		{
			id          : (hemisphere === 'southern') ? 'winter' : 'summer',
			dateRange   : new DateRange(new Date(year,5,1), new Date(year,8,1)),
			class       : '',
		},
		{
			id          : (hemisphere === 'southern') ? 'spring' : 'autumn',
			dateRange   : new DateRange(new Date(year,8,1), new Date(year,11,1)),
			class       : '',
		},
		{
			id          : (hemisphere === 'southern') ? 'summer' : 'winter',
			dateRange   : new DateRange(new Date(year,11,1), new Date(year+1,0,1)),
			class       : '',
		},
	];

	seasonArray.find( (season) => dateIsInRange(displayDate.object, season.dateRange) ).class = 'current';
	addDateRangeRadians(seasonArray, displayDate.yearRange);

	return seasonArray;
}/* getSeasonArray */




/* getSeasonCircleArray

This version wraps the last season around so that it can be used in full-circle presentations

*/
function getSeasonCircleArray(displayDate, hemisphere) {

	const year = displayDate.year;

	let wrappedSeasonStart, wrappedSeasonEnd, thisYearSeasonStart, thisYearSeasonEnd, thisYearSeasonDays;

	if (displayDate.month === 12) {
		wrappedSeasonStart = new Date(year,11,1);
		thisYearSeasonEnd = new Date(year,2,1);
		thisYearSeasonDays = dayDifference(displayDate.yearStart, thisYearSeasonEnd);
		wrappedSeasonEnd = new Date(displayDate.yearEnd);
		wrappedSeasonEnd.setDate(wrappedSeasonEnd.getDate() + thisYearSeasonDays);
	} else {
		wrappedSeasonEnd = new Date(year,2,1);
		thisYearSeasonStart = new Date(year,11,1);
		thisYearSeasonDays = dayDifference(thisYearSeasonStart, displayDate.yearEnd);
		wrappedSeasonStart = new Date(displayDate.yearStart);
		wrappedSeasonStart.setDate(wrappedSeasonStart.getDate() - thisYearSeasonDays);
	}

	const seasonArray = [
		{
			id          : (hemisphere === 'southern') ? 'autumn' : 'spring',
			dateRange   : new DateRange(new Date(year,2,1), new Date(year,5,1)),
			class       : '',
		},
		{
			id          : (hemisphere === 'southern') ? 'winter' : 'summer',
			dateRange   : new DateRange(new Date(year,5,1), new Date(year,8,1)),
			class       : '',
		},
		{
			id          : (hemisphere === 'southern') ? 'spring' : 'autumn',
			dateRange   : new DateRange(new Date(year,8,1), new Date(year,11,1)),
			class       : '',
		},
		{
			id          : (hemisphere === 'southern') ? 'summer' : 'winter',
			dateRange   : new DateRange(wrappedSeasonStart, wrappedSeasonEnd),
			class       : '',
		},
	];

	seasonArray.find( (season) => dateIsInRange(displayDate.object, season.dateRange) ).class = 'current';
	addDateRangeRadians(seasonArray, displayDate.yearRange);

	return seasonArray;
}/* getSeasonCircleArray */


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

	quarterArray.find( (quarter) => dateIsInRange(displayDate.object, quarter.dateRange) ).class = 'current';
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

	const currentWeek = weekArray.find( (week) => dateIsInRange(displayDate.object, week.dateRange) );
	currentWeek.class = 'current';
	displayDate.week = currentWeek;

	addDateRangeRadians(weekArray, displayDate.yearRange);

	return weekArray;
}/* getYearWeekArray */

