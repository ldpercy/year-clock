/* Lightning theme
No hands for this one, just highlights
*/
themeClass['lightning'] = class extends ThemeBase {

	viewBox           = padViewBox(125);
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
			case 'weekSector'   : result = `W${data.name}`; break;
			case 'week'         : result = `W${data.name}`; break;
			case 'dayOfYear'    : result = `D${data.dayOfYear}`; break;
			case 'date'         : result = `${isoMonthDay(data.object)}`; break;
			case 'year'         : result = `${data.year}`; break;
			default             : result = data.name; break;
		}
		return result;
	}



	/* getThemeSVG
	*/
	getThemeSVG = function(displayDate)
	{
		addDateRangeRadians(displayDate.monthArray, displayDate.yearRange);
		displayDate.yearDayArray = getPeriodDayArray(displayDate.yearStart, displayDate.yearEnd, displayDate.object);
		addRadians(displayDate.yearDayArray);

		let quarterArray = getQuarterArray(displayDate);
		let weekArray    = getYearWeekArray(displayDate);

		const themeSVG = `
			${this.getBody(this.body)}
			${this.getSectors('quarter', quarterArray, this.quarterSector)}
			${this.getSectors('month', displayDate.monthArray, this.monthSector)}
			${this.getSectors('week', weekArray, this.weekSector)}
			${this.getPeriodDaySectors('yearDay', displayDate.yearDayArray, this.daySector)}

			${this.getSectorLabels('quarter', quarterArray, this.quarterLabels)}
			${this.getSectorLabels('month', displayDate.monthArray, this.monthLabels)}
			${this.getSectorLabels('weekSector', weekArray, this.weekLabels)}
			${this.getSectorLabels('yearDay', displayDate.yearDayArray, this.dayLabels)}

			${this.getDateLabel('year', displayDate, this.yearLabel)}
			${this.getDateLabel('date', displayDate, this.dateLabel)}

			${this.getDateLabel('week', displayDate.week, this.weekLabel)}
			${this.getDateLabel('dayOfYear', displayDate, this.dayLabel)}
		`;

		return themeSVG;
	}/* getThemeSVG */


	getBody = function(body=this.body) {

		const svg =
			`<rect class="body" x="${body.x}" y="${body.y}" width="${body.width}" height="${body.height}" rx="${body.radius}" ry="${body.radius}"></rect>`;

		return svg;
	}


}/* themeClass['lightning'] */
