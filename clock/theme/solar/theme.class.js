/* Solar
*/
themeClass['solar'] = class extends ThemeBase {

	viewBox           = padViewBox(50, '-2500 -1200 5000 2800');

	monthRing = {
		name    : 'yearMonth',
		array   : undefined, // this.displayDate.monthArray,
		sector  : new Annulus(1150,950),
		label   : {
			radius         : 1050,
			sectorPosition : 0.5,
			rotate         : true,
			invert         : 'all',
			format         : 'monthNumber',
		}
	};

	dayRing = {
		name    : 'monthDay',
		array   : undefined, // this.displayDate.monthDayArray,
		sector : new Annulus(850, 650),
		label : {
			radius         : 500,
			sectorPosition : 0.5,
			rotate         : true,
			invert         : 'all',
			format         : 'dayNumber',
		}
	};

	dateLabel   = { position : new Point( 0, 0) };

	/*
	outerRadius       = 1150;
	innerRadius       = 950;
	weekdayMarkerLength = 42;
	weekendMarkerLength = 57;

	tick = {
		weekdayStart    : this.innerRadius,
		weekdayEnd      : this.innerRadius + this.weekdayMarkerLength,
		weekendStart    : this.innerRadius,
		weekendEnd      : this.innerRadius + this.weekendMarkerLength,
		monthFirstStart : this.innerRadius,
		monthFirstEnd   : this.outerRadius,
	};
	*/

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
		const yearTransform = `rotate(${180-yearDayDivision.middle},0,0)`;

		const monthDayDivision = divisionDegrees(this.displayDate.daysInMonth, this.displayDate.date-1);
		const monthTransform = `rotate(${180-monthDayDivision.middle},0,0)`;

		// ${this.getSectors('month', this.displayDate.monthArray, this.monthRing.outerRadius, this.monthRing.innerRadius)}

		//log(this.displayDate);

		const moonRadians = this.displayDate.monthDayArray[0].radians.middle;
		const moonPosition = new PolarPoint(moonRadians, this.dayRing.label.radius).toPoint();

		/* ${this.getSectorsWithKnockout('month', this.displayDate.monthArray, this.monthRing)} */

		const themeSVG = `

			<g transform=" scale(2,1) translate(0,1000) ${monthTransform}">

				<circle class="month-first" cx="${moonPosition.x}" cy="${moonPosition.y}" r="100"/>

				${this.getSectors('monthDay', this.displayDate.monthDayArray, this.dayRing.sector)}

				${this.getSectorLabels('dayNumber', this.displayDate.monthDayArray, this.dayRing.label)}
			</g>
			<g transform="scale(2,1) ${yearTransform} ">

				${this.getSun('year', this.dateLabel)}

				${this.getSectors('yearMonth', this.displayDate.monthArray, this.monthRing.sector)}
				${this.getSectorLabelsCurved('yearMonth', this.displayDate.monthArray, this.monthRing.label)}

			</g>

		`;

		/*
			${this.getSectorLabels('dayNumber', this.displayDate.monthDayArray, this.dayName)}
		*/

		return themeSVG;
	}/* getThemeSVG */



	getSun = function(labelType, setting) {

		const svg =
			`<g class="sun">

				<defs>
					<mask id="knockout-dateLabel-${labelType}" class="knockout-mask">
						<!--
						<rect class="knockout-shapeContaining" x="-500" y="-500" width="1000" height="1000" />
						-->
						<circle cx="0" cy="0" r="400" class="knockout-shapeContaining"/>

						<text x="${setting.position.x}" y="${setting.position.y}" class="knockout-shapeKnockedout dateLabel ${labelType}"> ${this.formatLabel(labelType, this.displayDate)}</text>
					</mask>
				</defs>

				<path class="diffractionSpike" d="
					M 50,-50 L 950,0
					L 50,50 L 0,950
					L -50,50 L -950,0
					L -50,-50 L 0,-950
				"/>

				<g > <!-- style="mask:url(#knockout-dateLabel-${labelType})" -->
					<circle class="sun"/>
					<text x="${setting.position.x}" y="${setting.position.y}" class="dateLabel ${labelType}">${this.formatLabel(labelType, this.displayDate)}</text>
				</g>
			</g>`;

			/*
			 class="label dateLabel ${labelType}" ${(setting.attribute || '')}"
			*/

		return svg;

	}/* getSun */






}/* Plain SVG */
