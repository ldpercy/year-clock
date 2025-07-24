/* season-out
Seasons in the middle then months then days
*/
themeClass['season-out'] = class extends ThemeBase {

	viewBox           = padViewBox(75);
	//viewBox				= '-800 -800 1600 1600';
	clockRadius        = 1250;


	seasonRadiusStart = 0;
	seasonRadiusEnd   = 450;
	monthRadiusStart  = 350;
	monthRadiusEnd    = 850;
	dayRadiusStart    = 750;
	dayRadiusEnd      = 1200;


	dateLabelRadius     = 575;
	dateLabelPosition   = new Point(10, this.dateLabelRadius);  // tiny tweak to horizontal position here, having trouble centering it properly
	yearLabelPosition   = new Point(0, -this.dateLabelRadius);

	monthLabel = {
		radius         : 1000,
		sectorPosition : 0.5,
		rotate         : false,
		invert         : false,
	};

	handConfig = {
		year : { length : 800 },
	};

	//
	// formatting functions
	//

	formatLabel = function(labelType, data) {
		let result;
		switch(labelType) {
			case 'month'    : result = `${data.name.slice(0,3)}`; break;
			case 'date'     : result = `${(data.date.getMonth()+1).toString().padStart(2,'0')}-${data.date.getDate().toString().padStart(2,'0')}`; break;
			case 'year'     : result = `${data.date.getFullYear()}`; break;
			default         : result = data.name; break;
		}
		return result;
	}

	formatTitle = function(type, data) {
		let result;
		switch(type) {
			case 'yearDay'  : result = `${data.name} ${data.dayOfYear}`; break;
			case 'quarter'  : result = `${data.name}`; break;
			case 'week'     : result = `W${data.name}: ${isoDate(sector.dateStart)} - ${isoDate(sector.dateEnd)}`; break;
			case 'day'      : result = `${data.isoShort} - ${data.name} - d${data.dayOfYear}`; break;
			case 'hands'    : result = `${isoDate(data.date.object)} - ${data.date.name} - d${data.date.dayOfYear}`; break;
			default         : result = data.name; break;
		}
		return result;
	}



	/* getThemeSVG
	*/
	getThemeSVG = function(displayDate)
	{
		addDateRangeRadians(displayDate.monthArray);
		displayDate.yearDayArray = getPeriodDayArray(displayDate.yearStart, displayDate.yearEnd, displayDate.object);
		addRadians(displayDate.yearDayArray);
		displayDate.seasonArray  = getSeasonArray(displayDate.object);

		const themeSVG = `
			${this.getFace(this.clockRadius)}
			${this.getSectors('season', displayDate.seasonArray, this.seasonRadiusStart, this.seasonRadiusEnd)}
			${this.getSectors('month', displayDate.monthArray, this.monthRadiusStart, this.monthRadiusEnd)}
			${this.getPeriodDaySectors('yearDay', displayDate.yearDayArray, this.dayRadiusStart, this.dayRadiusEnd)}
			${this.getSectorLabels('month', displayDate.monthArray, this.monthLabel)}
			${this.getYearLabel(displayDate.object, this.yearLabelPosition)}
			${this.getDateLabel(displayDate.object, this.dateLabelPosition)}
			${this.getHands(displayDate, this.handConfig)}
		`;

		return themeSVG;
	}/* getThemeSVG */


}/* season-out */
