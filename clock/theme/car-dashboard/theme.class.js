/* Car dashboard theme
*/
themeClass['car-dashboard'] = class extends ThemeBase {

	viewBox           = '-2700 -1400 5400 2800';

	body = {
		radius : 1300,
	}

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
		sectorPosition : 0.5,
		rotate         : false,
		invert         : false,
	};

	dayLabel = {
		radius         : 920,
		sectorPosition : 0.5,
		rotate         : false,
		invert         : false,
	};


	handConfig = {
		year : { length : 800 },
		month : { length : 800 },
	};


	/* getClockSVG
	*/
	getClockSVG = function(displayDate)
	{
		displayDate.monthDayArray = getPeriodDayArray(startOfMonth(displayDate.object), nextMonth(displayDate.object), displayDate.object, displayDate.language);

		/* displayDate.monthDayArray.forEach(
			(day) => {day.radians = divisionRadians(displayDate.monthDayArray.length, day.dayOfPeriod);}
		); */
		addRadians(displayDate.monthDayArray, radians(225), radians(270));

		const clockSVG = `
			<svg id="clock" class="yearclock" viewBox="${this.viewBox}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
				${this.getGrid(this.viewBox)}
				${this.getBody(this.body)}

				<g transform="translate(-1300)">
					<!-- month-day -->
					${this.getFace(this.clockRadius)}
					${this.getPeriodDayTicks('monthDay', displayDate.monthDayArray, this.tick)}
					${this.getSectorLabels('monthDay', displayDate.monthDayArray, this.dayLabel)}
					<g class="hands">
						${this.getMonthHand(displayDate, this.handConfig.month)}
					</g>
				</g>
				<g transform="translate(1300)">
					<!-- year -->
					${this.getFace(this.clockRadius)}
					${this.getSectorLabels('month', displayDate.monthArray, this.monthLabel)}
					${this.getDateLabel(displayDate.object, this.dateLabelPosition)}
					<g class="hands">
						${this.getYearHand(displayDate, this.handConfig.year)}
					</g>
				</g>

			</svg>
		`;

		return clockSVG;
	}/* getClockSVG */


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