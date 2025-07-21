/* Car dashboard theme
*/
themeClass['car-dashboard'] = class extends ThemeBase {

	viewBox           = '-2400 -1200 4800 2400';

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
		sectorPosition : 0,
		rotate         : false,
		invert         : false,
	};

	handConfig = {
		year : { length : 600 },
		month : { length : 850 },
	};


	/* getClockSVG
	*/
	getClockSVG = function(displayDate)
	{
		displayDate.monthDayArray = getPeriodDayArray(startOfMonth(displayDate.object), nextMonth(displayDate.object), displayDate.object, displayDate.language);

		const clockSVG = `
			<svg id="clock" class="yearclock" viewBox="${this.viewBox}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
				${this.getBody(this.body)}
				${this.getFace(this.clockRadius)}
				${this.getSectorLabels('month', displayDate.monthArray, this.monthLabel)}
				${this.getPeriodDayTicks('monthDay', displayDate.monthDayArray, this.tick)}
				${this.getDateLabel(displayDate.object, this.dateLabelPosition)}
				${this.getHands(displayDate, this.handConfig)}
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


	getBody = function(body) {

		const xUpper = body.radius - (body.radius * (12/13));
		const yUpper = body.radius - (body.radius * (5/13));

		const xLower = body.radius - (body.radius * (3/5));
		const yLower = body.radius - (body.radius * (1/5));


		const path = `
			M ${xUpper},${-yUpper} A ${body.radius},${body.radius} 0 1 1 ${xLower},${yLower}
			L ${-xLower},${yLower} A ${body.radius},${body.radius} 0 1 1 ${-xUpper},${-yUpper}
			Z`;

		const svg =
			`<path class="body" d="${path}" />`
		return svg;
	}


}/* car-dashboard */