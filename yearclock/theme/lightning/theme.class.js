//
// Lightning theme
//
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


	quarterRadiusStart  = 0;
	quarterRadiusEnd    = 300 + this.overlap;
	monthRadiusStart    = 300 - this.overlap;
	monthRadiusEnd      = 600 + this.overlap;
	weekRadiusStart     = 600 - this.overlap;
	weekRadiusEnd       = 900 + this.overlap;
	dayRadiusStart      = 900 - this.overlap;
	dayRadiusEnd        = 1200;

	//this.yearLabelPosition   = new Point(0, 0);
	yearLabelPosition   = new Point(-1200, -1200);
	dateLabelPosition   = new Point( 1200, -1200);
	weekLabelPosition   = new Point(-1200,  1200);
	dayLabelPosition    = new Point( 1200,  1200);

	quarterLabel = {
		radius         : 175,
		sectorPosition : 0.5,
		rotate         : 'radial-left',
		invert         : 'left',
	};

	monthLabel = {
		radius         : 450,
		sectorPosition : 0.5,
		rotate         : 'radial-left',
		invert         : 'left',
	};

	weekLabel = {
		radius         : 750,
		sectorPosition : 0.5,
		rotate         : 'radial-left',
		invert         : 'left',
	};

	dayLabel = {
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
			case 'week'     : result = `W${data.name}: ${isoDate(data.dateStart)} - ${isoDate(data.dateEnd)}`; break;
			case 'day'      : result = `${data.isoShort} - ${data.name} - d${data.dayOfYear}`; break;
			default         : result = data.name; break;
		}
		return result;
	}

	formatLabel = function(labelType, data) {
		let result;
		switch(labelType) {
			case 'yearDay'  : result = `${data.name.slice(0,2)}`; break;
			case 'quarter'  : result = `${data.name}`; break;
			case 'month'    : result = `${data.name.slice(0,3)}`; break;
			case 'week'     : result = `W${data.name}`; break;
			case 'date'     : result = `${isoMonthDay(data.date)}`; break;
			case 'year'     : result = `${data.date.getFullYear()}`; break;
			default         : result = data.name; break;
		}
		return result;
	}



	/* getClockSVG
	*/
	getClockSVG = function(displayDate)
	{
		let quarterArray = getQuarterArray(displayDate.object);
		let weekArray    = getYearWeekArray(displayDate.object);

		const clockSVG = `
			<svg id="clock" class="yearclock" viewBox="${this.viewBox}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
				${this.getBody(this.body)}
				${this.getSectors('quarter', quarterArray, this.quarterRadiusStart, this.quarterRadiusEnd)}
				${this.getMonthSectors(displayDate.monthArray, this.monthRadiusStart, this.monthRadiusEnd)}
				${this.getSectors('week', weekArray, this.weekRadiusStart, this.weekRadiusEnd)}
				${this.getPeriodDaySectors('yearDay', displayDate.yearDayArray, this.dayRadiusStart, this.dayRadiusEnd)}

				${this.getSectorLabels('quarter', quarterArray, this.quarterLabel)}
				${this.getMonthLabels(displayDate.monthArray)}
				${this.getSectorLabels('week', weekArray, this.weekLabel)}
				${this.getSectorLabels('yearDay', displayDate.yearDayArray, this.dayLabel)}

				${this.getYearLabel(displayDate.object, this.yearLabelPosition)}
				${this.getDateLabel(displayDate.object)}
			</svg>
		`;

		return clockSVG;
	}/* getClockSVG */


	getBody = function(body=this.body) {

		const svg =
			`<rect class="body" x="${body.x}" y="${body.y}" width="${body.width}" height="${body.height}" rx="${body.radius}" ry="${body.radius}"></rect>`;

		return svg;
	}


}/* themeClass['lightning'] */
