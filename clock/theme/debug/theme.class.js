/* debug
Debug theme - use for fixing bugs
*/
themeClass['debug'] = class extends ThemeBase {


	viewBox           = padViewBox(50);
	clockRadius       = 1200;

	monthRadiusStart = 400;
	monthRadiusEnd = 800;

	weekRadiusStart = 400;
	weekRadiusEnd   = 900;

	weekLabel = {
		radius         : 600,
		sectorPosition : 0.5,
		rotate         : 'radial-left',
		invert         : false,
	};

	dayRadiusStart      = 700;
	dayRadiusEnd        = 1200;

	dayLabel = {
		radius         : 1000,
		sectorPosition : 0.5,
		rotate         : 'radial-left',
		invert         : false,
	};
	dateLabelPosition         = new Point(0,0);

	//
	// formatting functions
	//
	formatTitle = function(type, data) {
		let result;
		switch(type) {
			case 'quarter': result = `${data.name}`; break;
			case 'week'   : result = `Week ${data.name}: ${isoDate(data.dateStart)} - ${isoDate(data.dateEnd)}`; break;
			case 'hands'    : result = `${isoDate(data.date.object)} - ${data.date.name} - d${data.date.dayOfYear}`; break;
			case 'date'     : result = `${isoDate(data.date)}` ; break;
			default       : result = data.name; break;
		}

		return result;
	}


	/* getThemeSVG
	*/
	getThemeSVG = function(displayDate)
	{
		// Set Up Drawing
		addDateRangeRadians(displayDate.monthArray, displayDate.yearRange);

		//log(displayDate.monthArray);

		displayDate.yearDayArray = getPeriodDayArray(displayDate.yearStart, displayDate.yearEnd, displayDate.object);
		addRadians(displayDate.yearDayArray);

		//displayDate.monthDayArray = getPeriodDayArray(startOfMonth(displayDate.object), nextMonth(displayDate.object), displayDate.object, displayDate.language);
		//addRadians(displayDate.monthDayArray, this.dial.radiansStart, this.dial.radiansLength);

		/*
		let weekArray    = getYearWeekArray(displayDate.object);
		${this.getSectorLabels('week', weekArray, this.weekLabel)}
		${this.getSectors('week', weekArray, this.weekRadiusStart, this.weekRadiusEnd)}
 		*/


		const themeSVG = `
			${this.getFace(this.clockRadius)}
			${this.getSectors('month', displayDate.monthArray, this.monthRadiusStart, this.monthRadiusEnd)}
			${this.getSectorLabels('yearDay', displayDate.yearDayArray, this.dayLabel)}
			${this.getPeriodDaySectors('yearDay', displayDate.yearDayArray, this.dayRadiusStart, this.dayRadiusEnd)}
			${this.getDateLabel(displayDate.object, this.dateLabelPosition)}
		`;

		return themeSVG;
	}/* getThemeSVG */


}/* themeClass.Debug */