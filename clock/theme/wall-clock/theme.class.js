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

	dateLabelPosition         = new Point(0,-430);

	monthLabel = {
		radius         : 920,
		sectorPosition : 0,
		rotate         : false,
		invert         : false,
	};

	handConfig = {
		year : {
			function : ()=>this.getHand1,
			length      : 600,
			tipRadius   : 10,
			discRadius  : 40,
			tail        : 160,
			width       : 18,
		},
		month : {
			function : ()=>this.getHand1,
			length      : 850,
			tipRadius   : 5,
			discRadius  : 30,
			tail        : 160,
			width       : 14,
		},
	};


	/* getThemeSVG
	*/
	getThemeSVG = function(displayDate)
	{
		addDateRangeRadians(displayDate.monthArray);
		displayDate.monthDayArray = getPeriodDayArray(startOfMonth(displayDate.object), nextMonth(displayDate.object), displayDate.object, displayDate.language);
		addRadians(displayDate.monthDayArray);

		const themeSVG = `
			${this.getFace(this.clockRadius)}
			${this.getSectorLabels('month', displayDate.monthArray, this.monthLabel)}
			${this.getPeriodDayTicks('monthDay', displayDate.monthDayArray, this.tick)}
			${this.getDateLabel(displayDate.object, this.dateLabelPosition)}
			<text x="0" y="430" id="schwartz" class="schwartz" textLength="500" lengthAdjust="spacingAndGlyphs">SCHWARTZ</text>
			${this.getHands(displayDate, this.handConfig)}
		`;

		return themeSVG;
	}/* getThemeSVG */


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