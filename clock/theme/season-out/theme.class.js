/* season-out
Seasons in the middle then months then days
*/
themeClass['season-out'] = class extends ThemeBase {

	viewBox           = padViewBox(75);
	//viewBox				= '-800 -800 1600 1600';
	clockRadius        = 1250;


	seasonSector = new Annulus(1200, 50);
	monthSector  = new Annulus(1200, 400);
	daySector    = new Annulus(1200, 800);

	dateLabel = {
		radius : 400,
	}

/* 	dateLabelRadius     = 575;
	dateLabel = { position : new Point(10, this.dateLabelRadius) }; // tiny tweak to horizontal position here, having trouble centering it properly
	yearLabel = { position : new Point(0, -this.dateLabelRadius) }; */

	monthLabel = {
		radius         : 800,
		sectorPosition : 0.5,
		rotate         : true,
		invert         : true,
	};


	handConfig = {
		year : {
			function : ()=>this.getHand1,
			length      : 815,
			tipRadius   : 5,
			discRadius  : 35,
			tail        : 115,
			width       : 15,
		},
	};



	constructor(clockParameter)
	{
		super(clockParameter);
		this.setDisplayDate(this.parameter.date);
	}

	setDisplayDate(date) {
		this.displayDate = createDisplayDate(date, this.parameter.language);
		addDateRangeRadians(this.displayDate.monthArray, this.displayDate.yearRange);
		this.displayDate.yearDayArray = getPeriodDayArray(this.displayDate.yearStart, this.displayDate.yearEnd, this.displayDate.object);
		addRadians(this.displayDate.yearDayArray);
		this.displayDate.seasonCircleArray  = getSeasonCircleArray(this.displayDate, this.parameter.hemisphere);
	}


	//
	// formatting functions
	//

	formatLabel = function(labelType, data) {
		let result;
		switch(labelType) {
			case 'month'    : result = `${data.name.slice(0,3)}`; break;
			case 'date'     : result = `${data.month.toString().padStart(2,'0')}-${data.object.getDate().toString().padStart(2,'0')}`; break;
			case 'isoDate'      : result = `${isoDate(data.object)}` ; break;
			case 'year'     : result = `${data.year}`; break;
			default         : result = data.name || data.id; break;
		}
		return result;
	}

	formatTitle = function(type, data) {
		let result;
		switch(type) {
			case 'yearDay'  : result = `${data.isoShort} ${data.name} d${data.dayOfYear}`; break;
			case 'quarter'  : result = `${data.name}`; break;
			case 'week'     : result = `W${data.name}: ${isoDate(sector.dateStart)} - ${isoDate(sector.dateEnd)}`; break;
			case 'day'      : result = `${data.isoShort} - ${data.name} - d${data.dayOfYear}`; break;
			case 'hands'    : result = `${isoDate(data.date.object)} - ${data.date.name} - d${data.date.dayOfYear}`; break;
			default         : result = data.name || data.id; break;
		}
		return result;
	}



	/* getThemeSVG
	*/
	getThemeSVG = function()
	{
		const themeSVG = `
			<defs>
				<radialGradient id="gradient-summer" cx="0" cy="0" gradientUnits="userSpaceOnUse">
					<stop offset="0%" stop-color="#f004" />
					<stop offset="80%" stop-color="white" />
					<stop offset="100%" stop-color="white" />
				</radialGradient>
			</defs>


			${this.getFace(this.clockRadius)}

			${this.getSectors('season', this.displayDate.seasonCircleArray, this.seasonSector)}
			${this.getSectors('month', this.displayDate.monthArray, this.monthSector)}
			${this.getSectors('yearDay', this.displayDate.yearDayArray, this.daySector)}
			${this.getSectorLabels('month', this.displayDate.monthArray, this.monthLabel)}

			${this.getDateLabel(this.dateLabel)}

			${this.getHands(this.handConfig)}
		`;

		// ${this.getDateLabel('year', this.yearLabel)}

		return themeSVG;
	}/* getThemeSVG */



	/* getDateLabel
	*/
	getDateLabel = function(setting) {

		const dateLabelPath = getArcPath(radians(-90), radians(90), setting.radius);

		const textPath = `<textPath startOffset="50%" href="#dateLabelPath">${this.formatLabel('isoDate',this.displayDate)}</textPath>`;

		const svg =
			`<g class="group-label dateLabel">
				<defs>
					<path id="dateLabelPath" d="${dateLabelPath}"/>
				</defs>

				<text class="label dateLabel">${textPath}</text>
			</g>`;

		return svg;
	}/* getDateLabel */



}/* season-out */
