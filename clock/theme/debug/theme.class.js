/* debug
Debug theme - use for fixing bugs
*/
themeClass['debug'] = class extends ThemeBase {

	constructor(id, date, language) {
		super();
		this.id = id;
		this.date = date;
		this.language = language;
	}


	viewBox           = padViewBox(10);
	clockRadius       = 1200;
	weekRadiusStart = 400;
	weekRadiusEnd   = 800;

	weekLabel = {
		radius         : 600,
		sectorPosition : 0.5,
		rotate         : 'radial-left',
		invert         : false,
	};

	dayRadiusStart      = 800;
	dayRadiusEnd        = 1200;

	dayLabel = {
		radius         : 1000,
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
		displayDate.yearDayArray = getPeriodDayArray(displayDate.yearStart, displayDate.yearEnd, displayDate.object);


		displayDate.yearDayArray.forEach(
			(day) => {day.radians = divisionRadians(displayDate.yearDayArray.length, day.dayOfPeriod);}
		);
		//log(displayDate.yearDayArray);

		//addRadians(displayDate.yearDayArray);
		//log(displayDate.yearDayArray);

		let weekArray    = getYearWeekArray(displayDate.object);

		const clockSVG = `
			<svg id="clock" class="yearclock" viewBox="${this.viewBox}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
				${this.getFace(this.clockRadius)}
				${this.getSectorLabels('week', weekArray, this.weekLabel)}
				${this.getSectors('week', weekArray, this.weekRadiusStart, this.weekRadiusEnd)}
				${this.getSectorLabels('yearDay', displayDate.yearDayArray, this.dayLabel)}
				${this.getPeriodDaySectors('yearDay', displayDate.yearDayArray, this.dayRadiusStart, this.dayRadiusEnd)}
			</svg>
		`;

		return clockSVG;
	}/* getClockSVG */


}/* themeClass.Debug */