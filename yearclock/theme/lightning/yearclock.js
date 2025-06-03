//
// Lightning theme
//

theme.clock.viewBox           = padViewBox(125);
//theme.clock.viewBox				= '-800 -800 1600 1600';
theme.clock.clockRadius        = 1250;

theme.clock.body = {
	x       : -1300,
	y       : -1300,
	width   : 2600,
	height  : 2600,
	radius  : 100,
};



theme.clock.overlap = 10;		// amount by which rings overshoot their natural divisions


theme.clock.quarterRadiusStart  = 0;
theme.clock.quarterRadiusEnd    = 300 + theme.clock.overlap;
theme.clock.monthRadiusStart    = 300 - theme.clock.overlap;
theme.clock.monthRadiusEnd      = 600 + theme.clock.overlap;
theme.clock.weekRadiusStart     = 600 - theme.clock.overlap;
theme.clock.weekRadiusEnd       = 900 + theme.clock.overlap;
theme.clock.dayRadiusStart      = 900 - theme.clock.overlap;
theme.clock.dayRadiusEnd        = 1200;

//theme.clock.yearLabelPosition   = new Point(0, 0);
theme.clock.yearLabelPosition   = new Point(-1200, -1200);
theme.clock.dateLabelPosition   = new Point( 1200, -1200);
theme.clock.weekLabelPosition   = new Point(-1200,  1200);
theme.clock.dayLabelPosition    = new Point( 1200,  1200);

theme.clock.quarterLabel = {};
theme.clock.quarterLabel.radius         = 175;
theme.clock.quarterLabel.sectorPosition = 0.5;
theme.clock.quarterLabel.rotate         = 'radial-left';
theme.clock.quarterLabel.invert         = 'left';

theme.clock.monthLabel = {};
theme.clock.monthLabel.radius         = 450;
theme.clock.monthLabel.sectorPosition = 0.5;
theme.clock.monthLabel.rotate         = 'radial-left';
theme.clock.monthLabel.invert         = 'left';

theme.clock.weekLabel = {};
theme.clock.weekLabel.radius         = 750;
theme.clock.weekLabel.sectorPosition = 0.5;
theme.clock.weekLabel.rotate         = 'radial-left';
theme.clock.weekLabel.invert         = 'left';


theme.clock.dayLabel = {};
theme.clock.dayLabel.radius         = 1050;
theme.clock.dayLabel.sectorPosition = 0.5;
theme.clock.dayLabel.rotate         = 'radial-left';
theme.clock.dayLabel.invert         = 'left';


//
// formatting functions
//


function formatTitle(type, data) {
	let result;
	switch(type) {
		case 'yearDay'  : result = `${data.name} ${data.dayOfYear}`; break;
		case 'quarter'  : result = `${data.name}`; break;
		case 'week'     : result = `W${data.name}: ${isoDate(data.dateStart)} - ${isoDate(data.dateEnd)}`; break;
		case 'day'      : result = `${data.isoShort} - ${data.name} - d${data.dayOfYear}`; break;
		default         : result = data.name; break;
	}
	return result;
}

function formatLabel(labelType, data) {
	let result;
	switch(labelType) {
		case 'yearDay'  : result = `${data.name.slice(0,2)}`; break;
		case 'quarter'  : result = `${data.name}`; break;
		case 'month'    : result = `${data.name.slice(0,3)}`; break;
		case 'week'     : result = `W${data.name}`; break;
		case 'date'     : result = `${isoMonthDay(data.date)}`; break;
		case 'year'     : result = `${data.date.getFullYear()}`; break;
		default         : result = data.name; break;
	}
	return result;
}





/* drawClock
*/
theme.clock.drawClock = function(clockElement, displayDate)
{
	let quarterArray = getQuarterArray(displayDate.object);
	let weekArray    = getYearWeekArray(displayDate.object);

	const clockBody = `
		${theme.clock.getBody(theme.clock.body)}
		${theme.clock.getSectors('quarter', quarterArray, theme.clock.quarterRadiusStart, theme.clock.quarterRadiusEnd)}
		${theme.clock.getMonthSectors(displayDate.monthArray, theme.clock.monthRadiusStart, theme.clock.monthRadiusEnd)}
		${theme.clock.getSectors('week', weekArray, theme.clock.weekRadiusStart, theme.clock.weekRadiusEnd)}
		${theme.clock.getPeriodDaySectors('yearDay', displayDate.yearDayArray, theme.clock.dayRadiusStart, theme.clock.dayRadiusEnd)}

		${theme.clock.getSectorLabels('quarter', quarterArray, theme.clock.quarterLabel)}
		${theme.clock.getMonthLabels(displayDate.monthArray)}
		${theme.clock.getSectorLabels('week', weekArray, theme.clock.weekLabel)}
		${theme.clock.getSectorLabels('yearDay', displayDate.yearDayArray, theme.clock.dayLabel)}

		${theme.clock.getYearLabel(displayDate.object, theme.clock.yearLabelPosition)}
		${theme.clock.getDateLabel(displayDate.object)}

	`;

	clockElement.innerHTML = clockBody;
}/* drawClock */



theme.clock.getBody = function(body=theme.clock.body) {

	const svg =
		`<rect class="body" x="${body.x}" y="${body.y}" width="${body.width}" height="${body.height}" rx="${body.radius}" ry="${body.radius}"></rect>`;

	return svg;
}


