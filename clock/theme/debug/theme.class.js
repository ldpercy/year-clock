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

	dateLabel = {
		position   : new Point(-1200,-1200)
	};

	monthSymbols = {
		radius         : 600,
		position       : 0.5,
		rotate         : false,
		invert         : false,
		elementId      : 'star-g',
		/*
		width          : 50,
		height         : 50,
 		*/
		width          : 100,
		height         : 100,
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
			case 'date'     : result = `${isoDate(data.object)}` ; break;
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

			<defs>
				<!-- class="label favicon"
				width="100" height="100"
				refX="-1000" refY="-1000"
				-->
				<symbol id="star-symbol" viewBox="-1000 -1000 2000 2000" >
					<rect x="-1000" y="-1000" width="2000" height="2000"/>
					<path d="M 259 966 L -707 -707 L 966 259 L -966 259 L 707 -707 L -259 966 L -259 -966 L 707 707 L -966 -259 L 966 -259 L -707 707 L 259 -966  Z"/>
				</symbol>

				<g id="star-g">
					<path class="path-star" d="M 259 966 L -707 -707 L 966 259 L -966 259 L 707 -707 L -259 966 L -259 -966 L 707 707 L -966 -259 L 966 -259 L -707 707 L 259 -966  Z"/>
				</g>

				<path id="star" d="M 259 966 L -707 -707 L 966 259 L -966 259 L 707 -707 L -259 966 L -259 -966 L 707 707 L -966 -259 L 966 -259 L -707 707 L 259 -966  Z"/>



				<circle id="circle" cx="0" cy="0" r="20"/>
				<rect id="rect" x="-10" y="0" width="20" height="80"/>

				<symbol id="symbol" width="20" height="100" viewBox="-10 0 20 100" refX="0" refY="0">
					<rect x="-10" y="0" width="20" height="100"/>
				</symbol>

				<path id="wedge" d="M 0,0 L 20 80 L -20 80 Z"/>

			</defs>

			${this.getFace(this.clockRadius)}
			${this.getSectors('month', displayDate.monthArray, this.monthRadiusStart, this.monthRadiusEnd)}

			${this.getSymbols('monthSymbols', displayDate.monthArray, this.monthSymbols)}

			${this.getSectorLabels('yearDay', displayDate.yearDayArray, this.dayLabel)}
			${this.getPeriodDaySectors('yearDay', displayDate.yearDayArray, this.dayRadiusStart, this.dayRadiusEnd)}
			${this.getDateLabel('date', displayDate, this.dateLabel)}
		`;

		return themeSVG;
	}/* getThemeSVG */


}/* themeClass.Debug */