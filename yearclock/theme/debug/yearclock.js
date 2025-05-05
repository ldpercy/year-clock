//
// Debug theme
//



theme.clock.weekRadiusStart = 400;
theme.clock.weekRadiusEnd   = 1200;

theme.clock.weekLabel = {};
theme.clock.weekLabel.radius         = 1100;
theme.clock.weekLabel.sectorPosition = 0.5;
theme.clock.weekLabel.rotate         = true;
theme.clock.weekLabel.invert         = false;


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
	log(weekArray);

	theme.clock.drawSectors('week', weekArray, theme.clock.weekRadiusStart, theme.clock.weekRadiusEnd);
	theme.clock.drawSectorLabels('week', weekArray, theme.clock.weekLabel);

}/* drawClock */