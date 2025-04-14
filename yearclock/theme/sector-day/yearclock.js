//
// sector-day theme styles
//

theme.clock.clockRadius       = 1170,

theme.clock.innerRadius       = 800;
theme.clock.outerRadius       = 1150;

theme.clock.weekdayMarkerLength = 40;
theme.clock.weekendMarkerLength = 55;

theme.clock.dateLabel         = new Point(0,430);

theme.clock.monthLabelRadius  = 950;
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

	const monthDayTicks = theme.clock.getPeriodDayTicks(config.monthDayArray);
	theme.clock.element.innerHTML += `
		<g class="day monthDay sector">
			${monthDayTicks}
		</g>`;
}/* drawMonthDaySectors */


/* getPeriodDaySectors
*/
theme.clock.getPeriodDaySectors = function(periodArray) {

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

		if (day.isWeekend)
		{
			tickClass = 'weekend';
		}
		else // day.isWeekday
		{
			tickClass = 'weekday';
		}

		if (day.isFirst) // Draw an extra line for firsts of the month
		{
			tickClass += ' first';
		}

		const sectorPath = sector(thisDivisionRadians.radiansStart, thisDivisionRadians.radiansEnd, theme.clock.innerRadius, theme.clock.outerRadius );
		sectorSvg = `<path d="${sectorPath}" class="sector ${month.code}"></path>`;

		tickSvg =
			`<line class="${tickClass}" data-number="${day.number}" data-date="${day.isoShort}" x1="${tickLine.xStart}" y1="${tickLine.yStart}" x2="${tickLine.xEnd}" y2="${tickLine.yEnd}" ></line>`;
		result += tickSvg;
	}

	return result;
}/* getPeriodDaySectors */


