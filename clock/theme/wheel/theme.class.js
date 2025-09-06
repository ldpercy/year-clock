/* Wheel
*/
themeClass['wheel'] = class extends ThemeBase {

	viewBox           = padViewBox(50, '-1600 -1200 3200 2400');
	clockRadius       = 1200;
	// outerRadius       = 1150;
	// innerRadius       = 950;

	ringSpace = 50;

	monthRing = {
		name    : 'yearMonth',
		array   : undefined, // this.displayDate.monthArray,
		sector : new Annulus(800-this.ringSpace, 400+this.ringSpace, new Point()),
		polarDelta : new PolarPoint(-.005, 0),
		label : {
			radius         : 600,
			sectorPosition : 0.5,
			rotate         : true,
			invert         : false,
			textType       : 'text',
			format         : 'monthNumber',
		}
	};

	dayRing = {
		name    : 'monthDay',
		array   : undefined, // this.displayDate.monthDayArray,
		sector : new Annulus(1200-this.ringSpace, 800+this.ringSpace),
		polarDelta : new PolarPoint(-.005, 0),
		label : {
			radius         : 1000,
			sectorPosition : 0.5,
			rotate         : true,
			invert         : false,
			textType       : 'text',
			format         : 'dayNumber',
		}
	};

	dateLabel   = {
		position : new Point( 0, 0),
		format   : 'year',
		radius   : 400 - this.ringSpace,
	};


	constructor(clockParameter)
	{
		super(clockParameter);
		this.monthRing.array = this.displayDate.monthArray;
		this.dayRing.array   = this.displayDate.monthDayArray;
	}


	/* getThemeSVG
	*/
	getThemeSVG = function()
	{
		addDateRangeRadians(this.displayDate.monthArray, this.displayDate.yearRange);
		this.displayDate.yearDayArray = getPeriodDayArray(this.displayDate.yearStart, this.displayDate.yearEnd, this.displayDate.object);
		addRadians(this.displayDate.yearDayArray);

		this.displayDate.monthDayArray = getPeriodDayArray(startOfMonth(this.displayDate.object), nextMonth(this.displayDate.object), this.displayDate.object, this.displayDate.language);
		addRadians(this.displayDate.monthDayArray);

		const yearDayDivision = divisionDegrees(this.displayDate.daysInYear, this.displayDate.dayOfYear-1);
		const yearTransform = `rotate(${-yearDayDivision.middle},0,0)`;

		const monthDayDivision = divisionDegrees(this.displayDate.daysInMonth, this.displayDate.date-1);
		const monthTransform = `rotate(${-monthDayDivision.middle},0,0)`;

		// ${this.getSectors('month', this.displayDate.monthArray, this.monthSector.outerRadius, this.monthSector.innerRadius)}

		//log(this.displayDate);

		const moonRadians = this.displayDate.monthDayArray[0].radians.middle;
		const moonPosition = new PolarPoint(moonRadians, this.dayRing.label.radius).toPoint();



		const themeSVG = `

			<defs>
				${this.getFilters()}
			</defs>

			${this.getFace(this.clockRadius)}

			<g transform="${yearTransform}">
				<g class="monthRing">
					${this.getSectorsWithKnockout('yearMonth', this.displayDate.monthArray, this.monthRing)}
				</g>
				<g class="dayRing">
					${this.getSectorsWithKnockout('monthDay', this.displayDate.monthDayArray, this.dayRing)}
				</g>
				${this.getDateLabel('year', this.dateLabel)}
			</g>

		`;

		/*
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
						<circle cx="0" cy="0" r="${setting.radius}" class="knockout-shapeContaining"/>
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






	getFilters = function() {
		const result = `
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
	}/* getFilters */


}/* Plain SVG */
