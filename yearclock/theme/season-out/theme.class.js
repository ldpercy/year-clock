/* season-out
Seasons in the middle then months then days
*/
yearclock.theme['season-out'] = class extends yearclock.theme.Base {

	viewBox           = this.svg.padViewBox(75);
	//viewBox				= '-800 -800 1600 1600';
	clockRadius        = 1250;


	seasonSector = new Annulus(450, 0);
	monthSector  = new Annulus(850, 350);
	daySector    = new Annulus(1200, 750);

	dateLabelRadius     = 575;
	dateLabel = { position : new Point(10, this.dateLabelRadius) }; // tiny tweak to horizontal position here, having trouble centering it properly
	yearLabel = { position : new Point(0, -this.dateLabelRadius) };

	monthLabel = {
		radius         : 1000,
		sectorPosition : 0.5,
		rotate         : false,
		invert         : false,
	};


	handConfig = {
		year : { length : 800 },
	};



	constructor(clockParameter)
	{
		super(clockParameter);
		this.setDisplayDate(this.parameter.date);
	}

	setDisplayDate(date) {
		this.displayDate = new yearclock.DisplayDate(date, this.parameter.language);
		yearclock.Geometry.addDateRangeRadians(this.displayDate.monthArray, this.displayDate.yearRange);
		this.displayDate.yearDayArray = this.getPeriodDayArray(this.displayDate.yearStart, this.displayDate.yearEnd, this.displayDate);
		yearclock.Geometry.addRadians(this.displayDate.yearDayArray);
		this.displayDate.seasonCircleArray  = yearclock.PeriodArray.getSeasonCircleArray(this.displayDate, this.parameter.hemisphere);
	}


	//
	// formatting functions
	//

	formatLabel = function(labelType, data) {
		let result;
		switch(labelType) {
			case 'month'    : result = `${data.name.slice(0,3)}`; break;
			case 'date'     : result = `${data.toIsoMonthDay()}`; break;
			case 'year'     : result = `${data.year}`; break;
			default         : result = data.name || data.id; break;
		}
		return result;
	}

	formatTitle = function(type, data) {
		let result;
		switch(type) {
			case 'yearDay'  : result = `${data.name} d${data.dayOfPeriod}`; break;
			case 'quarter'  : result = `${data.name}`; break;
			case 'week'     : result = `W${data.name}: ${isoDate(sector.dateStart)} - ${isoDate(sector.dateEnd)}`; break;
			case 'day'      : result = `${data.isoShort} - ${data.name} - d${data.dayOfYear}`; break;
			case 'hands'    : result = `${data.date.toIsoDate()} - ${data.date.dayName} - d${data.date.dayOfYear}`; break;
			default         : result = data.name || data.id; break;
		}
		return result;
	}



	/* getThemeSVG
	*/
	getThemeSVG = function()
	{
		const themeSVG = `
			${this.getFace(this.clockRadius)}

			${this.getSectors('season', this.displayDate.seasonCircleArray, this.seasonSector)}
			${this.getSectors('month', this.displayDate.monthArray, this.monthSector)}
			${this.getSectors('yearDay', this.displayDate.yearDayArray, this.daySector)}
			${this.getSectorLabels('month', this.displayDate.monthArray, this.monthLabel)}
			${this.getDateLabel('year', this.yearLabel)}
			${this.getDateLabel('date', this.dateLabel)}
			${this.getHands(this.handConfig)}
		`;

		return themeSVG;
	}/* getThemeSVG */


}/* season-out */
