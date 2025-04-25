//
// Lightning theme
//

theme.clock.viewBox           = padViewBox(75);
//theme.clock.viewBox				= '-800 -800 1600 1600';
theme.clock.clockRadius        = 1250;


theme.clock.quarterRadiusStart = 0;
theme.clock.quarterRadiusEnd   = 450;
theme.clock.monthRadiusStart  = 350;
theme.clock.monthRadiusEnd    = 850;
theme.clock.dayRadiusStart    = 750;
theme.clock.dayRadiusEnd      = 1200;


theme.clock.dateLabelRadius     = 575;
theme.clock.dateLabelPosition   = new Point(10, theme.clock.dateLabelRadius);  // tiny tweak to horizontal position here, having trouble centering it properly
theme.clock.yearLabelPosition   = new Point(0, -theme.clock.dateLabelRadius);



theme.clock.monthLabelRadius  = 1000;
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
function formatDateLabel(date) { return `${(date.getMonth()+1).toString().padStart(2,'0')}-${date.getDate().toString().padStart(2,'0')}` }



/* Draw Clock
*/
theme.clock.drawClock = function(clockElement)
{
	// Set Up Drawing
	theme.clock.element = clockElement;
	theme.clock.drawFace();

	theme.clock.drawSectors('quarter', getQuarterArray(config.date.object), theme.clock.quarterRadiusStart, theme.clock.quarterRadiusEnd);

	theme.clock.drawMonthSectors(theme.clock.monthRadiusStart, theme.clock.monthRadiusEnd);

	theme.clock.drawPeriodDaySectors('yearDays', config.yearDayArray, theme.clock.dayRadiusStart, theme.clock.dayRadiusEnd);

	theme.clock.drawMonthLabels();
	theme.clock.drawYearLabel(config.date.object, theme.clock.yearLabelPosition);
	theme.clock.drawDateLabel(config.date.object);

}/* drawClock */



