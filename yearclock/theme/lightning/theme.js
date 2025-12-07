/* Lightning theme
No hands for this one, just highlights
*/

import * as dates from '../../Dates.js';
import * as themebase from '../ThemeBase.js';
import * as svg from '../../SVG.js';
import * as geometry from '../../Geometry.js';
import * as periodArray from '../../PeriodArray.js';


class LightningTheme extends themebase.ThemeBase {

	viewBox           = svg.padViewBox(125);
	//this.viewBox				= '-800 -800 1600 1600';

	view = [
		{ "view-q1" : "0 -1200 1200 1200" },
		{ "view-q2" : "0 0 1200 1200"},
		{ "view-q3" : "-1200 0 1200 1200"},
		{ "view-q4" : "-1200 -1200 1200 1200"},
	];



	clockRadius        = 1250;


	body = {
		x       : -1300,
		y       : -1300,
		width   : 2600,
		height  : 2600,
		radius  : 100,
	};

	overlap = 10;		// amount by which rings overshoot their natural divisions

	quarterSector = new geometry.Annulus(300 + this.overlap, 0);
	monthSector   = new geometry.Annulus(600 + this.overlap, 300 - this.overlap);
	weekSector    = new geometry.Annulus(900 + this.overlap, 600 - this.overlap);
	daySector     = new geometry.Annulus(1200, 900 - this.overlap);


	//this.yearLabelPosition   = new geometry.Point(0, 0);
	yearLabel   = { position : new geometry.Point(-1200, -1200) };
	dateLabel   = { position : new geometry.Point( 1200, -1200) };
	weekLabel   = { position : new geometry.Point(-1200,  1150) };
	dayLabel    = { position : new geometry.Point( 1200,  1150) };

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
		this.displayDate = new dates.DisplayDate(date, this.parameter.language);
		geometry.addDateRangeAngularRange(this.displayDate.monthArray, this.displayDate.yearRange);
		this.displayDate.yearDayArray = dates.getPeriodDayArray(this.displayDate.yearStart, this.displayDate.yearEnd, this.displayDate);
		geometry.addAngularRange(this.displayDate.yearDayArray);

		this.displayDate.quarterArray =  periodArray.getQuarterArray(this.displayDate);
		this.displayDate.weekArray    =  periodArray.getYearWeekArray(this.displayDate);

		//console.debug(this.displayDate.yearDayArray);
	}

	//
	// formatting functions
	//


	formatTitle(type, data) {
		let result;
		switch(type) {
			case 'yearDay'  : result = `${data.name} d${data.date.dayOfYear}`; break;
			case 'quarter'  : result = `${data.name}`; break;
			case 'week'     : result = `W${data.name}: ${data.dateRange.start.toIsoDate()} - ${data.dateRange.end.toIsoDate()}`; break;
			case 'day'      : result = `${data.isoShort} - ${data.name} - d${data.dayOfYear}`; break;
			default         : result = data.name; break;
		}
		return result;
	}

	formatLabel(labelType, data) {
		let result;
		switch(labelType) {
			case 'yearDay'      : result = `${data.name.slice(0,2)}`; break;
			case 'quarter'      : result = `${data.name}`; break;
			case 'month'        : result = `${data.name.slice(0,3)}`; break;
			case 'week'         : result = `W${data.name}`; break;
			case 'clock-week'         : result = `W${data.week.name}`; break;
			case 'dayOfYear'    : result = `D${data.dayOfYear}`; break;
			case 'date'         : result = `${data.toIsoMonthDay()}`; break;
			case 'year'         : result = `${data.year}`; break;
			default             : result = data.name; break;
		}
		return result;
	}



	/* getThemeSVG
	*/
	getThemeSVG()
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


	getBody(body=this.body) {

		const svg =
			`<rect class="body" x="${body.x}" y="${body.y}" width="${body.width}" height="${body.height}" rx="${body.radius}" ry="${body.radius}"></rect>`;

		return svg;
	}


}/* YearClock.lightning */


export { LightningTheme as Theme }