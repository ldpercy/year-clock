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


	dateLabel = { position : new Point(0,-430) };

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


	constructor(clockParameter)
	{
		super(clockParameter);
		this.setDisplayDate(this.parameter.date);
	}


	setDisplayDate(date) {
		this.displayDate = createDisplayDate(date, this.parameter.language);

		addDateRangeRadians(this.displayDate.monthArray, this.displayDate.yearRange);
		this.displayDate.monthDayArray = getPeriodDayArray(startOfMonth(this.displayDate.object), nextMonth(this.displayDate.object), this.displayDate.object, this.displayDate.language);
		addRadians(this.displayDate.monthDayArray);
	}


	/* getThemeSVG
	*/
	getThemeSVG = function()
	{


		const themeSVG = `
			${this.getFace(this.clockRadius)}
			${this.getSectorLabels('month', this.displayDate.monthArray, this.monthLabel)}
			${this.getPeriodDayTicks('monthDay', this.displayDate.monthDayArray, this.tick)}
			${this.getDateLabel('year', this.dateLabel)}
			<text x="0" y="430" id="schwartz" class="schwartz" textLength="500" lengthAdjust="spacingAndGlyphs">SCHWARTZ</text>
			${this.getHands(this.handConfig)}
		`;

		return themeSVG;
	}/* getThemeSVG */


	formatLabel = function(labelType, data) {
		let result;
		switch(labelType) {
			case 'month'    : result = `${data.name.slice(0,3)}`    ; break;
			case 'year'     : result = `${data.year}` ; break;
			default         : result = data.name; break;
		}
		return result;
	}





}/* wall-clock */