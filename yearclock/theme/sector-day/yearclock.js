//
// sector-day theme styles
//

theme.clock.viewBox           = padViewBox(30);
theme.clock.clockRadius       = 1200,

theme.clock.innerRadius       = 900;
theme.clock.outerRadius       = 1150;

theme.clock.weekdayMarkerLength = 40;
theme.clock.weekendMarkerLength = 55;

theme.clock.dateLabelPosition         = new Point(0,430);

theme.clock.monthLabel = {};
theme.clock.monthLabel.radius         = 1000;
theme.clock.monthLabel.sectorPosition = 0.5;
theme.clock.monthLabel.rotate         = false;
theme.clock.monthLabel.invert         = false;

theme.clock.yearHandLength    = 600;
theme.clock.monthHandLength    = 850;


/* getClockSVG
*/
theme.clock.getClockSVG = function(displayDate)
{
	displayDate.monthDayArray = getPeriodDayArray(startOfMonth(displayDate.object), nextMonth(displayDate.object), displayDate.object);

	const clockSVG = `
		<svg id="clock" class="yearclock" viewBox="${theme.clock.viewBox}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
			${theme.clock.getFace()}
			${theme.clock.getMonthSectors(displayDate.monthArray)}
			${theme.clock.getPeriodDaySectors('month', displayDate.monthDayArray, theme.clock.innerRadius, theme.clock.outerRadius)}
			${theme.clock.getMonthLabels(displayDate.monthArray)}
			${theme.clock.getDateLabel(displayDate.object)}
			${theme.clock.getHands(displayDate, drawMonthHand=true)}
		</svg>
	`;

	return clockSVG;
}/* getClockSVG */



function formatLabel(labelType, data) {
	let result;
	switch(labelType) {
		case 'month'    : result = `${data.name.slice(0,3)}`; break;
		case 'date'     : result = `${data.date.getFullYear()}`; break;
		default         : result = data.name; break;
	}
	return result;
}


