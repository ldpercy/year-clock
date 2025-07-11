/* vintage
*/
themeClass['vintage'] = class extends ThemeBase {

	viewBox           = padViewBox(200);

	body = {
		radius : 1300,
	}

	faceRadius       = 1200;

	monthSector = {
		outerRadius : 1150,
		innerRadius : 1070,
	};

	monthText = {
		radius         : 1110,
		sectorPosition : 0.5,
		rotate         : true,
		invert         : false,
	};


	monthNumber = {
		radius         : 900,
		sectorPosition : 0.5,
		rotate         : true,
		invert         : false,
	};


	daySector = {
		innerRadius : 650,
		outerRadius : 750,
	};

	dayName = {
		radius         : 700,
		sectorPosition : 0.5,
		rotate         : true,
		invert         : false,
	};

	dayNumber = {
		radius         : 600,
		sectorPosition : 0.5,
		rotate         : true,
		invert         : false,
	};


	weekdayMarkerLength = 40;
	weekendMarkerLength = 55;


	dateLabelPosition         = new Point(0,350);


	hand = {
		yearLength	: 850,
		monthLength : 550,
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
			<svg id="clock"
				class="yearclock"
				viewBox="${this.viewBox}"
				preserveAspectRatio="xMidYMid meet"
				xmlns="http://www.w3.org/2000/svg"
				>

				<!--
				<rect x="-1200" y="-1200" width="2400" height="2400">
				</rect>
				-->

				${this.getDefs()}
				${this.getBody(this.body)}
				${this.getFace(this.faceRadius)}


				${this.getSectors('month', displayDate.monthArray, this.monthSector.outerRadius, this.monthSector.innerRadius)}

				${this.getSectorLabelsCurved('monthName', displayDate.monthArray, this.monthText)}
				${this.getSectorLabels('monthNumber', displayDate.monthArray, this.monthNumber)}

				${this.getPeriodDaySectors('day', displayDate.monthDayArray, this.daySector.innerRadius, this.daySector.outerRadius)}
				${this.getSectorLabels('dayName', displayDate.monthDayArray, this.dayName)}
				${this.getSectorLabels('dayNumber', displayDate.monthDayArray, this.dayNumber)}

				${this.getDateLabel(displayDate.object, this.dateLabelPosition)}

				<svg x="-100" y="250" width="200" height="200" viewBox="-1000 -1000 2000 2000" preserveAspectRatio="xMidYMid meet">
					${this.getIcon()}
				</svg>

				${this.getHand(displayDate, this.hand)}
			</svg>
		`;

		/*
		<text x="0" y="350" class="label favicon">&#10041;</text>
		*/

		return clockSVG;
	}/* getClockSVG */



	formatLabel = function(labelType, data) {
		let result;
		switch(labelType) {
			case 'monthName'    : result = data.name; break;
			case 'monthNumber'  : result = `${data.number}`; break;
			case 'dayName'      : result = `${data.name.slice(0,3)}`; break;
			case 'dayNumber'    : result = `${data.dayOfMonth}`; break;
			case 'date'         : result = `${data.date.getFullYear()}`; break;
			default             : result = data.name; break;
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


	/* getDateLabel
	*/
	getDateLabel = function(date, point) {

		const dateLabelPath = getArcPath(radians(-60), radians(60), point.y);
		//const dateLabelPath = getArcPath(radians(240), radians(120), point.y);

		const textPath = `<textPath startOffset="50%" xlink:href="#dateLabelPath">${this.formatLabel('date',{'date':date})}</textPath>`;

		const svg =
			`<g class="dateLabel">
				<defs>
					<path id="dateLabelPath" d="${dateLabelPath}"/>
				</defs>

				<text class="label dateLabel">${textPath}</text>
			</g>`;

		/*
		x="${point.x}" y="${point.y}"
		${this.formatLabel('date',{'date':date})}
		*/

		return svg;
	}/* getDateLabel */


	/* getHand
	Test of a more configurable hand shape
	*/
	getHand = function() {
		const length = 900;
		const tail = 100;
		const width = 50;

		const tipRadius = 5;

		const pinRadius = 25;
		const pinX = pinRadius * (3/5);
		const pinY = pinRadius * (4/5);
		/* Need to use a better pythagorean triad or do the trig properly */

		const path = `
			M -${tipRadius}, -${length}
			A ${tipRadius},${tipRadius} 0 1 1 ${tipRadius}, -${length}

			L ${pinX} -${pinY}
			A ${pinRadius},${pinRadius} 0 0 1 ${pinX}, ${pinY}

			L ${width} ${tail}
			L -${width} ${tail}

			L -${pinX} ${pinY}
			A ${pinRadius},${pinRadius} 0 0 1 -${pinX}, -${pinY}

			Z`;
		const svg = `<path class="hand1" d="${path}" />`;
		return svg;
	}


	getIcon = function() {
		const path =
			`<path class="label favicon" d="M 259 966 L -707 -707 L 966 259 L -966 259 L 707 -707 L -259 966 L -259 -966 L 707 707 L -966 -259 L 966 -259 L -707 707 L 259 -966  Z"/>`;
		return path;
	}


}/* vintage */