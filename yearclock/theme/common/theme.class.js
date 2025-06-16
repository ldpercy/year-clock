/* common
*/
themeClass['common'] = class extends ThemeBase {


	viewBox           = '-1200 -1200 2400 2400';
	clockRadius       = 1200;
	outerRadius       = 1120;
	innerRadius       = 930;

	weekdayMarkerLength = 40;
	weekendMarkerLength = 55;
	yearHandLength      = 1030;
	dateLabelPosition   = 500;

	monthLabel = {
		radius         : 985,
		sectorPosition : 0.5,
		rotate         : true,
		invert         : true,
	};


	/* Draw Clock
	* /
	drawClock = function(clockElement, displayDate)
	{
		// Set Up Drawing
		theme.clock.element = clockElement;
		//theme.clock.drawViewbox();
		theme.clock.drawFace();
		theme.clock.drawMonthSectors(displayDate.monthArray);
		theme.clock.drawMonthLabels(displayDate.monthArray);
		theme.clock.drawYearDayTicks(displayDate.yearDayArray);
		theme.clock.drawDateLabel(displayDate.object);
		theme.clock.drawHands(displayDate);
	}/ * drawClock */


}/* common */