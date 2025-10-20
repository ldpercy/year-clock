/* Wheel
*/
yearclock.theme['space'] = class extends yearclock.theme.Base {

	viewBox           = this.svg.padViewBox(50, '-1600 -1200 3200 2400');
	clockRadius       = 1200;
	// outerRadius       = 1150;
	// innerRadius       = 950;

	monthRing = {
		name    : 'yearMonth',
		array   : undefined, // this.displayDate.monthArray,
		sector : new Annulus(1200, 900, new Point(), { simpleOuter:true}),
		label : [{
			radius         : 1025,
			sectorPosition : 0.5,
			rotate         : false,
			invert         : false,
			textType       : 'text',
			format         : 'romanNumeralMonth',
		}]
	};

	dayRing = {
		name    : 'monthDay',
		array   : undefined, // this.displayDate.monthDayArray,
		sector : new Annulus(800, 600),
		label : [{
			radius         : 700,
			sectorPosition : 0.5,
			rotate         : false,
			invert         : false,
			textType       : 'text',
			format         : 'romanNumeralDay',
		}]
	};

	dateLabel   = {
		position : new Point( 0, 0),
		format   : 'romanNumeralYear',
	};



	constructor(clockParameter)
	{
		super(clockParameter);
		this.setDisplayDate(this.parameter.date);
	}


	setDisplayDate(date) {
		this.displayDate = new yearclock.DisplayDate(date, this.parameter.language);

		addDateRangeRadians(this.displayDate.monthArray, this.displayDate.yearRange);
		this.displayDate.yearDayArray = this.getPeriodDayArray(this.displayDate.yearStart, this.displayDate.yearEnd, this.displayDate);
		addRadians(this.displayDate.yearDayArray);

		this.displayDate.monthDayArray = this.getPeriodDayArray(yearclock.Date.startOfMonth(this.displayDate), yearclock.Date.nextMonth(this.displayDate), this.displayDate, this.displayDate.language);
		addRadians(this.displayDate.monthDayArray);

		this.monthRing.array = this.displayDate.monthArray;
		this.dayRing.array   = this.displayDate.monthDayArray;
	}




	/* getThemeSVG
	*/
	getThemeSVG = function()
	{

		const yearDayDivision = divisionDegrees(this.displayDate.daysInYear, this.displayDate.dayOfYear-1);
		const yearTransform = `rotate(${-90-yearDayDivision.middle},0,0)`;

		const monthDayDivision = divisionDegrees(this.displayDate.daysInMonth, this.displayDate.date-1);
		const monthTransform = `rotate(${-90-monthDayDivision.middle},0,0)`;

		// ${this.getSectors('month', this.displayDate.monthArray, this.monthSector.outerRadius, this.monthSector.innerRadius)}

		//log(this.displayDate);

		const moonRadians = this.displayDate.monthDayArray[0].radians.middle;
		const moonPosition = new PolarPoint(moonRadians, this.dayRing.label.radius).toPoint();

		const themeSVG = `

			<defs>
				${this.getFilters()}
			</defs>

			<!-- ${this.getFace(this.clockRadius)} -->

			${this.getDateLabel('year', this.dateLabel)}

			<g class="monthRing">
				<g transform="${yearTransform}">
					${this.getSectorsWithKnockout('yearMonth', this.displayDate.monthArray, this.monthRing)}
				</g>
			</g>

			<g class="dayRing">
				<g transform="${monthTransform}">

					${this.getSectorsWithKnockout('monthDay', this.displayDate.monthDayArray, this.dayRing)}

				</g>
			</g>

		`;

		/*
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
						<!--
						<rect class="knockout-shapeContaining" x="-500" y="-500" width="1000" height="1000" />
						-->
						<circle cx="0" cy="0" r="500" class="knockout-shapeContaining"/>

						<text x="${setting.position.x}" y="${setting.position.y}" class="knockout-shapeKnockedout dateLabel ${labelName}">${this.formatLabel(labelFormat, this.displayDate)}</text>
					</mask>
				</defs>

				<g style="mask:url(#knockout-dateLabel-${labelName})">
					<circle cx="0" cy="0" r="500" class="star yearLabel"/>
					<!--
					<text x="${setting.position.x}" y="${setting.position.y}" class="label dateLabel ${labelName}" ${(setting.attribute || '')}>asdf ${this.formatLabel(labelFormat, this.displayDate)}</text>
					-->
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


}/* YearClock.space */
