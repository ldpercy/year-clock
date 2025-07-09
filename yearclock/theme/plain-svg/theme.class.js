/* Plain SVG
*/
themeClass['plain-svg'] = class extends ThemeBase {

	viewBox           = padViewBox(30);
	clockRadius       = 1200;
	outerRadius       = 1150;
	innerRadius       = 945;

	monthLabel = {
		radius         : 1010,
		sectorPosition : 0.5,
		rotate         : true,
		invert         : true,
	}

	weekdayMarkerLength = 42;
	weekendMarkerLength = 57;

	tick = {
		weekdayStart    : this.outerRadius,
		weekdayEnd      : this.outerRadius - this.weekdayMarkerLength,
		weekendStart    : this.outerRadius,
		weekendEnd      : this.outerRadius - this.weekendMarkerLength,
		monthFirstStart : this.outerRadius,
		monthFirstEnd   : this.innerRadius,
	};

	hand = {
		yearLength : 980,
	};

	dateLabelPosition         = 530;


	/* getClockSVG
	*/
	getClockSVG = function(displayDate)
	{
		displayDate.yearDayArray = getPeriodDayArray(displayDate.yearStart, displayDate.yearEnd, displayDate.object);

		const clockSVG = `
			<svg id="clock" class="yearclock" viewBox="${this.viewBox}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
				${this.getFace(this.clockRadius)}
				${this.getMonthSectors(displayDate.monthArray, this.outerRadius, this.innerRadius)}
				${this.getSectorLabels('month', displayDate.monthArray, this.monthLabel)}
				${this.getPeriodDayTicks('yearDay', displayDate.yearDayArray, this.tick)}
				${this.getDateLabel(displayDate.object, this.dateLabelPosition)}
				${this.getHands(displayDate, this.hand)}
			</svg>
		`;

		return clockSVG;
	}/* getClockSVG */


}/* Plain SVG */