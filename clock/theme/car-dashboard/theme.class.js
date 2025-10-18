/* Car dashboard theme
*/
YearClock['car-dashboard'] = class extends ThemeBase {

	//viewBox           = '-2700 -1400 5400 2800';
	viewBox           = padViewBox(50, '-2700 -1400 5400 2800');

	clock = {
		bodyRadius : 1400,
		faceRadius : 1300,
	}


	seasonWheel = {
		annulus : new Annulus(250, 0),
	};


	clockRadius       = 1200;
	innerRadius       = 900;
	outerRadius       = 1200;

	dial = {
		degreeDelta   : new DegreeDelta(225, 270),
		radianDelta   : new RadianDelta(radians(225), radians(270)),
	}

	weekdayMarkerLength = 100;
	weekendMarkerLength = 150;

	tick = {
		weekdayStart    : this.outerRadius,
		weekdayEnd      : this.outerRadius - this.weekdayMarkerLength,
		weekendStart    : this.outerRadius,
		weekendEnd      : this.outerRadius - this.weekendMarkerLength,
		monthFirstStart : this.outerRadius,
		monthFirstEnd   : this.innerRadius,
	};

	dayNameLabel = {
		position   : new Point(0,400),
		attribute  : `textLength="600" lengthAdjust="spacingAndGlyphs"`,
	}

	dateLabel = {
		position   : new Point(0,400),
		attribute  : `textLength="650" lengthAdjust="spacingAndGlyphs"`,
	}


	hourLabel = { position : new Point(0,500) };

	monthDayAnnulus = new Annulus(1200, 1000);
	yearMonthAnnulus = new Annulus(1200, 1000);


	monthSymbols = {
		radius         : 1200,
		position       : 0.5,
		rotate         : true,
		invert         : false,
		elementId      : 'dial-marker',
		width          : 100,
		height         : 100,
	};


	monthLabel = {
		radius         : 950,
		sectorPosition : 0.5,
		rotate         : false,
		invert         : false,
	};

	dayLabel = {
		radius         : 1000,
		sectorPosition : 0.5,
		rotate         : false,
		invert         : false,
	};

	seasonLabel = {
		radius         : 140,
		sectorPosition : 0.5,
		rotate         : true,
		invert         : false,
	};

	warningLight = {
		y	: 1000,
	};


	handConfig = {
		year : {
			function : ()=>this.getHand1,
			length      : 800,
			tipRadius   : 10,
			discRadius  : 75,
			tail        : 150,
			width       : 10,
		},
		month : {
			function : ()=>this.getHand1,
			length      : 900,
			tipRadius   : 10,
			discRadius  : 75,
			tail        : 150,
			width       : 10,
		},

	};


	constructor(clockParameter)
	{
		super(clockParameter);
		this.setDisplayDate(this.parameter.date);
	}


	setDisplayDate(date) {
		this.displayDate = createDisplayDate(date, this.parameter.language);

		addDateRangeRadians(this.displayDate.monthArray, this.displayDate.yearRange, this.dial.radianDelta);

		this.displayDate.monthDayArray = getPeriodDayArray(startOfMonth(this.displayDate.object), nextMonth(this.displayDate.object), this.displayDate.object, this.displayDate.language);
		addRadians(this.displayDate.monthDayArray, this.dial.radianDelta);

		this.displayDate.seasonCircleArray  = getSeasonCircleArray(this.displayDate, this.parameter.hemisphere);
		this.displayDate.seasonArray  = getSeasonArray(this.displayDate, this.parameter.hemisphere);
		this.displayDate.season = getSeason(this.displayDate.object, this.displayDate.seasonArray);
	}


	/* getThemeSVG
	*/
	getThemeSVG = function()
	{
		const themeSVG = `
			<defs>
				<!--
				<linearGradient id="body-light" y1="0%" y2="100%" x1="0%" x2="0%">
					<stop offset="0%" stop-color="#111f"/>
					<stop offset="50%" stop-color="#333f"/>
					<stop offset="90%" stop-color="#333f"/>
					<stop offset="100%" stop-color="#555f"/>
				</linearGradient>

				<filter id="inset-shadow">
					<feOffset dx="0" dy="0"/>
					<feGaussianBlur stdDeviation="20" result="offset-blur"/>
					<feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse"/>
					<feFlood class="dashboard-lighting" result="color"/>
					<feComposite operator="in" in="color" in2="inverse" result="shadow"/>
					<feComposite operator="over" in="shadow" in2="SourceGraphic"/>
				</filter>
				-->

				<clipPath id="bodyClip">
					<path d="${this.getBodyOuter(this.clock)}"/>
				</clipPath>

				<rect id="dial-marker" class="dial-marker" x="-10" y="0" width="20" height="80"/>
			</defs>

			<path class="backing" d="${this.getBodyPath(this.clock)}" />

			<g class="season">
				<g transform="translate(0,1075)">
					${this.getSeasonFace(this.seasonWheel, this.displayDate)}
				</g>
			</g>

			<path class="face" d="${this.getFacePath(this.clock)}" />

			<g class="body">
				<path d="${this.getBodyPath(this.clock)}" />
			</g>

			<g transform="translate(-1300)">
				<!-- month-day -->

				${this.getSectors('monthDay', this.displayDate.monthDayArray, this.monthDayAnnulus)}
				${this.getSymbols('monthDaySymbols', this.displayDate.monthDayArray, this.monthSymbols)}
				${this.getSectorLabels('monthDay', this.displayDate.monthDayArray, this.dayLabel)}


				${this.getWarningMonth('month', this.warningLight)}

				<!-- ${this.getDateLabel('monthHour', this.hourLabel)} -->
				${this.getDateLabel('dayName', this.dayNameLabel)}

				<g class="hands">
					${this.getMonthHand(this.handConfig.month, this.dial.degreeDelta)}
				</g>
			</g>
			<g transform="translate(1300)">
				<!-- year -->

				${this.getSectors('month', this.displayDate.monthArray, this.yearMonthAnnulus)}
				${this.getSymbols('monthSymbols', this.displayDate.monthArray, this.monthSymbols)}
				${this.getSectorLabels('month', this.displayDate.monthArray, this.monthLabel)}

				${this.getWarningYear('year', this.warningLight)}

				<!-- ${this.getDateLabel('yearHour', this.hourLabel)} -->
				${this.getDateLabel('date', this.dateLabel)}

				<g class="hands">
					${this.getYearHand(this.handConfig.year, this.dial.degreeDelta)}
				</g>
			</g>
		`;

		return themeSVG;
	}/* getThemeSVG */


	formatLabel = function(labelType, data) {
		let result;
		switch(labelType) {
			case 'month'    : result = `${data.name.slice(0,3)}`    ; break;
			case 'monthDay' : result = `${data.dayOfMonth}`    ; break;
			case 'date'     : result = `${isoDate(data.object)}` ; break;
			case 'dayName'  : result = `${data.name}`; break;
			//case 'season'   : result = `${data.name.slice(0,1)}`; break;
			case 'season'   : result = `${data.emoji}`; break;

			case 'monthHour' : result = `${(data.date*24).toString().padStart(4,'0')}`; break;
			case 'yearHour'  : result = `${(data.dayOfYear*24).toString().padStart(5,'0')}`; break;

			default         : result = data.name || data.id; break;
		}
		return result;
	}



	getSeasonFace = function(seasonWheel, displayDate) {

		const yearDayDivision = divisionDegrees(this.displayDate.daysInYear, this.displayDate.dayOfYear-1);
		const yearTransform = `rotate(${-yearDayDivision.middle},0,0)`;
		const result = `

			<g transform="${yearTransform}">
				${this.getSectors('season', this.displayDate.seasonCircleArray, seasonWheel.annulus)}
			</g>
			<text class="thermometer" x="230" y="-170">🌡</text>
			`;
		return result;
		/* <circle cx="0" cy="0" class="seasonDial" r="${season.dialRadius}" /> */
	}



	getFacePath = function(clock) {
		//${this.getBodyInner(clock)}
		const path = `
			M ${clock.faceRadius},${-clock.faceRadius}
			A ${clock.faceRadius},${clock.faceRadius} 0 1 1 ${clock.faceRadius},${clock.faceRadius}
			L ${-clock.faceRadius},${clock.faceRadius}
			A ${clock.faceRadius},${clock.faceRadius} 0 1 1 ${-clock.faceRadius},${-clock.faceRadius}
			Z

			${rectanglePath(-300, 800, 600, 300, 50)}

			${rectanglePath(-1650, 900, 700, 200, 50)}
			${rectanglePath(950, 900, 700, 200, 50)}

			Z`;
		return path;
	}/* getFacePath */


	getBodyInner = function(clock) {
		const xUpper = clock.faceRadius * (1/13);
		const yUpper = clock.faceRadius * (5/13);

		const xLower = clock.faceRadius * (8/13);
		const yLower = clock.faceRadius * (12/13);

		const path = `
			M ${xUpper},${-yUpper}
			A ${clock.faceRadius},${clock.faceRadius} 0 1 1 ${xLower},${yLower}
			L ${-xLower},${yLower}
			A ${clock.faceRadius},${clock.faceRadius} 0 1 1 ${-xUpper},${-yUpper}
			Z`;
		return path;
	}/* getBodyInner */


	getBodyPath = function(clock) {

		const path = `
			${this.getBodyOuter(clock)}
			${this.getBodyInner(clock)}

			M 0,-1000
			m26,97 l-122,-122 l167,-45 l-45,167  Z m-97,-167 l167,45 l-122,122 l-45,-167  Z m167,97 l-167,45 l45,-167 l122,122  Z m-193,0 l122,-122 l45,167 l-167,-45 z
			`;

		return path;
	}/* getBodyPath */


	getBodyOuter = function(clock) {
		const path = `
			M ${clock.faceRadius},${-clock.bodyRadius}
			A ${clock.bodyRadius},${clock.bodyRadius} 0 1 1 ${clock.faceRadius},${clock.bodyRadius}
			L ${-clock.faceRadius},${clock.bodyRadius}
			A ${clock.bodyRadius},${clock.bodyRadius} 0 1 1 ${-clock.faceRadius},${-clock.bodyRadius}
			Z`;
		return path;
	}/* getBodyOuter */


	getWarningMonth = function(type, settings) {

		let weekEvent = getWeekEvent(this.displayDate.object) || {name:'',symbol:''};
		let monthEvent = getMonthEvent(this.displayDate.object) || {name:'',symbol:''};
		let customEvent = getCustomEvent(this.displayDate.object) || {name:'',symbol:''};

		const result = `
			<g class="warningLight">
				<text x="-200" y="${settings.y}"><title>${weekEvent.name}</title>${weekEvent.symbol}</text>
				<text x="0" y="${settings.y}"><title>${monthEvent.name}</title>${monthEvent.symbol}</text>
				<text x="200" y="${settings.y}"><title>${customEvent.name}</title>${customEvent.symbol}</text>
			</g>
		`;
		return result;
	}/* getWarningMonth */


	getWarningYear = function(type, settings) {

		const event = getYearEvent(this.displayDate.object) || {name:'', symbol:''};
		const seasonEvent = getSeasonEvent(this.displayDate.season.id) || {name:'', symbol:''};

		const result = `
			<g class="warningLight">
				<text x="-200" y="${settings.y}"><title>${seasonEvent.name}</title>${seasonEvent.symbol}</text>
				<text x="0" y="${settings.y}"><title>${event.name}</title>${event.symbol}</text>
				<text x="200" y="${settings.y}"><title>${event.name}</title>${event.symbol}</text>
			</g>
		`;
		return result;
	}/* getWarningYear */



}/* car-dashboard */
