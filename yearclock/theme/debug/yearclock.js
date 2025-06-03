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



/* drawClock
*/
theme.clock.drawClock = function(clockElement, displayDate)
{
	// Set Up Drawing
	let weekArray    = getYearWeekArray(displayDate.object);

	const clockBody = `
		${theme.clock.getFace()}
		${theme.clock.getSectorLabels('week', weekArray, theme.clock.weekLabel)}
		${theme.clock.getSectors('week', weekArray, theme.clock.weekRadiusStart, theme.clock.weekRadiusEnd)}
		${theme.clock.getSectorLabels('yearDay', displayDate.yearDayArray, theme.clock.dayLabel)}
		${theme.clock.getPeriodDaySectors('yearDay', displayDate.yearDayArray, theme.clock.dayRadiusStart, theme.clock.dayRadiusEnd)}
	`;

	clockElement.innerHTML = clockBody;

}/* drawClock */