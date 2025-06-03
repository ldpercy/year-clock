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



/* getClockSVG
*/
theme.clock.getClockSVG = function(displayDate)
{
	// Set Up Drawing
	let weekArray    = getYearWeekArray(displayDate.object);

	const clockSVG = `
		<svg id="clock" class="yearclock" viewBox="${theme.clock.viewBox}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
			${theme.clock.getFace()}
			${theme.clock.getSectorLabels('week', weekArray, theme.clock.weekLabel)}
			${theme.clock.getSectors('week', weekArray, theme.clock.weekRadiusStart, theme.clock.weekRadiusEnd)}
			${theme.clock.getSectorLabels('yearDay', displayDate.yearDayArray, theme.clock.dayLabel)}
			${theme.clock.getPeriodDaySectors('yearDay', displayDate.yearDayArray, theme.clock.dayRadiusStart, theme.clock.dayRadiusEnd)}
		</svg>
	`;

	return clockSVG;
}/* getClockSVG */