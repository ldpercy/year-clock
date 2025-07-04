/* vintage
*/
themeClass['vintage'] = class extends ThemeBase {

	viewBox           = padViewBox(200);

	body = {
		radius : 1300,
	}

	faceRadius       = 1200;

	monthSector = {
		outerRadius : 1100,
		innerRadius : 1000,
	};


	monthLabel = {
		radius         : 1050,
		sectorPosition : 0.5,
		rotate         : false,
		invert         : false,
	};


	daySector = {
		innerRadius : 600,
		outerRadius : 700,
	};

	dayLabel = {
		radius         : 650,
		sectorPosition : 0.5,
		rotate         : false,
		invert         : false,
	};


	weekdayMarkerLength = 40;
	weekendMarkerLength = 55;


	dateLabelPosition         = new Point(0,430);


	hand = {
		yearLength	: 1000,
		monthLength : 600,
	};



	/* getClockSVG
	*/
	getClockSVG = function(displayDate)
	{
		displayDate.monthDayArray = getPeriodDayArray(startOfMonth(displayDate.object), nextMonth(displayDate.object), displayDate.object, displayDate.language);

		displayDate.monthDayArray.forEach(
			//(day) => {day.radians = yearDayRadians(day.date);}
			(day) => {day.radians = divisionRadians(displayDate.monthDayArray.length, day.dayOfPeriod);}
		);

		log('displayDate.monthDayArray:', displayDate.monthDayArray);

		const clockSVG = `
			<svg
				id="clock"
				class="yearclock"
				viewBox="${this.viewBox}"
				preserveAspectRatio="xMidYMid meet"
				xmlns="http://www.w3.org/2000/svg"
				fill="url(#Gradient1)"
				>

				<!--
				<rect x="-1200" y="-1200" width="2400" height="2400">
				</rect>
				-->

				${this.getDefs()}
				${this.getBody(this.body)}
				${this.getFace(this.faceRadius)}

				${this.getMonthSectors(displayDate.monthArray, this.monthSector.outerRadius, this.monthSector.innerRadius)}
				${this.getMonthLabels(displayDate.monthArray, this.monthLabel)}

				${this.getPeriodDaySectors('month', displayDate.monthDayArray, this.daySector.innerRadius, this.daySector.outerRadius)}
				${this.getSectorLabels('monthDay', displayDate.monthDayArray, this.dayLabel)}

				${this.getDateLabel(displayDate.object, this.dateLabelPosition)}
				${this.getHands(displayDate, this.hand)}
			</svg>
		`;

		/*

		 */


		return clockSVG;
	}/* getClockSVG */



	formatLabel = function(labelType, data) {
		let result;
		switch(labelType) {
			case 'month'    : result = `${data.number}`; break; /* `${data.name.slice(0,3)}` */
			case 'date'     : result = `${data.date.getFullYear()}`; break;
			default         : result = data.name; break;
		}
		return result;
	}


	/* getDefs
	*/
	getDefs = function() {
		const result = `
			<defs>
				<linearGradient id="Gradient1">
					<stop class="stop1" offset="0%" />
					<stop class="stop2" offset="50%" />
					<stop class="stop3" offset="100%" />
				</linearGradient>
				<linearGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1">
					<stop offset="0%" stop-color="red" />
					<stop offset="50%" stop-color="black" stop-opacity="0" />
					<stop offset="100%" stop-color="blue" />
				</linearGradient>
			</defs>
		`;
		return result;
	}/* getDefs */


	getBody = function(body) {
		const svg =
			`<circle cx="0" cy="0" r="${body.radius}" class="body"></circle>`
		return svg;
	}



}/* vintage */