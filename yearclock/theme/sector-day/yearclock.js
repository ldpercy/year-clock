//
// sector-day theme styles
//

theme.clock.clockRadius       = 1170,

theme.clock.innerRadius       = 900;
theme.clock.outerRadius       = 1150;

theme.clock.weekdayMarkerLength = 40;
theme.clock.weekendMarkerLength = 55;

theme.clock.dateLabel         = new Point(0,430);

theme.clock.monthLabelRadius  = 1000;
theme.clock.monthLabel = {};
theme.clock.monthLabel.sectorPosition = 0.5;
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
	theme.clock.drawMonthSectors();
	theme.clock.drawMonthLabels();
	//theme.clock.drawYearDayTicks();
	//theme.clock.drawMonthDayTicks();

	theme.clock.drawMonthDaySectors();

	theme.clock.drawDateText(config.date.object);

	theme.clock.drawHands(drawMonthHand=true);

}/* drawClock */



function formatMonth(name) { return name.slice(0,3) }




/* drawMonthDaySectors
*/
theme.clock.drawMonthDaySectors = function() {

	log('drawMonthDaySectors');
	const monthDayTicks = theme.clock.getPeriodDaySectors(config.monthDayArray);
	theme.clock.element.innerHTML += `
		<g class="day monthDay sector">
			${monthDayTicks}
		</g>`;
}/* drawMonthDaySectors */


/* getPeriodDaySectors
*/
theme.clock.getPeriodDaySectors = function(periodArray) {
	log('getPeriodDaySectors');
	const weekdayTickInnerRadius = theme.clock.outerRadius - theme.clock.weekdayMarkerLength;
	const weekendTickInnerRadius = theme.clock.outerRadius - theme.clock.weekendMarkerLength

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

		const sectorPath = sector(thisDivisionRadians.start, thisDivisionRadians.end, theme.clock.innerRadius-100, theme.clock.innerRadius);
		log(sectorPath);
		sectorSvg = `<path class="sector ${markerClass}" data-number="${day.dayOfPeriod}" d="${sectorPath}" ></path>`;

		result += sectorSvg;
	}

	return result;
}/* getPeriodDaySectors */


