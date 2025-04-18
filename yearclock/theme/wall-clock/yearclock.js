//
// Wall clock theme
//

theme.clock.clockRadius       = 1170,

theme.clock.innerRadius       = 980;
theme.clock.outerRadius       = 1120;
theme.clock.monthLabelRadius  = 900;
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
theme.clock.drawClock = function()
{
	// Set Up Drawing
	theme.clock.element = document.getElementById('clock');

	theme.clock.drawFace();
	// theme.clock.drawMonthSectors();
	theme.clock.drawMonthLabels();
	//theme.clock.drawYearDayTicks();
	theme.clock.drawMonthDayTicks();
	theme.clock.drawDateText(config.date.object);

	theme.clock.drawHands(drawMonthHand=true);

}/* drawClock */



function formatMonth(name) { return name.slice(0,3) }
