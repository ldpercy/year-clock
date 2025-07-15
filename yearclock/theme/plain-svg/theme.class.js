/* Plain SVG
*/
themeClass['plain-svg'] = class extends ThemeBase {

	viewBox           = padViewBox(30);
	clockRadius       = 1200;
	outerRadius       = 1150;
	innerRadius       = 950;

	monthLabel = {
		radius         : 1075,
		sectorPosition : 0.5,
		rotate         : true,
		invert         : true,
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

	handConfig = {
		yearLength : 940,
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
				${this.getSectors('month', displayDate.monthArray, this.outerRadius, this.innerRadius)}
				${this.getSectorLabelsCurved('month', displayDate.monthArray, this.monthLabel)}
				${this.getPeriodDayTicks('yearDay', displayDate.yearDayArray, this.tick)}
				${this.getDateLabel(displayDate.object, this.dateLabelPosition)}
				${this.getHands(displayDate, this.handConfig)}
			</svg>
		`;

		return clockSVG;
	}/* getClockSVG */


}/* Plain SVG */