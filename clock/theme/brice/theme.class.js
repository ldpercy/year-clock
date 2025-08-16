/* brice
Original theme from year-clock.net
*/
themeClass['brice'] = class extends ThemeBase {

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

	dateLabel = { position : 500 };


	/* getThemeSVG
	*/
	getThemeSVG = function(displayDate)
	{
		//addDateRangeRadians(displayDate.monthArray);
		addDateRangeRadians(displayDate.monthArray, displayDate.yearRange);
		displayDate.yearDayArray = getPeriodDayArray(displayDate.yearStart, displayDate.yearEnd, displayDate.object);
		addRadians(displayDate.yearDayArray);

		const themeSVG = `
			${this.getFace(this.clockRadius)}
			${this.getSectors('month', displayDate.monthArray, this.yearMonthSector)}
			${this.getSectorLabels('month', displayDate.monthArray, this.monthLabel)}
			${this.getPeriodDayTicks('yearDay', displayDate.yearDayArray, this.tick)}
			${this.getDateLabel('year', displayDate, this.dateLabel)}
			${this.getHands(displayDate, this.handConfig)}
		`;

		return themeSVG;
	}/* getThemeSVG */


}/* brice */