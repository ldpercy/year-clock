//
// Date
//


yearclock.Date = class extends Date{


	//
	// yearclock.Date instance methods:
	//

	constructor(date) {
		super(date);
	}

	// accessors
	get year()			{ return this.getFullYear(); }


	// mutators:

	incrementDay(date) {
		this.setDate(this.getDate() + 1);
	}

	decrementDay(date) {
		this.setDate(this.getDate() - 1);
	}


	// decisions, calculations:


	isValidDate() {
		//https://stackoverflow.com/a/1353711
		return this instanceof Date && !isNaN(this);
	}

	isWeekend() {
		const dayNumber = this.getDay()
		return dayNumber == 0 || dayNumber == 6
	}
	isFirst() { return thisDate.getDate() === 1; }

	isLastDayOfMonth() {
		return (this.getDate() === daysInMonth(this));
	}


	// these two should be moved to be part of dateRange instead, plus eliminate the first
	isInPeriod(periodStart, periodEnd) {
		return ((this >= periodStart) && (this < periodEnd));
	}
	isInRange(dateRange) {
		return ((this >= dateRange.start) && (this < dateRange.end));
	}

	get daysInMonth() {
		return new Date(this.getFullYear(), this.getMonth()+1, 0).getDate();
	}

	get dayOfMonth()	{ return this.getDate(); }



	get daysInYear() {
		return yearclock.Date.dayOfYear(new Date(this.getFullYear(),11,31));
	}


	//
	// Date formatting
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


	// yearclock.Date static methods

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
		return Math.floor((yearclock.Date.truncateTime(date2) - yearclock.Date.truncateTime(date1)) / (1000 * 60 * 60 * 24));
	}

	static yearDifference(date1, date2) {
		return date2.getFullYear() - date1.getFullYear();
	}


	// yearclock.Date static methods for factory/conversion methods
	// I find the naming of 'newFoo' in instance conversion constructors a bit awkaward, so going to make these static for now
	// constructors:
	//

	static startOfYear(date) {
		return new Date(date.getFullYear(), 0, 1);
	}

	static startOfMonth(date) {
		return new Date(date.getFullYear(), date.getMonth(),1);
	}

	static nextYear(date) {
		return new Date(date.getFullYear()+1, 0, 1);
	}

	static nextMonth(date) {
		return new Date(date.getFullYear(), date.getMonth()+1,1);
	}

	static nextDay(date) {
		return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
	}

	static truncateTime(date) {
		return new Date(date.getFullYear(), date.getMonth(), date.getDate());
	}





}/* yearclock.Date */




yearclock.Date.Range = class {
	constructor(start, end) {
		this.start = new yearclock.Date(start);		// not sure yet if i want to keep these 'new Date(...)' constructors in here
		this.end = new yearclock.Date(end);
	}

	length = function() { return yearclock.Date.dayDifference(this.start, this.end); }

}/* DateRange */




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




/*
Return the last day of a half-open date range instead of its open limit.
Equivalent to previousDay(date)
closedIntervalEnd(date) {}
*/



/*
dr = new DateRange('2025-01-01','2026-01-01')
*/

