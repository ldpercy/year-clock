
import * as yearclockDate from "../Date.js";
import * as svg from "../SVG.js";
import * as geometry from "../Geometry.js";
import * as l10n from "../L10n.js";


export class YearClock {

	angularRange = new geometry.AngularRange();



	constructor(parameter) {
		this.parameter = parameter;
		// this.setDisplayDate(this.parameter.date);
	}

	/*
	this.parameter = {
		id,				// identifier for instance
		date,			// date to display
		theme,			// clock theme
		style,			// css style variant for the clock
		language,		// two-letter language code
		background,		// the background to show
		hemisphere,		// [northern,southern] which hemisphere the clock is in, used for seasons
	}
	*/


	/* setDisplayDate
	Each clock class needs to override this method and call it during construction
	*/
	setDisplayDate(date) {
		this.displayDate = new DisplayDate(date, this.parameter.language);
	}






}/* YearClock */






/*
find a better place for:
*/

function getDayClass(date, currentDate) { // this needs attention
	//log(arguments);
	let result = 'weekday';
	if (date.getDay() === 0 || date.getDay() == 6) result = 'weekend';
	if (date.getDate() === 1) result += ' first';
	if (yearclockDate.Date.datesAreEqual(date, currentDate)) {
		result += ' current';
	}
	return result;
}


function getMonthClass(date, displayDate) {
	let result = '';
	if (yearclockDate.Date.monthsAreEqual(date, displayDate)) result += ' current';
	return result;
}




/* getPeriodDayArray
Attempt at generalising to an arbitrary period.
Will try to use half-open intervals.
Might need to tweak the loop-end condition though.
*/
function getPeriodDayArray(dateStart, dateEnd, currentDate, locale) {
	const result = [];

	let dayCounter = 1;
	for (let thisDate = new yearclockDate.Date(dateStart); thisDate < dateEnd; thisDate.incrementDay())
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
export class DisplayDate extends yearclockDate.Date {

	language;
	#monthArray;
	dateRange;

	constructor(date, language)
	{
		super(date);
		this.language = language;
		//this.monthArray = this.getMonthArray(date, this.monthNames);
		this.dateRange = new yearclockDate.Range(this.yearStart, this.yearEnd);
	}


	get month()			{ return this.getMonth() + 1; } // js month starts at 0
	get monthRange()	{ return new yearclockDate.Range(yearclockDate.Date.startOfMonth(this), yearclockDate.Date.nextMonth(this)); }
	get dayName()		{ return this.toLocaleString(this.language, {weekday: "long"}); }
	get date()			{ return this.getDate(); }
	get yearRange()		{ return new yearclockDate.Range(this.yearStart, this.yearEnd); }
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
				dateStart   = new yearclockDate.Date(year, index);
				dateEnd     = new yearclockDate.Date(year, index + 1);
				//console.debug(index, dateStart, dateEnd);
				const month = {
					'id'           : monthId[index],
					'number'       : index+1,
					'name'         : monthName,
					'dateStart'    : dateStart,
					'dateEnd'      : dateEnd,
					//'lastDate'     : new yearclock.Date(nextMonth - 1000),
					'class'        : YearClock.getMonthClass(dateStart, date),
					'dateRange'    : new yearclockDate.Range(dateStart, dateEnd),
				};
				return month;
			}
		);

		//console.debug(result);

		return result;
	}/* getMonthArray */



}/* yearclock.DisplayDate */


