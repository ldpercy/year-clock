/* Solar
*/
yearclock.theme['solar'] = class extends yearclock.theme.Base {

	viewBox           = this.svg.padViewBox(50, '-2500 -1200 5000 2800');

	monthRing = {
		name    : 'yearMonth',
		array   : undefined, // this.displayDate.monthArray,
		sector  : new Annulus(1150,950),
		sectorType: 'knockout',
		label   : [{
			name           : 'yearMonth',
			radius         : 1050,
			textType       : 'textPath', //
			sectorPosition : 0.5,
			rotate         : true,
			invert         : 'all',
			format         : 'monthName',
		}]
	};

	dayRing = {
		name    : 'monthDay',
		array   : undefined, // this.displayDate.monthDayArray,
		sector : new Annulus(850, 650),
		label : [{
			name           : 'monthDay',
			radius         : 500,
			textType       : 'textPath',
			sectorPosition : 0.5,
			rotate         : true,
			invert         : 'all',
			format         : 'dayNumber',
		}]
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
		this.setDisplayDate(this.parameter.date);
	}


	setDisplayDate(date) {
		this.displayDate = new yearclock.DisplayDate(date, this.parameter.language);

		yearclock.Geometry.addDateRangeAngularRange(this.displayDate.monthArray, this.displayDate.yearRange);
		//this.displayDate.yearDayArray = this.getPeriodDayArray(this.displayDate.yearStart, this.displayDate.yearEnd, this.displayDate);

		this.displayDate.monthDays = new yearclock.Date.DayRange(this.displayDate.monthStart, this.displayDate.monthEnd, this.displayDate, this.displayDate.language);
		this.displayDate.monthDays.setAngularRange();

		this.monthRing.array = this.displayDate.monthArray;
		this.dayRing.array   = this.displayDate.monthDays.array;
	}


	/* getThemeSVG
	*/
	getThemeSVG = function()
	{


		const yearDayDivision = yearclock.Geometry.divisionDegrees(this.displayDate.daysInYear, this.displayDate.dayOfYear-1);
		const yearTransform = `rotate(${180-yearDayDivision.middle},0,0)`;

		const monthDayDivision = yearclock.Geometry.divisionDegrees(this.displayDate.daysInMonth, this.displayDate.date-1);
		const monthTransform = `rotate(${180-monthDayDivision.middle},0,0)`;

		// ${this.getSectors('month', this.displayDate.monthArray, this.monthRing.outerRadius, this.monthRing.innerRadius)}

		//console.debug(this.displayDate);

		const moonRadians = this.displayDate.monthDays.array[0].angularRange.middle.radians;
		const moonPosition = new PolarPoint(moonRadians, this.dayRing.label[0].radius).toPoint();

		/* ${this.getSectorsWithKnockout('month', this.displayDate.monthArray, this.monthRing)} */

		const themeSVG = `

			<g transform=" scale(2,1) translate(0,1000) ${monthTransform}">

				<circle class="month-first" cx="${moonPosition.x}" cy="${moonPosition.y}" r="100"/>

				${this.getRing(this.dayRing)}
			</g>

			<g transform="scale(2,1) ${yearTransform} ">
				${this.getSun('year', this.dateLabel)}
				${this.getRing(this.monthRing)}
			</g>
		`;

		/*
			${this.getSectors('monthDay', this.displayDate.monthDayArray, this.dayRing.sector)}
			${this.getSectorLabels('dayNumber', this.displayDate.monthDayArray, this.dayRing.label)}

			${this.getSectors('yearMonth', this.displayDate.monthArray, this.monthRing.sector)}
			${this.getSectorLabelsCurved('yearMonth', this.displayDate.monthArray, this.monthRing.label)}
			${this.getRing(this.dayRing)}
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




}/* YearClock.solar */
