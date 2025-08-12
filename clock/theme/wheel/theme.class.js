/* Wheel
*/
themeClass['wheel'] = class extends ThemeBase {

	viewBox           = padViewBox(30);
	clockRadius       = 1200;
	// outerRadius       = 1150;
	// innerRadius       = 950;

	monthSector = {
		outerRadius       : 1150,
		innerRadius       : 950,
	};

	daySector = {
		outerRadius       : 850,
		innerRadius       : 650,
	};


	monthLabel = {
		radius         : 1075,
		sectorPosition : 0.5,
		rotate         : true,
		invert         : false,
	}


	dayName = {
		radius         : 700,
		sectorPosition : 0.5,
		rotate         : true,
		invert         : false,
	};


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

	dateLabel   = { position : new Point( 0, 0) };


	/* getThemeSVG
	*/
	getThemeSVG = function(displayDate)
	{
		addDateRangeRadians(displayDate.monthArray, displayDate.yearRange);
		displayDate.yearDayArray = getPeriodDayArray(displayDate.yearStart, displayDate.yearEnd, displayDate.object);
		addRadians(displayDate.yearDayArray);

		displayDate.monthDayArray = getPeriodDayArray(startOfMonth(displayDate.object), nextMonth(displayDate.object), displayDate.object, displayDate.language);
		addRadians(displayDate.monthDayArray);

		const yearDayDivision = divisionDegrees(displayDate.daysInYear, displayDate.dayOfYear-1);
		const yearTransform = `rotate(${-yearDayDivision.middle},0,0)`;

		const monthDayDivision = divisionDegrees(displayDate.daysInMonth, displayDate.date-1);
		const monthTransform = `rotate(${-monthDayDivision.middle},0,0)`;

		const themeSVG = `

			<defs>
				<clipPath id="sectorLabels">
					${this.getSectorLabelsCurved('month', displayDate.monthArray, this.monthLabel)}
				</clipPath>

			</defs>


			<g transform="${yearTransform}">
				${this.getFace(this.clockRadius)}
				${this.getSectors('month', displayDate.monthArray, this.monthSector.outerRadius, this.monthSector.innerRadius)}

				${this.getSectorLabelsCurved('monthName', displayDate.monthArray, this.monthLabel)}

			</g>

			<g transform="${monthTransform}">
				${this.getPeriodDaySectors('day', displayDate.monthDayArray, this.daySector.innerRadius, this.daySector.outerRadius)}
				${this.getSectorLabels('dayNumber', displayDate.monthDayArray, this.dayName)}
			</g>


			${this.getDateLabel('year', displayDate, this.dateLabel)}
		`;

		return themeSVG;
	}/* getThemeSVG */



	getMonthSectors = function() {


	}/* getMonthSectors */


}/* Plain SVG */