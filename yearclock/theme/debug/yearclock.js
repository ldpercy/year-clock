//
// Debug theme
//

theme.clock.viewBox           = padViewBox(10);

theme.clock.weekRadiusStart = 400;
theme.clock.weekRadiusEnd   = 1100;

theme.clock.weekLabel = {};
theme.clock.weekLabel.radius         = 800;
theme.clock.weekLabel.sectorPosition = 0.5;
theme.clock.weekLabel.rotate         = 'radial-left';
theme.clock.weekLabel.invert         = false;

theme.clock.dayRadiusStart      = 1100;
theme.clock.dayRadiusEnd        = 1200;


theme.clock.dayLabel = {};
theme.clock.dayLabel.radius         = 1150;
theme.clock.dayLabel.sectorPosition = 0.5;
theme.clock.dayLabel.rotate         = 'radial-left';
theme.clock.dayLabel.invert         = false;



//
// formatting functions
//
function formatTitle(type, data) {
	let result;
	switch(type) {
		case 'quarter': result = `${data.name}`; break;
		case 'week'   : result = `Week ${data.name}: ${isoDate(data.dateStart)} - ${isoDate(data.dateEnd)}`; break;
		case 'hands'    : result = `${isoDate(data.date.object)} - ${data.date.name} - d${data.date.dayOfYear}`; break;
		default       : result = data.name; break;
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


	let weekArray    = getYearWeekArray(config.date.object);
	//log(weekArray);

	theme.clock.drawSectorLabels('week', weekArray, theme.clock.weekLabel);
	theme.clock.drawSectors('week', weekArray, theme.clock.weekRadiusStart, theme.clock.weekRadiusEnd);

	theme.clock.drawSectorLabels('yearDay', config.yearDayArray, theme.clock.dayLabel);
	theme.clock.drawPeriodDaySectors('yearDay', config.yearDayArray, theme.clock.dayRadiusStart, theme.clock.dayRadiusEnd);


}/* drawClock */