/* yearclock.Date
*/


import * as yearclock from './theme/YearClock.js';
import * as l10n from "./L10n.js";
import * as geometry from "./Geometry.js";



// yearclock.Date = class extends Date{
class YearclockDate extends Date {

	constructor(date) {
		super(...arguments);
	}


	// accessors

	get year()			{ return this.getFullYear(); }
	get daysInMonth()	{ return new Date(this.getFullYear(), this.getMonth()+1, 0).getDate(); }
	get dayOfMonth()	{ return this.getDate(); }
	get daysInYear()	{ return YearclockDate.dayOfYear(new Date(this.getFullYear(),11,31)); }
	get dayOfYear()		{ return YearclockDate.dayOfYear(this); }


	// return new Dates:
	get yearStart()		{ return new YearclockDate(this.getFullYear(), 0, 1); }
	get yearEnd()		{ return new YearclockDate(this.getFullYear()+1, 0, 1); }
	get monthStart()	{ return new YearclockDate(this.getFullYear(), this.getMonth(),1); }
	get monthEnd()		{ return new YearclockDate(this.getFullYear(), this.getMonth()+1,1); }



	// decisions, calculations:

	get isWeekend() {
		const dayNumber = this.getDay()
		return dayNumber == 0 || dayNumber == 6
	}
	get isFirst() { return this.getDate() === 1; }


	get isValid() {
		//https://stackoverflow.com/a/1353711
		return this instanceof Date && !isNaN(this);
	}

	get isLastDayOfMonth() {
		return (this.getDate() === this.daysInMonth);
	}


	name(locale)	{ return this.toLocaleString(locale, {weekday: "long"}); }



	isInRange(dateRange) {
		return ((this >= dateRange.start) && (this < dateRange.end));
	}

	// mutators:

	incrementDay(date) {
		this.setDate(this.getDate() + 1);
	}

	decrementDay(date) {
		this.setDate(this.getDate() - 1);
	}


	//
	//	Conversion methods
	//

	toIsoDate() {
		// return date.toISOString().substring(0, 10);
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
		// The timezone is always UTC,
		// https://stackoverflow.com/a/72581185
		var localDate = new Date(this.getTime() - this.getTimezoneOffset()*60000);
		return localDate.toISOString().substring(0, 10);
	}

	toIsoMonthDay() {
		return this.toIsoDate().substring(5, 10);
	}


	//
	//	Static methods
	//

	static dayOfYear(date) {
		return yearclock.Date.dayDifference(new Date(date.getFullYear(), 0, 1), date) + 1;
	}

	static datesAreEqual(d1,d2) {
		return (d1.getFullYear() === d2.getFullYear()) && (d1.getMonth() === d2.getMonth()) && (d1.getDate() === d2.getDate());
	}

	static monthsAreEqual(d1,d2) {
		return (d1.getFullYear() === d2.getFullYear()) && (d1.getMonth() === d2.getMonth());
	}

	static dayDifference(date1, date2) {
		return Math.floor((YearclockDate.truncateTime(date2) - YearclockDate.truncateTime(date1)) / (1000 * 60 * 60 * 24));
	}

	static yearDifference(date1, date2) {
		return date2.getFullYear() - date1.getFullYear();
	}


	// yearclock.Date static methods for factory/conversion methods
	// I find the naming of 'newFoo' in instance conversion constructors a bit awkaward, so going to make these static for now
	// constructors:
	//



	static startOfMonth(date) {
		return new YearclockDate(date.getFullYear(), date.getMonth(),1);
	}


	static nextMonth(date) {
		return new YearclockDate(date.getFullYear(), date.getMonth()+1,1);
	}

	static nextDay(date) {
		return new YearclockDate(date.getFullYear(), date.getMonth(), date.getDate() + 1);
	}

	static truncateTime(date) {
		return new YearclockDate(date.getFullYear(), date.getMonth(), date.getDate());
	}



	static getSeason(date, seasonArray) {
		const result = seasonArray.find(
			(season) => date.isInRange(season.dateRange)
		);
		return result;
	}



}/* yearclock.Date */



/* yearclock.Date.Range
*/
class Range {
	start;
	end;

	constructor(start, end) {
		this.start = new YearclockDate(start);		// not sure yet if i want to keep these 'new Date(...)' constructors in here
		this.end = new YearclockDate(end);
	}

	get length() { return YearclockDate.dayDifference(this.start, this.end); }

}/* yearclock.Date.Range */



/* yearclock.Date.DayRange
*/
class DayRange {

	array = [];
	startDate;
	endDate;
	//currentDate;
	angularRange;

	constructor(
		startDate,
		endDate,
		currentDate,
		language,
	) {
		this.startDate = startDate;
		this.endDate = endDate;
		this.currentDate = currentDate;

		let dayCounter = 1;
		for (let thisDate = new YearclockDate(startDate); thisDate < endDate; thisDate.incrementDay())
		{
			const dayInfo = {
				date         : new YearclockDate(thisDate),
				id           : thisDate.getDate(),
				dayOfPeriod  : dayCounter,
				class        : yearclock.theme.YearClock.getDayClass(thisDate, currentDate),
				name         : thisDate.name(language),
			}
			this.array.push(dayInfo);
			dayCounter++;
		}

	}/* constructor */


	setAngularRange( angularRange = new geometry.AngularRange()) {
		this.angularRange = angularRange;
		this.array.forEach(
			(element, index, array=this) => { element.angularRange = this.angularRange.division(index, array.length); } // nb one-based
		);
	}/* addAngularRange */



}/* yearclock.Date.DayRange */




/*
find a better place for:
*/

function getDayClass(date, currentDate) { // this needs attention
	//log(arguments);
	let result = 'weekday';
	if (date.getDay() === 0 || date.getDay() == 6) result = 'weekend';
	if (date.getDate() === 1) result += ' first';
	if (YearclocDate.datesAreEqual(date, currentDate)) {
		result += ' current';
	}
	return result;
}


function getMonthClass(date, displayDate) {
	let result = '';
	if (YearclockDate.monthsAreEqual(date, displayDate)) result += ' current';
	return result;
}




/* getPeriodDayArray
Attempt at generalising to an arbitrary period.
Will try to use half-open intervals.
Might need to tweak the loop-end condition though.
*/
export function getPeriodDayArray(dateStart, dateEnd, currentDate, locale) {
	const result = [];

	let dayCounter = 1;
	for (let thisDate = new YearclockDate(dateStart); thisDate < dateEnd; thisDate.incrementDay())
	{
		const dayInfo = {
			id           : thisDate.getDate(),
			name         : thisDate.toLocaleString(locale, {weekday: "long"}),
			dayOfPeriod  : dayCounter,
			date         : new yearclockDate.Date(thisDate),
			class        : YearClock.getDayClass(thisDate, currentDate),
		}
		result.push(dayInfo);
		dayCounter++;
	}

	return result;
}/* getPeriodDayArray */






/* createDisplayDate
This is a temporary-ish function to re-create the big fat object that was sitting in the setup function called `config.date`.
It needs to be rationalised (much) further.

Most of this are actually just extensions on date/yearclock.Date
Going to try another extension, but lots of this could still go away.
*/
class DisplayDate extends Date {

	language;
	#monthArray;
	dateRange;

	constructor(date, language)
	{
		super(date);
		this.language = language;
		//this.monthArray = this.getMonthArray(date, this.monthNames);
		this.dateRange = new Range(this.yearStart, this.yearEnd);
	}


	get month()			{ return this.getMonth() + 1; } // js month starts at 0
	get monthRange()	{ return new Range(YearclockDate.startOfMonth(this), YearclockDate.nextMonth(this)); }
	get dayName()		{ return this.toLocaleString(this.language, {weekday: "long"}); }
	get date()			{ return this.getDate(); }
	get yearRange()		{ return new Range(this.yearStart, this.yearEnd); }
	get monthNames()	{ return l10n.getMonthNames(this.language); }

	get monthArray()	{
		if (!this.#monthArray)
		{
			this.#monthArray = this.getMonthArray(this)
		}
		return this.#monthArray;
	}

	// Set up period arrays


	//log('createDisplayDate',result);


	/* getMonthArray
	This needs a lot of cleanup/rationalisation:
		Remove globals/paramterise
		Change monthname map to something else
	*/
	getMonthArray(date) { //(date, monthNames) {
		const monthId = [ "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec" ];
		const year = date.year;
		let dateStart;
		let dateEnd;

		const result = this.monthNames.map(
			function( monthName, index ) {
				dateStart   = new YearclockDate(year, index);
				dateEnd     = new YearclockDate(year, index + 1);
				//console.debug(index, dateStart, dateEnd);
				const month = {
					'id'           : monthId[index],
					'number'       : index+1,
					'name'         : monthName,
					'dateStart'    : dateStart,
					'dateEnd'      : dateEnd,
					//'lastDate'     : new yearclock.Date(nextMonth - 1000),
					'class'        : getMonthClass(dateStart, date),
					'dateRange'    : new Range(dateStart, dateEnd),
				};
				return month;
			}
		);

		//console.debug(result);

		return result;
	}/* getMonthArray */



}/* yearclock.DisplayDate */





export {
	YearclockDate as Date,
	Range,
	DayRange,
	DisplayDate
};