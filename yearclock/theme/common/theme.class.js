/* common
*/
themeClass['common'] = class extends ThemeBase {


	viewBox           = '-1200 -1200 2400 2400';
	clockRadius       = 1200;
	outerRadius       = 1120;
	innerRadius       = 930;

	weekdayMarkerLength = 40;
	weekendMarkerLength = 55;
	yearHandLength      = 1030;
	dateLabelPosition   = 500;

	monthLabel = {
		radius         : 985,
		sectorPosition : 0.5,
		rotate         : true,
		invert         : true,
	};


	/* getClockSVG
	*/
	getClockSVG = function(displayDate)
	{
		const clockSVG = `
			<svg id="clock" class="yearclock" viewBox="${this.viewBox}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
				${this.getFace()}
				${this.getMonthSectors(displayDate.monthArray, this.outerRadius, this.innerRadius)}
				${this.getMonthLabels(displayDate.monthArray, this.monthLabel)}
				${this.getYearDayTicks(displayDate.yearDayArray)}
				${this.getDateLabel(displayDate.object, this.dateLabelPosition)}
				${this.getHands(displayDate)}
			</svg>
		`;

		return clockSVG;
	}/* getClockSVG */


}/* common */