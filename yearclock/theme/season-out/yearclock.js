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



theme.clock.monthLabelRadius  = 975;
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

	theme.clock.drawSeasonSectors(config.seasonArray, theme.clock.seasonRadiusStart, theme.clock.seasonRadiusEnd);

	theme.clock.drawMonthSectors(theme.clock.monthRadiusStart, theme.clock.monthRadiusEnd);

	theme.clock.drawPeriodDaySectors('yearDays', config.yearDayArray, theme.clock.dayRadiusStart, theme.clock.dayRadiusEnd);

	theme.clock.drawMonthLabels();
	theme.clock.drawYearLabel(config.date.object, theme.clock.yearLabelPosition);
	theme.clock.drawDateLabel(config.date.object);

	theme.clock.drawHands(drawMonthHand=false);

}/* drawClock */




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

		//log(thisDivisionRadians);

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
		//log(day);
		const sectorPath = sector(thisDivisionRadians.start, thisDivisionRadians.end, radiusStart, radiusEnd);
		sectorSvg = `<path class="sector day ${markerClass} ${day.name}" d="${sectorPath}"><title>${day.name} - ${day.isoShort}</title></path>`;

		result += sectorSvg;
	}

	return result;
}/* getPeriodDaySectors */



theme.clock.drawSeasonSectors = function(seasonArray, radiusStart, radiusEnd) {

	let newSvg = '';
	for (let season of seasonArray)
	{
		//const seasonRadians = divisionRadians(periodArray.length, day.dayOfPeriod);

		const sectorPath = sector(season.radians.start, season.radians.end, radiusStart, radiusEnd);
		sectorSvg = `<path d="${sectorPath}" class="sector ${season.name}"></path>`;
		newSvg += sectorSvg;
	}
	theme.clock.element.innerHTML += `<g class="season">${newSvg}</g>`;
}