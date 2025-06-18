/* common
*/
themeClass['common'] = class extends ThemeBase {


	viewBox           = '-1200 -1200 2400 2400';
	clockRadius       = 1200;
	outerRadius       = 1120;
	innerRadius       = 930;

	weekdayMarkerLength = 40;
	weekendMarkerLength = 55;

	tick = {
		weekdayStart    : this.outerRadius,
		weekdayEnd      : this.outerRadius - this.weekdayMarkerLength,
		weekendStart    : this.outerRadius,
		weekendEnd      : this.outerRadius - this.weekendMarkerLength,
		monthFirstStart : this.outerRadius,
		monthFirstEnd   : this.innerRadius,
	};

	monthLabel = {
		radius         : 985,
		sectorPosition : 0.5,
		rotate         : true,
		invert         : true,
	};

	hand = {
		yearLength : 1030,
	};

	dateLabelPosition   = 500;


	/* getClockSVG
	*/
	getClockSVG = function(displayDate)
	{
		const clockSVG = `
			<svg id="clock" class="yearclock" viewBox="${this.viewBox}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
				${this.getFace(this.clockRadius)}
				${this.getMonthSectors(displayDate.monthArray, this.outerRadius, this.innerRadius)}
				${this.getMonthLabels(displayDate.monthArray, this.monthLabel)}
				${this.getPeriodDayTicks('yearDay', displayDate.yearDayArray, this.tick)}
				${this.getDateLabel(displayDate.object, this.dateLabelPosition)}
				${this.getHands(displayDate, this.hand)}
			</svg>
		`;

		return clockSVG;
	}/* getClockSVG */


}/* common */