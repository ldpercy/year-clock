/* Lightning theme
No hands for this one, just highlights
*/
yearclock.theme['lightning'] = class extends yearclock.theme.Base {

	viewBox           = this.svg.padViewBox(125);
	//this.viewBox				= '-800 -800 1600 1600';
	clockRadius        = 1250;

	body = {
		x       : -1300,
		y       : -1300,
		width   : 2600,
		height  : 2600,
		radius  : 100,
	};

	overlap = 10;		// amount by which rings overshoot their natural divisions

	quarterSector = new Annulus(300 + this.overlap, 0);
	monthSector   = new Annulus(600 + this.overlap, 300 - this.overlap);
	weekSector    = new Annulus(900 + this.overlap, 600 - this.overlap);
	daySector     = new Annulus(1200, 900 - this.overlap);


	//this.yearLabelPosition   = new Point(0, 0);
	yearLabel   = { position : new Point(-1200, -1200) };
	dateLabel   = { position : new Point( 1200, -1200) };
	weekLabel   = { position : new Point(-1200,  1150) };
	dayLabel    = { position : new Point( 1200,  1150) };

	quarterLabels = {
		radius         : 175,
		sectorPosition : 0.5,
		rotate         : 'radial-left',
		invert         : 'left',
	};

	monthLabels = {
		radius         : 450,
		sectorPosition : 0.5,
		rotate         : 'radial-left',
		invert         : 'left',
	};

	weekLabels = {
		radius         : 750,
		sectorPosition : 0.5,
		rotate         : 'radial-left',
		invert         : 'left',
	};

	dayLabels = {
		radius         : 1050,
		sectorPosition : 0.5,
		rotate         : 'radial-left',
		invert         : 'left',
	};


	constructor(clockParameter)
	{
		super(clockParameter);
		this.setDisplayDate(this.parameter.date);
	}

	setDisplayDate(date) {
		this.displayDate = this.createDisplayDate(date, this.parameter.language);
		addDateRangeRadians(this.displayDate.monthArray, this.displayDate.yearRange);
		this.displayDate.yearDayArray = this.getPeriodDayArray(this.displayDate.yearStart, this.displayDate.yearEnd, this.displayDate);
		addRadians(this.displayDate.yearDayArray);

		this.displayDate.quarterArray = getQuarterArray(this.displayDate);
		this.displayDate.weekArray    = getYearWeekArray(this.displayDate);
	}

	//
	// formatting functions
	//


	formatTitle = function(type, data) {
		let result;
		switch(type) {
			case 'yearDay'  : result = `${data.name} ${data.dayOfYear}`; break;
			case 'quarter'  : result = `${data.name}`; break;
			case 'week'     : result = `W${data.name}: ${isoDate(data.dateRange.start)} - ${isoDate(data.dateRange.end)}`; break;
			case 'day'      : result = `${data.isoShort} - ${data.name} - d${data.dayOfYear}`; break;
			default         : result = data.name; break;
		}
		return result;
	}

	formatLabel = function(labelType, data) {
		let result;
		switch(labelType) {
			case 'yearDay'      : result = `${data.name.slice(0,2)}`; break;
			case 'quarter'      : result = `${data.name}`; break;
			case 'month'        : result = `${data.name.slice(0,3)}`; break;
			case 'week'         : result = `W${data.name}`; break;
			case 'clock-week'         : result = `W${data.week.name}`; break;
			case 'dayOfYear'    : result = `D${data.dayOfYear}`; break;
			case 'date'         : result = `${isoMonthDay(data.object)}`; break;
			case 'year'         : result = `${data.year}`; break;
			default             : result = data.name; break;
		}
		return result;
	}



	/* getThemeSVG
	*/
	getThemeSVG = function()
	{
		const themeSVG = `
			${this.getBody(this.body)}
			${this.getSectors('quarter', this.displayDate.quarterArray, this.quarterSector)}
			${this.getSectors('month', this.displayDate.monthArray, this.monthSector)}
			${this.getSectors('week', this.displayDate.weekArray, this.weekSector)}
			${this.getSectors('yearDay', this.displayDate.yearDayArray, this.daySector)}

			${this.getSectorLabels('quarter', this.displayDate.quarterArray, this.quarterLabels)}
			${this.getSectorLabels('month', this.displayDate.monthArray, this.monthLabels)}
			${this.getSectorLabels('week', this.displayDate.weekArray, this.weekLabels)}
			${this.getSectorLabels('yearDay', this.displayDate.yearDayArray, this.dayLabels)}

			${this.getDateLabel('year', this.yearLabel)}
			${this.getDateLabel('date', this.dateLabel)}

			${this.getDateLabel('clock-week', this.weekLabel)}
			${this.getDateLabel('dayOfYear', this.dayLabel)}
		`;

		return themeSVG;
	}/* getThemeSVG */


	getBody = function(body=this.body) {

		const svg =
			`<rect class="body" x="${body.x}" y="${body.y}" width="${body.width}" height="${body.height}" rx="${body.radius}" ry="${body.radius}"></rect>`;

		return svg;
	}


}/* YearClock.lightning */
