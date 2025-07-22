/* Car dashboard theme
*/
themeClass['car-dashboard'] = class extends ThemeBase {

	viewBox           = '-2700 -1400 5400 2800';

	body = {
		radius : 1300,
	}


	clockRadius       = 1200;
	innerRadius       = 900;
	outerRadius       = 1200;

	dial = {
		degreesStart  : 225,
		degreesLength : 270,
		radiansStart  : radians(225),
		radiansLength : radians(270),
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

	monthLabel = {
		radius         : 920,
		sectorPosition : 0.5,
		rotate         : false,
		invert         : false,
	};

	dayLabel = {
		radius         : 1120,
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
		addRadians(displayDate.monthArray, this.dial.radiansStart, this.dial.radiansLength);

		displayDate.monthDayArray = getPeriodDayArray(startOfMonth(displayDate.object), nextMonth(displayDate.object), displayDate.object, displayDate.language);
		addRadians(displayDate.monthDayArray, this.dial.radiansStart, this.dial.radiansLength);

		const themeSVG = `
			<defs>
				<linearGradient id="body-light" y1="0%" y2="100%" x1="0%" x2="0%">
					<stop offset="0%" stop-color="#111f"/>
					<stop offset="50%" stop-color="#333f"/>
					<stop offset="90%" stop-color="#333f"/>
					<stop offset="100%" stop-color="#555f"/>
				</linearGradient>
			</defs>

			${this.getGrid(this.viewBox)}
			${this.getBody(this.body)}

			<g transform="translate(-1300)">
				<!-- month-day -->
				${this.getFace(this.clockRadius)}
				${this.getPeriodDayTicks('monthDay', displayDate.monthDayArray, this.tick)}
				${this.getSectorLabels('monthDay', displayDate.monthDayArray, this.dayLabel)}
				<g class="hands">
					${this.getMonthHand(displayDate, this.handConfig.month, this.dial.degreesStart, this.dial.degreesLength)}
				</g>
			</g>
			<g transform="translate(1300)">
				<!-- year -->
				${this.getFace(this.clockRadius)}
				${this.getSectorLabels('month', displayDate.monthArray, this.monthLabel)}
				${this.getDateLabel(displayDate.object, this.dateLabelPosition)}
				<g class="hands">
					${this.getYearHand(displayDate, this.handConfig.year, this.dial.degreesStart, this.dial.degreesLength)}
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
			case 'date'     : result = `${isoDate(data.date)}` ; break;
			default         : result = data.name; break;
		}
		return result;
	}


	getBody = function(body) {

		const xUpper = body.radius * (1/13);
		const yUpper = body.radius * (5/13);

		const xLower = body.radius * (8/13);
		const yLower = body.radius * (12/13);

		/*

		c = 1300,0


		x ~= 1000
		y ~= 1000
		*/


		const path = `
			M ${xUpper},${-yUpper} A ${body.radius},${body.radius} 0 1 1 ${xLower},${yLower}
			L ${-xLower},${yLower} A ${body.radius},${body.radius} 0 1 1 ${-xUpper},${-yUpper}
			Z`;

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