//
// Lightning theme
//

theme.clock.viewBox           = padViewBox(75);
//theme.clock.viewBox				= '-800 -800 1600 1600';
theme.clock.clockRadius        = 1250;


theme.clock.quarterRadiusStart = 0;
theme.clock.quarterRadiusEnd   = 300;
theme.clock.monthRadiusStart  = 300;
theme.clock.monthRadiusEnd    = 600;
theme.clock.weekRadiusStart   = 600;
theme.clock.weekRadiusEnd     = 900;
theme.clock.dayRadiusStart    = 900;
theme.clock.dayRadiusEnd      = 1200;


theme.clock.yearLabelPosition   = new Point(0, 0);



theme.clock.monthLabelRadius  = 450;
theme.clock.monthLabel = {};
theme.clock.monthLabel.sectorPosition = 0.5;
theme.clock.monthLabel.rotate = false;
theme.clock.monthLabel.invert = false;

theme.clock.yearHandLength    = 800;
theme.clock.monthHandLength    = 850;


//
// formatting functions
//
function formatMonth(name) { return name.slice(0,3) }
function formatDateLabel(date) {
	return `${(date.getMonth()+1).toString().padStart(2,'0')}-${date.getDate().toString().padStart(2,'0')}`
}

function formatSector(sectorType, sector) {
	let result;
	log(sector);
	switch(sectorType) {
		case 'quarter': result = `${sector.name}`; break;
		case 'week'   : result = `Week ${sector.name}`; break;
		default       : result = sector.name; break;
	}

	return result;
}



/* Draw Clock
*/
theme.clock.drawClock = function(clockElement)
{
	// Set Up Drawing
	theme.clock.element = clockElement;
	theme.clock.drawFace();

	let quarterArray = getQuarterArray(config.date.object);
	let weekArray    = getYearWeekArray(config.date.object);

	theme.clock.drawSectors('quarter', quarterArray, theme.clock.quarterRadiusStart, theme.clock.quarterRadiusEnd);
	theme.clock.drawMonthSectors(theme.clock.monthRadiusStart, theme.clock.monthRadiusEnd);
	theme.clock.drawSectors('week', weekArray, theme.clock.weekRadiusStart, theme.clock.weekRadiusEnd);
	theme.clock.drawPeriodDaySectors('yearDays', config.yearDayArray, theme.clock.dayRadiusStart, theme.clock.dayRadiusEnd);

	theme.clock.drawMonthLabels();
	theme.clock.drawYearLabel(config.date.object, theme.clock.yearLabelPosition);
	//theme.clock.drawDateLabel(config.date.object);

}/* drawClock */



