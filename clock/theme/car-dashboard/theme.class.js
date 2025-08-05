/* Car dashboard theme
*/
themeClass['car-dashboard'] = class extends ThemeBase {

	//viewBox           = '-2700 -1400 5400 2800';
	viewBox           = padViewBox(50, '-2700 -1400 5400 2800');

	clock = {
		bodyRadius : 1400,
		faceRadius : 1300,
	}


	season = {
		faceRadius : 400,
		dialRadius : 250,
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

	dateLabelPosition   = new Point(0,950);
	hourLabelPosition   = new Point(0,500);

	daySectorRadiusStart = 1000;
	monthSectorRadiusStart = 1000;
	sectorRadiusEnd = 1200;


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


	/* getThemeSVG
	*/
	getThemeSVG = function(displayDate)
	{
		// addRadians(displayDate.monthArray, this.dial.radiansStart, this.dial.radiansLength);
		addDateRangeRadians(displayDate.monthArray, displayDate.yearRange, this.dial.radianDelta);

		//log(displayDate.monthArray);

		displayDate.monthDayArray = getPeriodDayArray(startOfMonth(displayDate.object), nextMonth(displayDate.object), displayDate.object, displayDate.language);
		addRadians(displayDate.monthDayArray, this.dial.radianDelta);

		displayDate.seasonArray  = getSeasonArray(displayDate);

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

			<g class="season">
				<g transform="translate(0,1075)">
					${this.getSeasonFace(this.season, displayDate)}
				</g>
			</g>>
			<path class="face" d="${this.getFacePath(this.clock)}" />
			<g class="body">
				<path d="${this.getBodyPath(this.clock)}" />
			</g>

			<g transform="translate(-1300)">
				<!-- month-day -->

				${this.getSectors('monthDay', displayDate.monthDayArray, this.daySectorRadiusStart, this.sectorRadiusEnd)}

				${this.getSymbols('monthDaySymbols', displayDate.monthDayArray, this.monthSymbols)}

				${this.getSectorLabels('monthDay', displayDate.monthDayArray, this.dayLabel)}

				<!-- ${this.getDateLabel('monthHour', displayDate, this.hourLabelPosition)} -->
				${this.getDateLabel('dayName', displayDate, this.dateLabelPosition)}

				<g class="hands">
					${this.getMonthHand(displayDate, this.handConfig.month, this.dial.degreeDelta)}
				</g>
			</g>
			<g transform="translate(1300)">
				<!-- year -->

				${this.getSectors('month', displayDate.monthArray, this.monthSectorRadiusStart, this.sectorRadiusEnd)}

				${this.getSymbols('monthSymbols', displayDate.monthArray, this.monthSymbols)}

				${this.getSectorLabels('month', displayDate.monthArray, this.monthLabel)}
				<!-- ${this.getDateLabel('yearHour', displayDate, this.hourLabelPosition)} -->
				${this.getDateLabel('date', displayDate, this.dateLabelPosition)}

				<g class="hands">
					${this.getYearHand(displayDate, this.handConfig.year, this.dial.degreeDelta)}
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

			default         : result = data.name; break;
		}
		return result;
	}



	getSeasonFace = function(season, displayDate) {

		const yearDayDivision = divisionDegrees(displayDate.daysInYear, displayDate.dayOfYear-1);
		const yearTransform = `rotate(${-yearDayDivision.middle},0,0)`;
		const result = `
			<circle cx="0" cy="0" class="seasonFace" r="${season.faceRadius}" />

			<g transform="${yearTransform}">
				${this.getSectors('season', displayDate.seasonArray, 0, season.dialRadius)}
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
			m -52 193 l 0 -386 l 193 335 l -335 -193 l 386 0 l -335 193 l 193 -335 l 0 386 l -193 -335 l 335 193 l -386 0 l 335 -193 z
			`;
		/*
			M 0,-1200
			A 150,150 0 1 1 0,-900
			A 150,150 0 1 1 0,-1200
		*/

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


}/* car-dashboard */


