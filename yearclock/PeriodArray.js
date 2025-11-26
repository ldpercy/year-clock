//
// Period Arrays
//

import * as dates from './Dates.js';
import * as geometry from './Geometry.js';

/* getSeasonArray
This version returns 5 elements with the first season split at the beginning/end
*/
export function getSeasonArray(displayDate, hemisphere) {

	const year = displayDate.year;

	const seasonArray = [
		{
			id          : (hemisphere === 'southern') ? 'summer' : 'winter',
			dateRange   : new dates.Range(new dates.Date(year,0,1), new dates.Date(year,2,1)),
			class       : '',
		},
		{
			id          : (hemisphere === 'southern') ? 'autumn' : 'spring',
			dateRange   : new dates.Range(new dates.Date(year,2,1), new dates.Date(year,5,1)),
			class       : '',
		},
		{
			id          : (hemisphere === 'southern') ? 'winter' : 'summer',
			dateRange   : new dates.Range(new dates.Date(year,5,1), new dates.Date(year,8,1)),
			class       : '',
		},
		{
			id          : (hemisphere === 'southern') ? 'spring' : 'autumn',
			dateRange   : new dates.Range(new dates.Date(year,8,1), new dates.Date(year,11,1)),
			class       : '',
		},
		{
			id          : (hemisphere === 'southern') ? 'summer' : 'winter',
			dateRange   : new dates.Range(new dates.Date(year,11,1), new dates.Date(year+1,0,1)),
			class       : '',
		},
	];

	seasonArray.find( (season) => displayDate.isInRange(season.dateRange) ).class = 'current';
	geometry.addDateRangeAngularRange(seasonArray, displayDate.yearRange);

	return seasonArray;
}/* getSeasonArray */




/* getSeasonCircleArray
This version wraps the last season around so that it can be used in full-circle presentations
*/
export function  getSeasonCircleArray(displayDate, hemisphere) {

	const year = displayDate.year;

	let wrappedSeasonStart, wrappedSeasonEnd, thisYearSeasonStart, thisYearSeasonEnd, thisYearSeasonDays;

	if (displayDate.month === 12) {
		wrappedSeasonStart = new dates.Date(year,11,1);
		thisYearSeasonEnd = new dates.Date(year,2,1);
		thisYearSeasonDays = dates.dayDifference(displayDate.yearStart, thisYearSeasonEnd);
		wrappedSeasonEnd = new dates.Date(displayDate.yearEnd);
		wrappedSeasonEnd.setDate(wrappedSeasonEnd.getDate() + thisYearSeasonDays);
	} else {
		wrappedSeasonEnd = new dates.Date(year,2,1);
		thisYearSeasonStart = new dates.Date(year,11,1);
		thisYearSeasonDays = dates.dayDifference(thisYearSeasonStart, displayDate.yearEnd);
		wrappedSeasonStart = new dates.Date(displayDate.yearStart);
		wrappedSeasonStart.setDate(wrappedSeasonStart.getDate() - thisYearSeasonDays);
	}

	const seasonArray = [
		{
			id          : (hemisphere === 'southern') ? 'autumn' : 'spring',
			dateRange   : new dates.Range(new dates.Date(year,2,1), new dates.Date(year,5,1)),
			class       : '',
		},
		{
			id          : (hemisphere === 'southern') ? 'winter' : 'summer',
			dateRange   : new dates.Range(new dates.Date(year,5,1), new dates.Date(year,8,1)),
			class       : '',
		},
		{
			id          : (hemisphere === 'southern') ? 'spring' : 'autumn',
			dateRange   : new dates.Range(new dates.Date(year,8,1), new dates.Date(year,11,1)),
			class       : '',
		},
		{
			id          : (hemisphere === 'southern') ? 'summer' : 'winter',
			dateRange   : new dates.Range(wrappedSeasonStart, wrappedSeasonEnd),
			class       : '',
		},
	];

	seasonArray.find( (season) => displayDate.isInRange(season.dateRange) ).class = 'current';
	geometry.addDateRangeAngularRange(seasonArray, displayDate.yearRange);

	return seasonArray;
}/* getSeasonCircleArray */


/* getQuarterArray
*/
export function  getQuarterArray(displayDate) {

	const year = displayDate.year;

	const quarterArray = [
		{
			id          : '1',
			name        : 'Q1',
			dateRange   : new dates.Range(new dates.Date(year,0,1), new dates.Date(year,3,1)),
			radians     : undefined,
			class       : '',
		},
		{
			id          : '2',
			name        : 'Q2',
			dateRange   : new dates.Range(new dates.Date(year,3,1), new dates.Date(year,6,1)),
			radians     : undefined,
			class       : '',
		},
		{
			id          : '3',
			name        : 'Q3',
			dateRange   : new dates.Range(new dates.Date(year,6,1), new dates.Date(year,9,1)),
			radians     : undefined,
			class       : '',
		},
		{
			id          : '4',
			name        : 'Q4',
			dateRange   : new dates.Range(new dates.Date(year,9,1), new dates.Date(year,12,1)),
			radians     : undefined,
			class       : '',
		},
	];

	quarterArray.find( (quarter) => displayDate.isInRange(quarter.dateRange) ).class = 'current';
	geometry.addDateRangeAngularRange(quarterArray, displayDate.yearRange);

	return quarterArray;
}/* getQuarterArray */



/* getYearWeekArray
*/
export function  getYearWeekArray(displayDate) {

	const yearStart   = displayDate.yearStart;
	const yearEnd     = displayDate.yearEnd;

	let weekNumber = 1;

	let weekArray = [
		{
			id          : `${weekNumber}`,
			name        : `${weekNumber}`,
			dateRange   : new dates.Range(yearStart, undefined),
			radians     : undefined,
			class       : '',
		}
	];

	for (let thisDate = new dates.Date(yearStart); thisDate < yearEnd; thisDate.incrementDay())
	{
		if (thisDate.getDay() === 1 && !dates.datesAreEqual(thisDate, yearStart)) // need this condition otherwise weeks get borked
		{
			weekArray[weekArray.length-1].dateRange.end = new dates.Date(thisDate);

			weekNumber++;
			weekArray.push({
				id          : `${weekNumber}`,
				name        : `${weekNumber}`,
				dateRange   : new dates.Range(thisDate, undefined),
				radians     : undefined,
				class       : '',
			});
		}
	}
	weekArray[weekArray.length-1].dateRange.end = yearEnd;

	const currentWeek = weekArray.find( (week) => displayDate.isInRange(week.dateRange) );
	currentWeek.class = 'current';
	displayDate.week = currentWeek;

	geometry.addDateRangeAngularRange(weekArray, displayDate.yearRange);

	//console.debug(weekArray);

	return weekArray;
}/* getYearWeekArray */


