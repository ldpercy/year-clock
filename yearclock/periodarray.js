//
// Period Arrays
//








/* getSeasonArray

This version returns 5 elements with the first season split at the beginning/end

*/
function getSeasonArray(displayDate, hemisphere) {

	const year = displayDate.year;

	const seasonArray = [
		{
			id          : (hemisphere === 'southern') ? 'summer' : 'winter',
			dateRange   : new yearclock.Date.Range(new Date(year,0,1), new Date(year,2,1)),
			class       : '',
		},
		{
			id          : (hemisphere === 'southern') ? 'autumn' : 'spring',
			dateRange   : new yearclock.Date.Range(new Date(year,2,1), new Date(year,5,1)),
			class       : '',
		},
		{
			id          : (hemisphere === 'southern') ? 'winter' : 'summer',
			dateRange   : new yearclock.Date.Range(new Date(year,5,1), new Date(year,8,1)),
			class       : '',
		},
		{
			id          : (hemisphere === 'southern') ? 'spring' : 'autumn',
			dateRange   : new yearclock.Date.Range(new Date(year,8,1), new Date(year,11,1)),
			class       : '',
		},
		{
			id          : (hemisphere === 'southern') ? 'summer' : 'winter',
			dateRange   : new yearclock.Date.Range(new Date(year,11,1), new Date(year+1,0,1)),
			class       : '',
		},
	];

	seasonArray.find( (season) => displayDate.isInRange(season.dateRange) ).class = 'current';
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
		thisYearSeasonDays = yearclock.Date.dayDifference(displayDate.yearStart, thisYearSeasonEnd);
		wrappedSeasonEnd = new Date(displayDate.yearEnd);
		wrappedSeasonEnd.setDate(wrappedSeasonEnd.getDate() + thisYearSeasonDays);
	} else {
		wrappedSeasonEnd = new Date(year,2,1);
		thisYearSeasonStart = new Date(year,11,1);
		thisYearSeasonDays = yearclock.Date.dayDifference(thisYearSeasonStart, displayDate.yearEnd);
		wrappedSeasonStart = new Date(displayDate.yearStart);
		wrappedSeasonStart.setDate(wrappedSeasonStart.getDate() - thisYearSeasonDays);
	}

	const seasonArray = [
		{
			id          : (hemisphere === 'southern') ? 'autumn' : 'spring',
			dateRange   : new yearclock.Date.Range(new Date(year,2,1), new Date(year,5,1)),
			class       : '',
		},
		{
			id          : (hemisphere === 'southern') ? 'winter' : 'summer',
			dateRange   : new yearclock.Date.Range(new Date(year,5,1), new Date(year,8,1)),
			class       : '',
		},
		{
			id          : (hemisphere === 'southern') ? 'spring' : 'autumn',
			dateRange   : new yearclock.Date.Range(new Date(year,8,1), new Date(year,11,1)),
			class       : '',
		},
		{
			id          : (hemisphere === 'southern') ? 'summer' : 'winter',
			dateRange   : new yearclock.Date.Range(wrappedSeasonStart, wrappedSeasonEnd),
			class       : '',
		},
	];

	seasonArray.find( (season) => displayDate.isInRange(season.dateRange) ).class = 'current';
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
			dateRange   : new yearclock.Date.Range(new Date(year,0,1), new Date(year,3,1)),
			radians     : undefined,
			class       : '',
		},
		{
			id          : '2',
			name        : 'Q2',
			dateRange   : new yearclock.Date.Range(new Date(year,3,1), new Date(year,6,1)),
			radians     : undefined,
			class       : '',
		},
		{
			id          : '3',
			name        : 'Q3',
			dateRange   : new yearclock.Date.Range(new Date(year,6,1), new Date(year,9,1)),
			radians     : undefined,
			class       : '',
		},
		{
			id          : '4',
			name        : 'Q4',
			dateRange   : new yearclock.Date.Range(new Date(year,9,1), new Date(year,12,1)),
			radians     : undefined,
			class       : '',
		},
	];

	quarterArray.find( (quarter) => displayDate.isInRange(quarter.dateRange) ).class = 'current';
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
			dateRange   : new yearclock.Date.Range(yearStart, undefined),
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
				dateRange   : new yearclock.Date.Range(thisDate, undefined),
				radians     : undefined,
				class       : '',
			});
		}
	}
	weekArray[weekArray.length-1].dateRange.end = yearEnd;

	const currentWeek = weekArray.find( (week) => displayDate.isInRange(week.dateRange) );
	currentWeek.class = 'current';
	displayDate.week = currentWeek;

	addDateRangeRadians(weekArray, displayDate.yearRange);

	return weekArray;
}/* getYearWeekArray */

