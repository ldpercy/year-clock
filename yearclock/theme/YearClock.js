
yearclock.theme.YearClock = class  {

	svg = yearclock.SVG;


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
		this.displayDate = this.createDisplayDate(date, this.parameter.language);
	}



	/* createDisplayDate
	This is a temporary-ish function to re-create the big fat object that was sitting in the setup function called `config.date`.
	It needs to be rationalised (much) further.
	*/
	createDisplayDate(date, language) {
		//log('createDisplayDate', arguments);
		const result = {
			object      : new Date(date),
			language    : language,
			year        : date.getFullYear(),
			month       : date.getMonth() + 1,		// js month starts at 0
			monthRange  : new DateRange(startOfMonth(date), nextMonth(date)),
			daysInMonth : daysInMonth(date),
			date        : date.getDate(),
			name        : date.toLocaleString(language, {weekday: "long"}),
			dayOfYear   : dayOfYear(date),
			daysInYear  : daysInYear(date),
			yearStart   : startOfYear(date),
			yearEnd     : nextYear(date),
			yearRange   : new DateRange(startOfYear(date), nextYear(date)),
		};

		result.monthNames = yearclock.L10n.getMonthNames(language);

		// Set up period arrays
		result.monthArray   = getMonthArray(result, result.monthNames);

		//log('createDisplayDate',result);
		return result;
	}/* createDisplayDate */



}/* YearClock */



