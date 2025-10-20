/* brice
Original theme from year-clock.net
*/
yearclock.theme['brice'] = class extends yearclock.theme.Base {

	// Clock parameters
	viewBox           = '-1200 -1200 2400 2400';

	clockRadius       = 1200;

	yearMonthSector = new Annulus(1120, 930);

	monthLabel = {
		radius         : 985,
		sectorPosition : 0.5,
		rotate         : true,
		invert         : true,
	}

	weekdayMarkerLength = 40;
	weekendMarkerLength = 55;

	tick = {
		weekdayStart    : this.yearMonthSector.outerRadius,
		weekdayEnd      : this.yearMonthSector.outerRadius - this.weekdayMarkerLength,
		weekendStart    : this.yearMonthSector.outerRadius,
		weekendEnd      : this.yearMonthSector.outerRadius - this.weekendMarkerLength,
		monthFirstStart : this.yearMonthSector.outerRadius,
		monthFirstEnd   : this.yearMonthSector.innerRadius,
	};

	handConfig = {
		year : { length : 1030 }
	};

	dateLabel = {
		radius    : 500,
		position  : new Point(500,0)
	};


	constructor(clockParameter) {
		super(clockParameter);
		this.setDisplayDate(this.parameter.date);
	}


	setDisplayDate(date) {
		this.displayDate = new yearclock.DisplayDate(date, this.parameter.language);
		addDateRangeRadians(this.displayDate.monthArray, this.displayDate.yearRange);
		this.displayDate.yearDayArray = this.getPeriodDayArray(this.displayDate.yearStart, this.displayDate.yearEnd, this.displayDate);
		addRadians(this.displayDate.yearDayArray);
		// label side flipper:
		const yearOnLeft = (this.dateRatio(this.displayDate) < 0.5);
		this.dateLabel.position.x = this.dateLabel.radius * ((yearOnLeft) ? -1 :1);
	}


	/* getThemeSVG
	*/
	getThemeSVG = function()
	{



		const themeSVG = `
			${this.getFace(this.clockRadius)}
			${this.getSectors('month', this.displayDate.monthArray, this.yearMonthSector)}
			${this.getSectorLabels('month', this.displayDate.monthArray, this.monthLabel)}
			${this.getPeriodDayTicks('yearDay', this.displayDate.yearDayArray, this.tick)}
			${this.getDateLabel('year', this.dateLabel)}
			${this.getHands(this.handConfig)}
		`;

		return themeSVG;
	}/* getThemeSVG */



	dateRatio(date)
	{
		const year = date.getFullYear()
		const yearStart = new Date (year, 0)
		const yearEnd   = new Date (year + 1, 0)
		const yearLength = yearEnd - yearStart
		const timeElapsed = date - yearStart
		return timeElapsed / yearLength
	}


}/* YearClock.brice */