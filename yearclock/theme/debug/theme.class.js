/* themeClass.Debug
*/
themeClass.Debug = class extends ThemeBase {

	constructor(id) {
		this.id = id;
	}


	viewBox           = padViewBox(10);

	weekRadiusStart = 400;
	weekRadiusEnd   = 1100;

	weekLabel = {
		radius         : 800,
		sectorPosition : 0.5,
		rotate         : 'radial-left',
		invert         : false,
	};

	dayRadiusStart      = 1100;
	dayRadiusEnd        = 1200;

	dayLabel = {
		radius         : 1150,
		sectorPosition : 0.5,
		rotate         : 'radial-left',
		invert         : false,
	};


	//
	// formatting functions
	//
	formatTitle = function(type, data) {
		let result;
		switch(type) {
			case 'quarter': result = `${data.name}`; break;
			case 'week'   : result = `Week ${data.name}: ${isoDate(data.dateStart)} - ${isoDate(data.dateEnd)}`; break;
			case 'hands'    : result = `${isoDate(data.date.object)} - ${data.date.name} - d${data.date.dayOfYear}`; break;
			default       : result = data.name; break;
		}

		return result;
	}


	/* getClockSVG
	*/
	getClockSVG = function(displayDate)
	{
		// Set Up Drawing
		let weekArray    = getYearWeekArray(displayDate.object);

		const clockSVG = `
			<svg id="clock" class="yearclock" viewBox="${theme.clock.viewBox}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
				${theme.clock.getFace()}
				${theme.clock.getSectorLabels('week', weekArray, theme.clock.weekLabel)}
				${theme.clock.getSectors('week', weekArray, theme.clock.weekRadiusStart, theme.clock.weekRadiusEnd)}
				${theme.clock.getSectorLabels('yearDay', displayDate.yearDayArray, theme.clock.dayLabel)}
				${theme.clock.getPeriodDaySectors('yearDay', displayDate.yearDayArray, theme.clock.dayRadiusStart, theme.clock.dayRadiusEnd)}
			</svg>
		`;

		return clockSVG;
	}/* getClockSVG */


}/* themeClass.Debug */