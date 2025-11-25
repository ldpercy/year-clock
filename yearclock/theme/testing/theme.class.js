/* testing
Testing theme - use for trying things out and fixing bugs
*/

import * as dates from '../../Dates.js';
import * as themebase from '../ThemeBase.js';
import * as svg from '../../SVG.js';
import * as geometry from '../../Geometry.js';


class TestingTheme extends themebase.ThemeBase {


	viewBox           = svg.padViewBox(50);
	clockRadius       = 1200;

	//monthSector = new geometry.Annulus(800, 400);

	yearMonthRing = {
		name       : 'yearMonth',
		array      : undefined, // this.displayDate.monthArray,
		sector     : new geometry.Annulus(800, 100),
		sizeAdjust :  new geometry.Point(-10,-10),
		label : [{
			radius         : 600,
			sectorPosition : 0.5,
			rotate         : true,
			invert         : false,
			textType       : 'text',
			format         : 'monthNumber',
		}]
	};

	monthDayRing = {
		name       : 'monthDay',
		array      : undefined, // this.displayDate.monthArray,
		sector     : new geometry.Annulus(900, 1200),
		sizeAdjust :  new geometry.Point(-10,-10),
		label : [{
			radius         : 1000,
			sectorPosition : 0.5,
			rotate         : true,
			invert         : false,
			textType       : 'text',
			format         : 'dayNumber',
		}]
	};



	weekSector  = new geometry.Annulus(900, 400);
	daySector   = new geometry.Annulus(1200, 810);

	weekLabel = {
		radius         : 600,
		sectorPosition : 0.5,
		rotate         : 'radial-left',
		invert         : false,
	};


	dayLabel = {
		radius         : 1000,
		sectorPosition : 0.5,
		rotate         : 'radial-left',
		invert         : false,
	};

	dateLabel = {
		position   : new geometry.Point(-1200,-1200)
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


	constructor(clockParameter)
	{
		super(clockParameter);
		this.setDisplayDate(this.parameter.date);
	}


	setDisplayDate(date) {
		this.displayDate = new dates.DisplayDate(date, this.parameter.language);

		this.yearMonthRing.array = this.displayDate.monthArray;

		// Set Up Drawing
		geometry.addDateRangeAngularRange(this.displayDate.monthArray, this.displayDate.yearRange);

		this.displayDate.yearDayArray = dates.getPeriodDayArray(this.displayDate.yearStart, this.displayDate.yearEnd, this.displayDate);


		this.displayDate.monthDays = new dates.DayRange(this.displayDate.monthStart, this.displayDate.monthEnd, this.displayDate, this.displayDate.language);
		this.displayDate.monthDays.setAngularRange();
		this.monthDayRing.array   = this.displayDate.monthDays.array;

		/*
		let weekArray    = getYearWeekArray(this.displayDate);
		${this.getSectorLabels('week', weekArray, this.weekLabel)}
		${this.getSectors('week', weekArray, this.weekRadiusStart, this.weekRadiusEnd)}
 		*/
	}



	//
	// formatting functions
	//
	formatTitle(type, data) {
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
	getThemeSVG()
	{
		const themeSVG = `

			<defs>
				<!-- class="label favicon"
				width="100" height="100"
				refX="-1000" refY="-1000"
				-->
				<!--
				<symbol id="star-symbol" viewBox="-1000 -1000 2000 2000" >
					<rect x="-1000" y="-1000" width="2000" height="2000"/>
					<path d="M 259 966 L -707 -707 L 966 259 L -966 259 L 707 -707 L -259 966 L -259 -966 L 707 707 L -966 -259 L 966 -259 L -707 707 L 259 -966  Z"/>
				</symbol>
				-->

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


			${this.getRing(this.yearMonthRing)}
			${this.getRing(this.monthDayRing)}


			${this.getDateLabel('date', this.dateLabel)}


			<circle style="stroke:red; fill:none;" cx="0" cy="0" r="200" />
			<circle style="stroke:red; fill:none;" cx="0" cy="0" r="100" />
			<circle style="stroke:red; fill:none;" cx="0" cy="0" r="50" />
			<circle style="stroke:red; fill:none;" cx="0" cy="0" r="10" />
		`;

		/*
			 ${this.getSectors('yearMonth', this.displayDate.monthArray, this.yearMonthRing.sector, this.yearMonthRing)}
			 ${this.getSymbols('monthSymbols', this.displayDate.monthArray, this.monthSymbols)}

			${this.getSectorLabels('yearDay', this.displayDate.yearDayArray, this.dayLabel)}
			${this.getSectors('yearDay', this.displayDate.yearDayArray, this.daySector)}

		*/

		return themeSVG;
	}/* getThemeSVG */


}/* YearClock.testing */


export { TestingTheme as Theme };
