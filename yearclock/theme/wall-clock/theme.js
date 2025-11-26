/* Wall clock theme
*/

import * as dates from '../../Dates.js';
import * as themebase from '../ThemeBase.js';
import * as svg from '../../SVG.js';
import * as geometry from '../../Geometry.js';


class WallClockTheme extends themebase.ThemeBase {

	viewBox           = svg.padViewBox(30);
	clockRadius       = 1200;

	innerRadius       = 1000;
	outerRadius       = 1150;

	weekdayMarkerLength = 40;
	weekendMarkerLength = 55;

	tick = {
		weekdayStart    : this.outerRadius,
		weekdayEnd      : this.outerRadius - this.weekdayMarkerLength,
		weekendStart    : this.outerRadius,
		weekendEnd      : this.outerRadius - this.weekendMarkerLength,
		monthFirstStart : this.outerRadius,
		monthFirstEnd   : this.innerRadius,
	};


	dateLabel = { position : new geometry.Point(0,-430) };

	monthLabel = {
		radius         : 920,
		sectorPosition : 0,
		rotate         : false,
		invert         : false,
	};

	handConfig = {
		year : {
			function    : this.getHand1,
			length      : 600,
			tipRadius   : 10,
			discRadius  : 40,
			tail        : 160,
			width       : 18,
		},
		month : {
			function    : this.getHand1,
			length      : 850,
			tipRadius   : 5,
			discRadius  : 30,
			tail        : 160,
			width       : 14,
		},
	};


	constructor(clockParameter)
	{
		super(clockParameter);
		this.setDisplayDate(this.parameter.date);
	}


	setDisplayDate(date) {
		this.displayDate = new dates.DisplayDate(date, this.parameter.language);

		geometry.addDateRangeAngularRange(this.displayDate.monthArray, this.displayDate.yearRange);

		//console.debug(this.displayDate.monthArray);

		this.displayDate.monthDays = new dates.DayRange(this.displayDate.monthStart, this.displayDate.monthEnd, this.displayDate, this.displayDate.language);
		this.displayDate.monthDays.setAngularRange();

	}


	/* getThemeSVG
	*/
	getThemeSVG()
	{


		const themeSVG = `
			${this.getFace(this.clockRadius)}
			${this.getSectorLabels('month', this.displayDate.monthArray, this.monthLabel)}
			${this.getPeriodDayTicks('monthDay', this.displayDate.monthDays.array, this.tick)}
			${this.getDateLabel('year', this.dateLabel)}
			<text x="0" y="430" id="schwartz" class="schwartz" textLength="500" lengthAdjust="spacingAndGlyphs">SCHWARTZ</text>
			${this.getHands(this.handConfig)}
		`;

		return themeSVG;
	}/* getThemeSVG */


	formatLabel(labelType, data) {
		let result;
		switch(labelType) {
			case 'month'    : result = `${data.name.slice(0,3)}`    ; break;
			case 'year'     : result = `${data.year}` ; break;
			default         : result = data.name; break;
		}
		return result;
	}





}/* wall-clock */



export { WallClockTheme as Theme }
