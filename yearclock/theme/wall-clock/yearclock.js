//
// Wall clock theme
//
theme.clock.viewBox           = padViewBox(30);
theme.clock.clockRadius       = 1200,

theme.clock.innerRadius       = 1000;
theme.clock.outerRadius       = 1150;

theme.clock.weekdayMarkerLength = 40;
theme.clock.weekendMarkerLength = 55;

theme.clock.dateLabelPosition         = new Point(0,430);

theme.clock.monthLabel = {};
theme.clock.monthLabel.radius         = 920;
theme.clock.monthLabel.sectorPosition = 0;
theme.clock.monthLabel.rotate         = false;
theme.clock.monthLabel.invert         = false;

theme.clock.yearHandLength    = 600;
theme.clock.monthHandLength    = 850;


/* Draw Clock
*/
theme.clock.drawClock = function(clockElement, displayDate)
{
	displayDate.monthDayArray = getPeriodDayArray(startOfMonth(displayDate.object), nextMonth(displayDate.object), displayDate.object);

	// Set Up Drawing
	theme.clock.element = clockElement;

	theme.clock.drawFace();
	// theme.clock.drawMonthSectors();
	theme.clock.drawMonthLabels(displayDate.monthArray);
	//theme.clock.drawYearDayTicks();
	theme.clock.drawMonthDayTicks(displayDate.monthDayArray);
	theme.clock.drawDateLabel(displayDate.object);

	theme.clock.drawHands(displayDate, drawMonthHand=true);

}/* drawClock */



function formatLabel(labelType, data) {
	let result;
	switch(labelType) {
		case 'month'    : result = `${data.name.slice(0,3)}`    ; break;
		case 'date'     : result = `${data.date.getFullYear()}` ; break;
		default         : result = data.name; break;
	}
	return result;
}
