/* yearclock.Date
*/
yearclock.Date = class extends Date{

	constructor(date) {
		super(...arguments);
	}


	// accessors

	get year()			{ return this.getFullYear(); }
	get daysInMonth()	{ return new Date(this.getFullYear(), this.getMonth()+1, 0).getDate(); }
	get dayOfMonth()	{ return this.getDate(); }
	get daysInYear()	{ return yearclock.Date.dayOfYear(new Date(this.getFullYear(),11,31)); }
	get dayOfYear()		{ return yearclock.Date.dayOfYear(this); }


	// return new Dates:
	get yearStart()		{ return new yearclock.Date(this.getFullYear(), 0, 1); }
	get yearEnd()		{ return new yearclock.Date(this.getFullYear()+1, 0, 1); }
	get monthStart()	{ return new yearclock.Date(this.getFullYear(), this.getMonth(),1); }
	get monthEnd()		{ return new yearclock.Date(this.getFullYear(), this.getMonth()+1,1); }



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
		return Math.floor((yearclock.Date.truncateTime(date2) - yearclock.Date.truncateTime(date1)) / (1000 * 60 * 60 * 24));
	}

	static yearDifference(date1, date2) {
		return date2.getFullYear() - date1.getFullYear();
	}


	// yearclock.Date static methods for factory/conversion methods
	// I find the naming of 'newFoo' in instance conversion constructors a bit awkaward, so going to make these static for now
	// constructors:
	//



	static startOfMonth(date) {
		return new yearclock.Date(date.getFullYear(), date.getMonth(),1);
	}


	static nextMonth(date) {
		return new yearclock.Date(date.getFullYear(), date.getMonth()+1,1);
	}

	static nextDay(date) {
		return new yearclock.Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
	}

	static truncateTime(date) {
		return new yearclock.Date(date.getFullYear(), date.getMonth(), date.getDate());
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
yearclock.Date.Range = class {
	start;
	end;

	constructor(start, end) {
		this.start = new yearclock.Date(start);		// not sure yet if i want to keep these 'new Date(...)' constructors in here
		this.end = new yearclock.Date(end);
	}

	get length() { return yearclock.Date.dayDifference(this.start, this.end); }

}/* yearclock.Date.Range */



/* yearclock.Date.DayRange
*/
yearclock.Date.DayRange = class {

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
		for (let thisDate = new yearclock.Date(startDate); thisDate < endDate; thisDate.incrementDay())
		{
			const dayInfo = {
				date         : new yearclock.Date(thisDate),
				id           : thisDate.getDate(),
				dayOfPeriod  : dayCounter,
				class        : yearclock.theme.YearClock.getDayClass(thisDate, currentDate),
				name         : thisDate.name(language),
			}
			this.array.push(dayInfo);
			dayCounter++;
		}

	}/* constructor */


	setAngularRange( angularRange = new yearclock.Geometry.AngularRange()) {
		this.angularRange = angularRange;
		this.array.forEach(
			(element, index, array=this) => { element.angularRange = this.angularRange.division(index, array.length); } // nb one-based
		);
	}/* addAngularRange */



}/* yearclock.Date.DayRange */


