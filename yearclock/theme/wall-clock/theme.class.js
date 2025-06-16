/* Wall clock theme
*/
themeClass['wall-clock'] = class extends ThemeBase {

	viewBox           = padViewBox(30);
	clockRadius       = 1200;

	innerRadius       = 1000;
	outerRadius       = 1150;

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

	dateLabelPosition         = new Point(0,430);

	monthLabel = {
		radius         : 920,
		sectorPosition : 0,
		rotate         : false,
		invert         : false,
	};

	yearHandLength    = 600;
	monthHandLength    = 850;


	/* getClockSVG
	*/
	getClockSVG = function(displayDate)
	{
		displayDate.monthDayArray = getPeriodDayArray(startOfMonth(displayDate.object), nextMonth(displayDate.object), displayDate.object);

		const clockSVG = `
			<svg id="clock" class="yearclock" viewBox="${this.viewBox}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
				${this.getFace(this.clockRadius)}
				${this.getMonthLabels(displayDate.monthArray, this.monthLabel)}
				${this.getPeriodDayTicks('monthDay', displayDate.monthDayArray, this.tick)}
				${this.getDateLabel(displayDate.object, this.dateLabelPosition)}
				${this.getHands(displayDate, true)}
			</svg>
		`;

		return clockSVG;
	}/* getClockSVG */


	formatLabel = function(labelType, data) {
		let result;
		switch(labelType) {
			case 'month'    : result = `${data.name.slice(0,3)}`    ; break;
			case 'date'     : result = `${data.date.getFullYear()}` ; break;
			default         : result = data.name; break;
		}
		return result;
	}

}/* wall-clock */