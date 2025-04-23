//
// Wall clock theme
//
theme.clock.viewBox           = padViewBox(30);
theme.clock.clockRadius       = 1200,

theme.clock.innerRadius       = 1000;
theme.clock.outerRadius       = 1150;
theme.clock.monthLabelRadius  = 920;
theme.clock.weekdayTickLength = 40;
theme.clock.weekendTickLength = 55;

theme.clock.dateLabel         = new Point(0,430);

theme.clock.monthLabel = {};
theme.clock.monthLabel.sectorPosition = 0;
theme.clock.monthLabel.rotate = false;
theme.clock.monthLabel.invert = false;

theme.clock.yearHandLength    = 600;
theme.clock.monthHandLength    = 850;


/* Draw Clock
*/
theme.clock.drawClock = function(clockElement)
{
	// Set Up Drawing
	theme.clock.element = clockElement;

	theme.clock.drawFace();
	// theme.clock.drawMonthSectors();
	theme.clock.drawMonthLabels();
	//theme.clock.drawYearDayTicks();
	theme.clock.drawMonthDayTicks();
	theme.clock.drawDateText(config.date.object);

	theme.clock.drawHands(drawMonthHand=true);

}/* drawClock */



function formatMonth(name) { return name.slice(0,3) }
