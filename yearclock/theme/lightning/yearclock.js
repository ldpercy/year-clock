//
// Lightning theme
//

theme.clock.viewBox           = padViewBox(125);
//theme.clock.viewBox				= '-800 -800 1600 1600';
theme.clock.clockRadius        = 1250;

theme.clock.body = {
	x       : -1300,
	y       : -1300,
	width   : 2600,
	height  : 2600,
	radius  : 100,
};



theme.clock.overlap = 10;		// amount by which rings overshoot their natural divisions


theme.clock.quarterRadiusStart  = 0;
theme.clock.quarterRadiusEnd    = 300 + theme.clock.overlap;
theme.clock.monthRadiusStart    = 300 - theme.clock.overlap;
theme.clock.monthRadiusEnd      = 600 + theme.clock.overlap;
theme.clock.weekRadiusStart     = 600 - theme.clock.overlap;
theme.clock.weekRadiusEnd       = 900 + theme.clock.overlap;
theme.clock.dayRadiusStart      = 900 - theme.clock.overlap;
theme.clock.dayRadiusEnd        = 1200;

//theme.clock.yearLabelPosition   = new Point(0, 0);
theme.clock.yearLabelPosition   = new Point(-1200, -1200);
theme.clock.dateLabelPosition   = new Point( 1200, -1200);
theme.clock.weekLabelPosition   = new Point(-1200,  1200);
theme.clock.dayLabelPosition    = new Point( 1200,  1200);

theme.clock.quarterLabel = {};
theme.clock.quarterLabel.radius         = 150;
theme.clock.quarterLabel.sectorPosition = 0.5;
theme.clock.quarterLabel.rotate         = 'radial-left';
theme.clock.quarterLabel.invert         = 'left';

theme.clock.monthLabel = {};
theme.clock.monthLabel.radius         = 450;
theme.clock.monthLabel.sectorPosition = 0.5;
theme.clock.monthLabel.rotate         = 'radial-left';
theme.clock.monthLabel.invert         = 'left';

theme.clock.weekLabel = {};
theme.clock.weekLabel.radius         = 750;
theme.clock.weekLabel.sectorPosition = 0.5;
theme.clock.weekLabel.rotate         = 'radial-left';
theme.clock.weekLabel.invert         = 'left';


//
// formatting functions
//
function formatMonth(name) { return name.slice(0,3) }
function formatDateLabel(date) {
	return `${(date.getMonth()+1).toString().padStart(2,'0')}-${date.getDate().toString().padStart(2,'0')}`
}

function formatSector(sectorType, sector) {
	let result;
	//log(sector);
	switch(sectorType) {
		case 'quarter': result = `${sector.name}`; break;
		case 'week'   : result = `W${sector.name}: ${isoDate(sector.dateStart)} - ${isoDate(sector.dateEnd)}`; break;
		default       : result = sector.name; break;
	}

	return result;
}

//function formatLabel(sectorType, sector) { return sector.name }


/* Draw Clock
*/
theme.clock.drawClock = function(clockElement)
{
	// Set Up Drawing
	theme.clock.element = clockElement;

	theme.clock.drawViewbox();
	//theme.clock.drawFace();
	theme.clock.drawBody(theme.clock.body);

	let quarterArray = getQuarterArray(config.date.object);
	let weekArray    = getYearWeekArray(config.date.object);

	theme.clock.drawSectors('quarter', quarterArray, theme.clock.quarterRadiusStart, theme.clock.quarterRadiusEnd);
	theme.clock.drawMonthSectors(theme.clock.monthRadiusStart, theme.clock.monthRadiusEnd);
	theme.clock.drawSectors('week', weekArray, theme.clock.weekRadiusStart, theme.clock.weekRadiusEnd);
	theme.clock.drawPeriodDaySectors('yearDays', config.yearDayArray, theme.clock.dayRadiusStart, theme.clock.dayRadiusEnd);

	theme.clock.drawSectorLabels('quarter', quarterArray, theme.clock.quarterLabel);
	theme.clock.drawMonthLabels();
	theme.clock.drawSectorLabels('week', weekArray, theme.clock.weekLabel);

	theme.clock.drawYearLabel(config.date.object, theme.clock.yearLabelPosition);
	theme.clock.drawDateLabel(config.date.object);

}/* drawClock */



theme.clock.drawBody = function(body=theme.clock.body) {

	const svg =
		`<rect class="body" x="${body.x}" y="${body.y}" width="${body.width}" height="${body.height}" rx="${body.radius}" ry="${body.radius}"></rect>`;

	theme.clock.element.innerHTML += svg;
}


