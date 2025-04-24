//
// common
//
// A common theme for the original Brice and other variants base on it
//

theme.clock.viewBox           = '-1200 -1200 2400 2400';
theme.clock.clockRadius       = 1200;
theme.clock.outerRadius       = 1120;
theme.clock.innerRadius       = 930;
theme.clock.monthLabelRadius  = 985;
theme.clock.weekdayMarkerLength = 40;
theme.clock.weekendMarkerLength = 55;
theme.clock.yearHandLength    = 1030;
theme.clock.dateLabelPosition         = 500;

theme.clock.monthLabel = {};
theme.clock.monthLabel.sectorPosition = 0.5;
theme.clock.monthLabel.rotate = true;
theme.clock.monthLabel.invert = true;




/* Draw Clock
*/
theme.clock.drawClock = function(clockElement)
{
	// Set Up Drawing
	theme.clock.element = clockElement;
	theme.clock.drawFace();
	theme.clock.drawMonthSectors();
	theme.clock.drawMonthLabels();
	theme.clock.drawYearDayTicks();
	theme.clock.drawDateLabel(config.date.object);
	theme.clock.drawHands();
}/* drawClock */



theme.clock.drawFace = function() {
	const svg = `<circle cx="0" cy="0" r="${theme.clock.clockRadius}" class="face"></circle>`
	theme.clock.element.innerHTML += svg;
}


theme.clock.drawMonthSectors = function(radiusStart=theme.clock.outerRadius, radiusEnd=theme.clock.innerRadius) {
	let newSvg = '';
	for (let month of config.months)
	{
		const sectorPath = sector(month.radiansStart, month.radiansEnd, radiusStart, radiusEnd);
		sectorSvg = `<path d="${sectorPath}" class="sector ${month.code}"></path>`;
		newSvg += sectorSvg;
	}
	theme.clock.element.innerHTML += `<g class="month sector">${newSvg}</g>`;
}/* drawMonthSectors */


/* drawMonthLabels
*/
theme.clock.drawMonthLabels = function() {
	let newSvg = '';
	for (let month of config.months)
	{
		const radiansLabel = month.radiansStart + (month.radiansWidth * theme.clock.monthLabel.sectorPosition);

		const center     = polarPoint(radiansLabel, theme.clock.monthLabelRadius);
		let transform = '';

		if (theme.clock.monthLabel.rotate)
		{
			const invert    = (Math.cos(radiansLabel) < 0);
			const rotate    = degrees(radiansLabel) + ((invert) ? 180 : 0);
			transform = `rotate(${rotate}, ${center.x}, ${center.y})`;
		}
		const labelSvg =
			`<text x="${center.x}" y="${center.y}" transform="${transform}">${formatMonth(month.name)}</text>`;
		newSvg += labelSvg;
	}
	theme.clock.element.innerHTML +=
		`<g class="month label monthLabels">
			${newSvg}
		</g>`;
}/* drawMonthLabels */


function formatMonth(name) { return name }


/* drawYearDayTicks
*/
theme.clock.drawYearDayTicks = function() {

	const yearDayTicks = theme.clock.getPeriodDayTicks(config.yearDayArray);
	theme.clock.element.innerHTML += `
		<g class="day yearDay tick">
			${yearDayTicks}
		</g>`;
}/* drawYearDayTicks */



/* drawMonthDayTicks
*/
theme.clock.drawMonthDayTicks = function() {

	const monthDayTicks = theme.clock.getPeriodDayTicks(config.monthDayArray);
	theme.clock.element.innerHTML += `
		<g class="day monthDay tick">
			${monthDayTicks}
		</g>`;
}/* drawMonthDayTicks */



/* getPeriodDayTicks
*/
theme.clock.getPeriodDayTicks = function(periodArray) {

	const weekdayTickInnerRadius = theme.clock.outerRadius - theme.clock.weekdayMarkerLength;
	const weekendTickInnerRadius = theme.clock.outerRadius - theme.clock.weekendMarkerLength

	let result = '';
	let tickClass = '';
	let tickLine;
	let tickSvg;

	for (let day of periodArray)
	{
		let dayAngle = divisionRadians(periodArray.length, day.dayOfPeriod);

		if (day.isWeekend)
		{
			tickLine = radialLine(dayAngle.start, theme.clock.outerRadius, weekendTickInnerRadius);
			tickClass = 'weekend';
		}
		else // day.isWeekday
		{
			tickLine = radialLine(dayAngle.start, theme.clock.outerRadius, weekdayTickInnerRadius);
			tickClass = 'weekday';
		}

		tickSvg =
			`<line class="${tickClass}" data-number="${day.number}" data-date="${day.isoShort}" x1="${tickLine.xStart}" y1="${tickLine.yStart}" x2="${tickLine.xEnd}" y2="${tickLine.yEnd}" ></line>`;
		result += tickSvg;

		if (day.isFirst) // Draw an extra line for firsts of the month
		{
			tickLine = radialLine(dayAngle.start, theme.clock.outerRadius, theme.clock.innerRadius);
			tickClass = 'first';
			tickSvg =
				`<line class="${tickClass}" data-number="${day.number}" data-date="${day.isoShort}" x1="${tickLine.xStart}" y1="${tickLine.yStart}" x2="${tickLine.xEnd}" y2="${tickLine.yEnd}" ></line>`;
			result += tickSvg;
		}
	}

	return result;
}/* getPeriodDayTicks */



/* drawDateLabel
*/
theme.clock.drawDateLabel = function(date) {
	let x,y;

	if (theme.clock.dateLabelPosition instanceof Point)
	{
		x = theme.clock.dateLabelPosition.x;
		y = theme.clock.dateLabelPosition.y;
	}
	else
	{
		const yearOnLeft = dateRatio(date) < 0.5
		const labelSide = yearOnLeft ? -1 : 1
		x = theme.clock.dateLabelPosition * labelSide;
		y = 0;
	}

	const svg =
		`<g class="dateText">
			<text x="${x}" y="${y}" class="label dateText">${date.getFullYear()}</text>
		</g>`;

	theme.clock.element.innerHTML += svg;
}/* drawDateLabel */


/* drawYearLabel
*/
theme.clock.drawYearLabel = function(date, point) {
	const svg =
		`<g class="dateText">
			<text x="${point.x}" y="${point.y}" class="label dateText">${date.getFullYear()}</text>
		</g>`;
	theme.clock.element.innerHTML += svg;
}/* drawYearLabel */



/* drawHands
*/
theme.clock.drawHands = function(drawMonthHand) {

	// calculate year hand params
	const yearDayDivision = divisionDegrees(config.date.daysInYear, config.date.dayOfYear);
	const yearTransform = `rotate(${yearDayDivision.middle},0,0)`;
	// get year hand
	const yearHand = theme.clock.getHandPath(theme.clock.yearHandLength, yearTransform, 'yearHand', '');

	var monthHand = '';

	if (drawMonthHand) {
		// calculate month hand params
		const monthDayDivision = divisionDegrees(config.monthDayArray.length, config.date.object.getDate());
		const monthTransform = `rotate(${monthDayDivision.middle},0,0)`;
		// get month hand
		monthHand = theme.clock.getHandPath(theme.clock.monthHandLength, monthTransform, 'monthHand', '');
	}

	const svg = `
		<g class="hands">
			${yearHand}
			${monthHand}
		</g>`;
	theme.clock.element.innerHTML += svg;
}


/* getHandPath
*/
theme.clock.getHandPath = function(length, transform, cssClass, id) {
	const path = `
		M 12 160
		L -12 160
		L 0, -${length}
		Z
		M 30 0
		A 30,30 0 1 1 -30,00
		A 30,30 0 1 1 30,00`;
	const svg = `<path  id="${id}" class="${cssClass}" d="${path}" transform="${transform}"></path>`;
	return svg;
}


