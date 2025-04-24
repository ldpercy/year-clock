//
// season-out theme styles
//

theme.clock.viewBox           = padViewBox(30);
theme.clock.clockRadius       = 1200,


theme.clock.seasonRadiusStart = 0;
theme.clock.seasonRadiusEnd   = 400;
theme.clock.monthRadiusStart  = 400;
theme.clock.monthRadiusEnd    = 820;
theme.clock.dayRadiusStart    = 780;
theme.clock.dayRadiusEnd      = 1200;


theme.clock.lengthWeekday = 40;
theme.clock.lengthWeekend = 55;

theme.clock.dateLabel         = new Point(0,430);

theme.clock.monthLabelRadius  = 1000;
theme.clock.monthLabel = {};
theme.clock.monthLabel.sectorPosition = 0.5;
theme.clock.monthLabel.rotate = false;
theme.clock.monthLabel.invert = false;

theme.clock.yearHandLength    = 800;
theme.clock.monthHandLength    = 850;


/* Draw Clock
*/
theme.clock.drawClock = function(clockElement)
{
	// Set Up Drawing
	theme.clock.element = clockElement;
	theme.clock.drawFace();
	theme.clock.drawMonthSectors(theme.clock.monthRadiusStart, theme.clock.monthRadiusEnd);

	theme.clock.drawPeriodDaySectors('yearDays', config.yearDayArray, theme.clock.dayRadiusStart, theme.clock.dayRadiusEnd);

	theme.clock.drawMonthLabels();
	theme.clock.drawDateText(config.date.object);
	theme.clock.drawHands(drawMonthHand=false);

}/* drawClock */



function formatMonth(name) { return name.slice(0,3) }




/* drawPeriodDaySectors
*/
theme.clock.drawPeriodDaySectors = function(name, periodArray, radiusStart, radiusEnd) {

	log('drawPeriodDaySectors');
	const periodDaySectors = theme.clock.getPeriodDaySectors(periodArray, radiusStart, radiusEnd);
	theme.clock.element.innerHTML += `
		<g class="periodSectors ${name}">
			${periodDaySectors}
		</g>`;
}/* drawPeriodDaySectors */


/* getPeriodDaySectors
*/
theme.clock.getPeriodDaySectors = function(periodArray, radiusStart, radiusEnd) {
	// log('getPeriodDaySectors');

	let result = '';
	let markerClass = '';
	let markerLine;
	let markerSvg = '';
	let sectorPath = '';

	for (let day of periodArray)
	{
		let thisDivisionRadians = divisionRadians(periodArray.length, day.dayOfPeriod);

		log(thisDivisionRadians);

		if (day.isWeekend)
		{
			markerClass = 'weekend';
		}
		else // day.isWeekday
		{
			markerClass = 'weekday';
		}

		if (day.isFirst) // Draw an extra line for firsts of the month
		{
			markerClass += ' first';
		}
		log(day);
		const sectorPath = sector(thisDivisionRadians.start, thisDivisionRadians.end, radiusStart, radiusEnd);
		sectorSvg = `<path class="sector day ${markerClass} ${day.name}" data-number="${day.dayOfPeriod}" d="${sectorPath}"><title>${day.name} ${day.isoShort}</title></path>`;

		result += sectorSvg;
	}

	return result;
}/* getPeriodDaySectors */


