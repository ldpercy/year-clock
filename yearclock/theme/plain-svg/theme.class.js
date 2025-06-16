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
	yearHandLength    = 980;
	dateLabelPosition         = 530;


	/* getClockSVG
	*/
	getClockSVG = function(displayDate)
	{
		const clockSVG = `
			<svg id="clock" class="yearclock" viewBox="${this.viewBox}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
				${this.getFace()}
				${this.getMonthSectors(displayDate.monthArray, this.outerRadius, this.innerRadius)}
				${this.getMonthLabels(displayDate.monthArray)}
				${this.getYearDayTicks(displayDate.yearDayArray)}
				${this.getDateLabel(displayDate.object, this.dateLabelPosition)}
				${this.getHands(displayDate)}
			</svg>
		`;

		return clockSVG;
	}/* getClockSVG */


}/* Plain SVG */