/* Car dashboard theme
*/
themeClass['car-dashboard'] = class extends ThemeBase {

	//viewBox           = '-2700 -1400 5400 2800';
	viewBox           = padViewBox(75, '-2700 -1400 5400 2800');

	body = {
		radius : 1300,
	}


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

	dateLabelPosition         = new Point(0,900);

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

		const themeSVG = `
			<defs>
				<linearGradient id="body-light" y1="0%" y2="100%" x1="0%" x2="0%">
					<stop offset="0%" stop-color="#111f"/>
					<stop offset="50%" stop-color="#333f"/>
					<stop offset="90%" stop-color="#333f"/>
					<stop offset="100%" stop-color="#555f"/>
				</linearGradient>

				<filter id="inset-shadow">
					<feOffset dx="0" dy="20"/>
					<feGaussianBlur stdDeviation="50" result="offset-blur"/>
					<feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse"/>
					<feFlood class="dashboard-lighting" result="color"/>
					<feComposite operator="in" in="color" in2="inverse" result="shadow"/>
					<feComposite operator="over" in="shadow" in2="SourceGraphic"/>
				</filter>

				<rect id="dial-marker" class="dial-marker" x="-10" y="0" width="20" height="80"/>
			</defs>

			${this.getBody(this.body)}

			<g transform="translate(-1300)">
				<!-- month-day -->
				${this.getFace(this.clockRadius)}

				${this.getSectors('monthDay', displayDate.monthDayArray, this.daySectorRadiusStart, this.sectorRadiusEnd)}

				<!-- ${this.getPeriodDayTicks('monthDay', displayDate.monthDayArray, this.tick)} -->
				${this.getSymbols('monthDaySymbols', displayDate.monthDayArray, this.monthSymbols)}

				${this.getSectorLabels('monthDay', displayDate.monthDayArray, this.dayLabel)}

				${this.getDateLabel('dayName', displayDate, this.dateLabelPosition)}

				<g class="hands">
					${this.getMonthHand(displayDate, this.handConfig.month, this.dial.degreeDelta)}
				</g>
			</g>
			<g transform="translate(1300)">
				<!-- year -->
				${this.getFace(this.clockRadius)}

				${this.getSectors('month', displayDate.monthArray, this.monthSectorRadiusStart, this.sectorRadiusEnd)}

				${this.getSymbols('monthSymbols', displayDate.monthArray, this.monthSymbols)}

				${this.getSectorLabels('month', displayDate.monthArray, this.monthLabel)}
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
			default         : result = data.name; break;
		}
		return result;
	}


	getBody = function(body) {

		const xUpper = body.radius * (1/13);
		const yUpper = body.radius * (5/13);

		const xLower = body.radius * (8/13);
		const yLower = body.radius * (12/13);


		const path = `
			M ${xUpper},${-yUpper} A ${body.radius},${body.radius} 0 1 1 ${xLower},${yLower}
			L ${-xLower},${yLower} A ${body.radius},${body.radius} 0 1 1 ${-xUpper},${-yUpper}
			Z
			M 300,1100 L -300,1100 L -300,800 L 300,800
			Z
			`;

		/*
			<circle cx="1300" cy="0" r="1300" />
			<circle cx="-1300" cy="0" r="1300" />
		*/
		const svg =
			`<path class="body" d="${path}" />`;
		/* <path class="body" d="${path}" />	 */
		return svg;
	}









}/* car-dashboard */





