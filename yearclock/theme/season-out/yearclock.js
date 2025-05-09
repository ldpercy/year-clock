//
// season-out theme styles
//

theme.clock.viewBox           = padViewBox(75);
//theme.clock.viewBox				= '-800 -800 1600 1600';
theme.clock.clockRadius        = 1250;


theme.clock.seasonRadiusStart = 0;
theme.clock.seasonRadiusEnd   = 450;
theme.clock.monthRadiusStart  = 350;
theme.clock.monthRadiusEnd    = 850;
theme.clock.dayRadiusStart    = 750;
theme.clock.dayRadiusEnd      = 1200;


theme.clock.dateLabelRadius     = 575;
theme.clock.dateLabelPosition   = new Point(10, theme.clock.dateLabelRadius);  // tiny tweak to horizontal position here, having trouble centering it properly
theme.clock.yearLabelPosition   = new Point(0, -theme.clock.dateLabelRadius);

theme.clock.monthLabel = {};
theme.clock.monthLabel.radius         = 1000;
theme.clock.monthLabel.sectorPosition = 0.5;
theme.clock.monthLabel.rotate         = false;
theme.clock.monthLabel.invert         = false;

theme.clock.yearHandLength    = 800;
theme.clock.monthHandLength    = 850;


//
// formatting functions
//

function formatLabel(labelType, data) {
	let result;
	switch(labelType) {
		case 'month'    : result = `${data.name.slice(0,3)}`; break;
		case 'date'     : result = `${(data.date.getMonth()+1).toString().padStart(2,'0')}-${data.date.getDate().toString().padStart(2,'0')}`; break;
		case 'year'     : result = `${data.date.getFullYear()}`; break;
		default         : result = data.name; break;
	}
	return result;
}

function formatTitle(type, data) {
	let result;
	switch(type) {
		case 'yearDay'  : result = `${data.name} ${data.dayOfYear}`; break;
		case 'quarter'  : result = `${data.name}`; break;
		case 'week'     : result = `W${data.name}: ${isoDate(sector.dateStart)} - ${isoDate(sector.dateEnd)}`; break;
		case 'day'      : result = `${data.isoShort} - ${data.name} - d${data.dayOfYear}`; break;
		case 'hands'    : result = `${isoDate(data.date.object)} - ${data.date.name} - d${data.date.dayOfYear}`; break;
		default         : result = data.name; break;
	}
	return result;
}



/* Draw Clock
*/
theme.clock.drawClock = function(clockElement, displayDate)
{
	// Set Up Drawing
	theme.clock.element = clockElement;
	theme.clock.drawFace();

	theme.clock.drawSectors('season', displayDate.seasonArray, theme.clock.seasonRadiusStart, theme.clock.seasonRadiusEnd);

	theme.clock.drawMonthSectors(displayDate.monthArray, theme.clock.monthRadiusStart, theme.clock.monthRadiusEnd);

	theme.clock.drawPeriodDaySectors('yearDay', displayDate.yearDayArray, theme.clock.dayRadiusStart, theme.clock.dayRadiusEnd);

	theme.clock.drawMonthLabels(displayDate.monthArray);
	theme.clock.drawYearLabel(displayDate.object, theme.clock.yearLabelPosition);
	theme.clock.drawDateLabel(displayDate.object);

	theme.clock.drawHands(displayDate, drawMonthHand=false);

}/* drawClock */



