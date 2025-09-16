/* vintage
*/
themeClass['vintage'] = class extends ThemeBase {

	viewBox           = padViewBox(200);

	body = {
		radius : 1300,
	}

	faceRadius       = 1200;



	monthRing = {
		name    : 'yearMonth',
		array   : undefined, // this.displayDate.monthArray,
		sector  : new Annulus(1150, 1070),
		sectorType: 'normal',
		label : [
			{
				name           : 'monthName',
				radius         : 1110,
				sectorPosition : 0.5,
				rotate         : true,
				invert         : false,
				textType       : 'text',
				format         : 'monthName',
			},
			{
				name           : 'monthNumber',
				radius         : 950,
				sectorPosition : 0.5,
				rotate         : true,
				invert         : false,
				textType       : 'text',
				format         : 'monthNumber',
			},
		]
	};


	dayRing = {
		name    : 'monthDay',
		array   : undefined, // this.displayDate.monthDayArray,
		sector : new Annulus(750, 650),
		label : [
			{
				name           : 'dayName',
				radius         : 700,
				sectorPosition : 0.5,
				rotate         : true,
				invert         : false,
				textType       : 'text',
				format         : 'dayShort',
			},
			{
				name           : 'dayNumber',
				radius         : 615,
				sectorPosition : 0.5,
				rotate         : true,
				invert         : false,
				textType       : 'text',
				format         : 'dayNumber',
			},
		]
	};

	dateLabelPosition         = new Point(0,350);

	handConfig = {
		year : {
			function : ()=>this.getHand1,
			length      : 900,
			tipRadius   : 5,
			discRadius  : 60,
			tail        : 100,
			width       : 50,
		},
		month : {
			function : ()=>this.getHoleHand,
			length : 790,
			circleCenter: 670,
		}
	};


	constructor(clockParameter)
	{
		super(clockParameter);

		addDateRangeRadians(this.displayDate.monthArray, this.displayDate.yearRange);

		this.displayDate.monthDayArray = getPeriodDayArray(startOfMonth(this.displayDate.object), nextMonth(this.displayDate.object), this.displayDate.object, this.displayDate.language);
		addRadians(this.displayDate.monthDayArray);

		this.monthRing.array = this.displayDate.monthArray;
		this.dayRing.array   = this.displayDate.monthDayArray;
	}


	/* getThemeSVG
	*/
	getThemeSVG = function()
	{
		const themeSVG = `
			${this.getDefs()}
			${this.getBody(this.body)}
			${this.getFace(this.faceRadius)}

			${this.getRing(this.monthRing)}

			${this.getRing(this.dayRing)}

			${this.getDateLabel(this.dateLabelPosition)}

			<svg x="-100" y="250" width="200" height="200" viewBox="-1000 -1000 2000 2000" preserveAspectRatio="xMidYMid meet">
				${this.getIcon()}
			</svg>

			${this.getHands(this.handConfig)}
			${this.getPin()}
		`;

		/*
			${this.getSectors('day', this.displayDate.monthDayArray, this.monthDaySector)}
			${this.getSectorLabels('dayName', this.displayDate.monthDayArray, this.dayName)}
			${this.getSectorLabels('dayNumber', this.displayDate.monthDayArray, this.dayNumber)}

			${this.getSectors('month', this.displayDate.monthArray, this.yearMonthSector)}

			${this.getSectorLabelsCurved('monthName', this.displayDate.monthArray, this.monthText)}
			${this.getSectorLabels('monthNumber', this.displayDate.monthArray, this.monthNumber)}


		<text x="0" y="350" class="label favicon">&#10041;</text>
		*/

		return themeSVG;
	}/* getThemeSVG */



/* 	formatLabel = function(labelType, data) {
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
	} */


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
				<filter id="emboss-top">
					<feConvolveMatrix kernelMatrix="
						0 1 0
						0 1 0
						0 -1 0
					"/>
				</filter>
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
	getDateLabel = function(point) {

		const dateLabelPath = getArcPath(radians(-60), radians(60), point.y);
		//const dateLabelPath = getArcPath(radians(240), radians(120), point.y);

		const textPath = `<textPath startOffset="50%" href="#dateLabelPath">${this.formatLabel('year',this.displayDate)}</textPath>`;

		const svg =
			`<g class="group-label dateLabel">
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



	/* getHoleHand
	Test of a more configurable hand shape
	*/
	getHoleHand = function(param, transform, cssClass, id)
	/* getHand2 = function() */
	{
		//const length = 900;
		const tail = 150;
		const width = 30;

		const tipRadius = 30;

		const circle = param.circleCenter;
		const circleRadius = 130;
		const circleInnerRadius = 100;
		const circleX = circleRadius * (5/13);
		const circleY = circleRadius * (12/13);

		const discRadius = 50;
		const discX = discRadius * (5/13);
		const discY = discRadius * (12/13);
		/* Need to use a better pythagorean triad or do the trig properly */

		/*
			M -${tipRadius}, -${param.length}
			A ${tipRadius},${tipRadius} 0 1 1 ${tipRadius}, -${param.length}
		*/

		const path = `


			M 0 -${circle+circleRadius}
			A ${circleRadius},${circleRadius} 0 0 1 ${circleX} -${circle-circleY}


			L ${discX} -${discY}
			A ${discRadius},${discRadius} 0 0 1 ${discX}, ${discY}

			L ${width} ${tail}
			L -${width} ${tail}

			L -${discX} ${discY}
			A ${discRadius},${discRadius} 0 0 1 -${discX}, -${discY}

			L ${-circleX} -${circle-circleY}
			A ${circleRadius},${circleRadius} 0 0 1 0, -${circle+circleRadius}

			Z

			M 0 ${-circle-circleInnerRadius}
			A ${circleInnerRadius},${circleInnerRadius} 0 0 1 0 ${-circle+circleInnerRadius}
			A ${circleInnerRadius},${circleInnerRadius} 0 0 1 0 ${-circle-circleInnerRadius}
			Z
			`;
		/* const svg = `<path class="hand2" d="${path}" />`; */
		const svg = `
			<g id="${id}" class="${cssClass}" transform="${transform}">
				<defs>
					<radialGradient id="lensGradient">
						<stop offset="80%" stop-color="#ff02" />
						<stop offset="90%" stop-color="#ff99" />
						<stop offset="100%" stop-color="white" />
					</radialGradient>
				</defs>

				<circle class="hand2 lens" cx="0" cy="${-circle}" r="${circleInnerRadius}"/>
				<path class="hand2" d="${path}"/>
			</g>
		`;
		return svg;
	}/* getHoleHand */


	getIcon = function() {
		const path =
			`<path class="group-label favicon" d="M 259 966 L -707 -707 L 966 259 L -966 259 L 707 -707 L -259 966 L -259 -966 L 707 707 L -966 -259 L 966 -259 L -707 707 L 259 -966 Z"><title>vintage clock by ldpercy</title></path>`;
			//'<path class="label favicon" d="M 259 966 L -966 -259 L 707 -707 M -259 966 L -707 -707 L 966 -259 M -707 707 L -259 -966 L 966 259 M -966 259 L 259 -966 L 707 707  Z"></path>';
		return path;
	}

	getPin = function() {
		return `<circle class="pin" x="0" y="0" r="10"/>`
	}


}/* vintage */