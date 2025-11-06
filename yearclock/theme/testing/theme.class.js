/* testing
Testing theme - use for trying things out and fixing bugs
*/
yearclock.theme['testing'] = class extends yearclock.theme.Base {


	viewBox           = this.svg.padViewBox(50);
	clockRadius       = 1200;

	//monthSector = new Annulus(800, 400);

	monthRing = {
		name       : 'yearMonth',
		array      : undefined, // this.displayDate.monthArray,
		sector     : new Annulus(800, 100),
		sizeAdjust :  new Point(-10,-10),
		label : {
			radius         : 600,
			sectorPosition : 0.5,
			rotate         : true,
			invert         : false,
			textType       : 'text',
			format         : 'monthNumber',
		}
	};



	weekSector  = new Annulus(900, 400);
	daySector   = new Annulus(1200, 810);

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


	constructor(clockParameter)
	{
		super(clockParameter);
		this.setDisplayDate(this.parameter.date);
	}


	setDisplayDate(date) {
		this.displayDate = new yearclock.DisplayDate(date, this.parameter.language);

		this.monthRing.array = this.displayDate.monthArray;

		// Set Up Drawing
		yearclock.Geometry.addDateRangeAngularRange(this.displayDate.monthArray, this.displayDate.yearRange);

		this.displayDate.yearDayArray = this.getPeriodDayArray(this.displayDate.yearStart, this.displayDate.yearEnd, this.displayDate);
		//this.dayRing.array   = this.displayDate.monthDayArray;

		//this.displayDate.monthDayArray = this.getPeriodDayArray(startOfMonth(this.displayDate), nextMonth(this.displayDate), this.displayDate, this.displayDate.language);

		/*
		let weekArray    = getYearWeekArray(this.displayDate);
		${this.getSectorLabels('week', weekArray, this.weekLabel)}
		${this.getSectors('week', weekArray, this.weekRadiusStart, this.weekRadiusEnd)}
 		*/
	}



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
	getThemeSVG = function()
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

			${this.getSectors('yearMonth', this.displayDate.monthArray, this.monthRing.sector, this.monthRing)}
			${this.getSymbols('monthSymbols', this.displayDate.monthArray, this.monthSymbols)}




			${this.getDateLabel('date', this.dateLabel)}


			<circle style="stroke:red; fill:none;" cx="0" cy="0" r="200" />
			<circle style="stroke:red; fill:none;" cx="0" cy="0" r="100" />
			<circle style="stroke:red; fill:none;" cx="0" cy="0" r="50" />
			<circle style="stroke:red; fill:none;" cx="0" cy="0" r="10" />


		`;

		/*
			${this.getSectorLabels('yearDay', this.displayDate.yearDayArray, this.dayLabel)}
			${this.getSectors('yearDay', this.displayDate.yearDayArray, this.daySector)}


		*/

		return themeSVG;
	}/* getThemeSVG */


}/* YearClock.testing */