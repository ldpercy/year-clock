/* Wheel
*/
themeClass['wheel'] = class extends ThemeBase {

	viewBox           = padViewBox(30);
	clockRadius       = 1200;
	outerRadius       = 1150;
	innerRadius       = 950;

	monthLabel = {
		radius         : 1075,
		sectorPosition : 0.5,
		rotate         : true,
		invert         : false,
	}

	weekdayMarkerLength = 42;
	weekendMarkerLength = 57;

	tick = {
		weekdayStart    : this.innerRadius,
		weekdayEnd      : this.innerRadius + this.weekdayMarkerLength,
		weekendStart    : this.innerRadius,
		weekendEnd      : this.innerRadius + this.weekendMarkerLength,
		monthFirstStart : this.innerRadius,
		monthFirstEnd   : this.outerRadius,
	};


	dateLabel = { position : 530 };


	/* getThemeSVG
	*/
	getThemeSVG = function(displayDate)
	{
		addDateRangeRadians(displayDate.monthArray, displayDate.yearRange);
		displayDate.yearDayArray = getPeriodDayArray(displayDate.yearStart, displayDate.yearEnd, displayDate.object);
		addRadians(displayDate.yearDayArray);


		const yearDayDivision = divisionDegrees(displayDate.daysInYear, displayDate.dayOfYear-1);
		const yearTransform = `rotate(${-yearDayDivision.middle},0,0)`;

		const themeSVG = `
			<g transform="${yearTransform}">
				${this.getFace(this.clockRadius)}
				${this.getSectors('month', displayDate.monthArray, this.outerRadius, this.innerRadius)}
				${this.getSectorLabelsCurved('month', displayDate.monthArray, this.monthLabel)}
				${this.getPeriodDayTicks('yearDay', displayDate.yearDayArray, this.tick)}
			</g>
			${this.getDateLabel('year', displayDate, this.dateLabel)}
		`;

		return themeSVG;
	}/* getThemeSVG */


}/* Plain SVG */