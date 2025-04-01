//
// common-original
//
// A common theme for the original Brice and other variants base on it
//



/* Draw Clock
*/
theme.clock.drawClock = function()
{
	// Set Up Drawing
	theme.clock.element = document.getElementById('clock');

	theme.clock.drawFace();
	theme.clock.drawMonthSectors();
	theme.clock.drawMonthLabels();
	theme.clock.drawDayTicks();
	theme.clock.drawDateText();
	theme.clock.drawYearHand();

}/* drawClock */



theme.clock.drawFace = function() {
	const svg = `<circle cx="0" cy="0" r="${theme.clock.clockRadius}" class="face"></circle>`
	theme.clock.element.innerHTML += svg;
}


theme.clock.drawMonthSectors = function() {
	let newSvg = '';
	for (let month of config.months)
	{
		const sectorPath = sector(month.startAngle, month.endAngle, theme.clock.innerRadius, theme.clock.outerRadius );
		sectorSvg = `<path d="${sectorPath}" class="sector ${month.code}"></path>`;
		newSvg += sectorSvg;
	}
	theme.clock.element.innerHTML += `<g class="month sector">${newSvg}</g>`;
}/* drawMonthSectors */


/* drawMonthLabels
*/
theme.clock.drawMonthLabels = function() {
	newSvg = '';
	for (let month of config.months)
	{
		const center     = polarPoint(month.midAngle, theme.clock.monthLabelRadius);
		const invert    = (Math.cos(month.midAngle) < 0);
		const rotate    = degrees(month.midAngle) + ((invert) ? 180 : 0);
		const transform = `rotate(${rotate}, ${center.x}, ${center.y})`;

		const labelSvg =
			`<text x="${center.x}" y="${center.y}" transform="${transform}">${month.name}</text>`;
		newSvg += labelSvg;
	}
	theme.clock.element.innerHTML += `<g class="month label">${newSvg}</g>`;
}/* drawMonthLabels */



/* drawDayTicks
*/
theme.clock.drawDayTicks = function() {

	const weekdayTickInnerRadius = theme.clock.outerRadius - theme.clock.weekdayTickLength;
	const weekendTickInnerRadius = theme.clock.outerRadius - theme.clock.weekendTickLength

	let newSvg = '';

	for (let day of config.days)
	{
		const angle = dateRadians(day.date);

		if (day.first) // Draw long line
		{
			const first = radialLine(angle, theme.clock.outerRadius, theme.clock.innerRadius);
			const firstSvg =
				`<line data-date="${day.isoShort}" class="first" x1="${first.xStart}" y1="${first.yStart}" x2="${first.xEnd}" y2="${first.yEnd}" ></line>`;
			newSvg += firstSvg;
		}

		if (day.weekend)
		{
			const weekend = radialLine(angle, theme.clock.outerRadius, weekendTickInnerRadius);
			const weekendSvg =
				`<line data-date="${day.isoShort}" class="weekend" x1="${weekend.xStart}" y1="${weekend.yStart}" x2="${weekend.xEnd}" y2="${weekend.yEnd}"></line>`;
			newSvg += weekendSvg;
		}
		else // If neither weekend nor first day in month
		{
			const weekday = radialLine(angle, theme.clock.outerRadius, weekdayTickInnerRadius);
			const weekdaySvg =
				`<line data-date="${day.isoShort}" class="weekday" x1="${weekday.xStart}" y1="${weekday.yStart}" x2="${weekday.xEnd}" y2="${weekday.yEnd}"></line>`;
			newSvg += weekdaySvg;
		}
	}
	theme.clock.element.innerHTML += `<g class="day tick">${newSvg}</g>`;
}/* drawDayTicks */



theme.clock.drawDateText = function() {
	// Year Label
	const yearOnLeft = dateRatio(config.date) < 0.5
	const labelSide = yearOnLeft ? -1 : 1
	const x = theme.clock.innerRadius * 0.55 * labelSide;
	const y = 0;

	const svg = `<text x="${x}" y="${y}" class="label dateText">${config.year}</text>`;

	theme.clock.element.innerHTML += svg;
}


theme.clock.drawYearHand = function() {
	const path = `
		M 12 160
		L -12 160
		L 0, -${theme.clock.needleLength}
		Z
		M 30 0
		A 30,30 0 1 1 -30,00
		A 30,30 0 1 1 30,00`;
	const transform = svgRotateString(dateDegrees(config.date),0,0);
	const svg = `
		<g class="yearHand">
			<path d="${path}" transform="${transform}"></path>
		</g>`;
	theme.clock.element.innerHTML += svg;
}
