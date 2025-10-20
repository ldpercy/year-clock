/* Wheel
*/
yearclock.theme['wheel'] = class extends yearclock.theme.Base {

	viewBox           = padViewBox(50, '-1600 -1200 3200 2400');
	clockRadius       = 1200;
	// outerRadius       = 1150;
	// innerRadius       = 950;

	ringSpace = 50;

	monthRing = {
		name    : 'yearMonth',
		array   : undefined, // this.displayDate.monthArray,
		sector  : new Annulus(800, 400),
		sectorType: 'knockout',
		sizeAdjust : new Point(-25, -this.ringSpace),
		maskExpand : new Point(100,100),
		label : [
			{
				name           : 'monthNumber',
				radius         : 630,
				sectorPosition : 0.5,
				rotate         : true,
				invert         : false,
				textType       : 'text',
				format         : 'monthNumber',
			},
			{
				name           : 'monthShort',
				radius         : 520,
				sectorPosition : 0.5,
				rotate         : true,
				invert         : false,
				textType       : 'text',
				format         : 'monthShort',
			}
		]
	};

	dayRing = {
		name    : 'monthDay',
		array   : undefined, // this.displayDate.monthDayArray,
		sector : new Annulus(1200, 800),
		sectorType: 'knockout',
		sizeAdjust :  new Point(-25, -this.ringSpace),
		maskExpand : new Point(100,100),
		label : [
			{
				name           : 'dayNumber',
				radius         : 1040,
				sectorPosition : 0.5,
				rotate         : true,
				invert         : false,
				textType       : 'text',
				format         : 'dayNumber',
			},
			{
				name           : 'dayShort',
				radius         : 940,
				sectorPosition : 0.5,
				rotate         : true,
				invert         : false,
				textType       : 'text',
				format         : 'dayShort',
			}
		]
	};

	dateLabel   = {
		position : new Point( 0, 0),
		format   : 'year',
		radius   : 400 - this.ringSpace,
		maskExpand : 100,
	};


	constructor(clockParameter)
	{
		super(clockParameter);
		this.setDisplayDate(this.parameter.date);
	}


	setDisplayDate(date) {
		this.displayDate = this.createDisplayDate(date, this.parameter.language);

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
		const yearDayDivision = divisionDegrees(this.displayDate.daysInYear, this.displayDate.dayOfYear-1);
		const yearTransform = `rotate(${-yearDayDivision.middle},0,0)`;

		//const monthDayDivision = divisionDegrees(this.displayDate.daysInMonth, this.displayDate.date-1);
		//const monthTransform = `rotate(${-monthDayDivision.middle},0,0)`;

		const themeSVG = `
			<defs>
				${this.getDefs()}
			</defs>

			<g class="clock">
				${this.getFace(this.clockRadius)}

				<g transform="${yearTransform}">
					${this.getRing(this.monthRing)}
					${this.getRing(this.dayRing)}
					${this.getDateLabel('year', this.dateLabel)}
				</g>
			</g>
		`;

		/*
			<g class="monthRing">
				${this.getSectorsWithKnockout('yearMonth', this.displayDate.monthArray, this.monthRing)}
			</g>


			${this.getSectorLabels('monthDay', this.displayDate.monthDayArray, this.dayRing.label)}
			${this.getSectorsWithKnockout('dayNumber', this.displayDate.monthDayArray, this.daySector)}
			${this.getSectorLabels('dayNumber', this.displayDate.monthDayArray, this.dayName)}
		*/

		return themeSVG;
	}/* getThemeSVG */



	getDateLabel = function(labelName, setting) {

		const labelFormat = setting.format || labelName;

		const svg =
			`<g class="dateLabel" >

				<defs>
					<mask id="knockout-dateLabel-${labelName}" class="knockout-mask">
						<circle cx="0" cy="0" r="${setting.radius+setting.maskExpand}" class="knockout-shapeContaining"/>
						<text x="${setting.position.x}" y="${setting.position.y}" class="knockout-shapeKnockedout dateLabel ${labelName}">${this.formatLabel(labelFormat, this.displayDate)}</text>
					</mask>
				</defs>

				<g style="mask:url(#knockout-dateLabel-${labelName})">
					<circle cx="0" cy="0" r="${setting.radius}" class="yearLabel"/>
				</g>
			</g>`;

			/*
			 class="label dateLabel ${labelName}" ${(setting.attribute || '')}"
			*/

		return svg;

	}/* getDateLabel */






	getDefs = function() {
		const result = `

			<linearGradient id="gradient-stroke-linear" y1="0%" y2="100%" x1="0%" x2="0%">
				<stop offset="0%" stop-color="#999a" stop-opacity="50%"/>
				<stop offset="100%" stop-color="#f00a" stop-opacity="50%"/>
			</linearGradient>

			<radialGradient id="gradient-stroke-radial" y1="0%" y2="100%" x1="0%" x2="0%">
				<stop offset="0%" stop-color="#000a" stop-opacity="50%"/>
				<stop offset="50%" stop-color="#fffa" stop-opacity="50%"/>
				<stop offset="100%" stop-color="#fffa" stop-opacity="50%"/>
			</radialGradient>

			<filter
				id="f143"
				x="-0.25"
				width="1.5"
				y="-0.25"
				height="1.5"
				inkscape:menu="Non realistic 3D shaders"
				inkscape:menu-tooltip="Non realistic frosted glass imitation"
				inkscape:label="Frosted glass"
				style="color-interpolation-filters:sRGB">
				<feGaussianBlur
					result="result8"
					stdDeviation="7"
					id="feGaussianBlur20429" />
				<feComposite
					in="result8"
					operator="xor"
					result="result6"
					in2="result8"
					id="feComposite20431" />
				<feDisplacementMap
					result="result4"
					scale="75"
					yChannelSelector="A"
					xChannelSelector="A"
					in2="result6"
					in="result6"
					id="feDisplacementMap20433" />
				<feComposite
					k1="2"
					in="SourceGraphic"
					operator="arithmetic"
					result="result2"
					in2="result4"
					id="feComposite20435"
					k2="0"
					k3="0"
					k4="0" />
				<feComposite
					in2="result2"
					operator="in"
					in="result6"
					result="fbSourceGraphic"
					id="feComposite20437" />
			</filter>
		`;

		return result;
	}/* getDefs */


}/* YearClock.wheel */
