//
// Debug theme
//



theme.clock.weekRadiusStart = 400;
theme.clock.weekRadiusEnd   = 1100;

theme.clock.weekLabel = {};
theme.clock.weekLabel.radius         = 1000;
theme.clock.weekLabel.sectorPosition = 0.5;
theme.clock.weekLabel.rotate         = 'radial-left';
theme.clock.weekLabel.invert         = false;

theme.clock.dayRadiusStart      = 1100 ;
theme.clock.dayRadiusEnd        = 1200;


//
// formatting functions
//
function formatSector(sectorType, sector) {
	let result;
	//log(sector);
	switch(sectorType) {
		case 'quarter': result = `${sector.name}`; break;
		case 'week'   : result = `Week ${sector.name}: ${isoDate(sector.dateStart)} - ${isoDate(sector.dateEnd)}`; break;
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
	//theme.clock.drawViewbox();
	theme.clock.drawFace();
	//theme.clock.drawMonthSectors();
	//theme.clock.drawMonthLabels();
	//theme.clock.drawYearDayTicks();
	//theme.clock.drawDateLabel(config.date.object);
	//theme.clock.drawHands();


	theme.clock.drawPeriodDaySectors('yearDays', config.yearDayArray, theme.clock.dayRadiusStart, theme.clock.dayRadiusEnd);



	let weekArray    = getYearWeekArray(config.date.object);
	//log(weekArray);

	theme.clock.drawSectors('week', weekArray, theme.clock.weekRadiusStart, theme.clock.weekRadiusEnd);
	theme.clock.drawSectorLabels('week', weekArray, theme.clock.weekLabel);

}/* drawClock */