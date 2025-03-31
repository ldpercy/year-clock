//
// Plain SVG
//

theme.clock.clockRadius       = 1170,
theme.clock.needleLength      = 950;
theme.clock.innerRadius       = 920;
theme.clock.outerRadius       = 1120;
theme.clock.monthLabelRadius  = 980;
theme.clock.weekdayTickLength = 40;
theme.clock.weekendTickLength = 55;


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
	theme.clock.drawYear();
	theme.clock.drawNeedle();

}/* drawClock */



theme.clock.drawFace = function() {
	const svg = `<circle cx="0" cy="0" r="${theme.clock.clockRadius}" class="face"></circle>`
	theme.clock.element.innerHTML += svg;
}


theme.clock.drawMonthSectors = function() {
	// Draw Months
	for (let month of config.months)
	{
		const startAngle = dateRadians(month.startDate);
		const endAngle   = dateRadians(month.endDate);
		// Month sector
		const sectorPath = sector(startAngle, endAngle, theme.clock.innerRadius, theme.clock.outerRadius );
		sectorSvg = `<path d="${sectorPath}" class="sector month ${month.code}"></path>`;
		theme.clock.element.innerHTML += sectorSvg;
	}
}/* drawMonths */



theme.clock.drawMonthLabels = function() {
	// Draw Months
	for (let month of config.months)
	{
		const startAngle = dateRadians(month.startDate);
		const endAngle   = dateRadians(month.endDate);
		const midAngle   = midpoint(startAngle,endAngle);
		const center     = polarPoint(midAngle, theme.clock.monthLabelRadius);
		// Month Label
		const invert    = (Math.cos(midAngle) < 0);
		const rotate    = degrees(midAngle) + ((invert) ? 180 : 0);
		const transform = `rotate(${rotate}, ${center.x}, ${center.y})`;

		const labelSvg =
			`<text x="${center.x}" y="${center.y}" class="label month" transform="${transform}">${month.name}</text>`;
		theme.clock.element.innerHTML += labelSvg;
	}
}/* drawMonths */




theme.clock.drawDayTicks = function() {

	const weekdayTickInnerRadius = theme.clock.outerRadius - theme.clock.weekdayTickLength;
	const weekendTickInnerRadius = theme.clock.outerRadius - theme.clock.weekendTickLength

	for (let day of config.days)
	{
		const angle = dateRadians(day.date);

		if (!day.weekend && !day.first) // If neither weekend nor first day in month
		{
			const weekday = radialLine(angle, weekdayTickInnerRadius, theme.clock.outerRadius);
			const weekdaySvg = `<line x1="${weekday.xStart}" y1="${weekday.yStart}" x2="${weekday.xEnd}" y2="${weekday.yEnd}" class="tick day weekday"></line>`;
			theme.clock.element.innerHTML += weekdaySvg;
		}
		else if (day.weekend)
		{
			const weekend = radialLine(angle, weekendTickInnerRadius, theme.clock.outerRadius);
			const weekendSvg = `<line x1="${weekend.xStart}" y1="${weekend.yStart}" x2="${weekend.xEnd}" y2="${weekend.yEnd}" class="tick day weekend"></line>`;
			theme.clock.element.innerHTML += weekendSvg;
		}
		else if (day.first) // If first day in month
		{
			const first = radialLine(angle, theme.clock.innerRadius, theme.clock.outerRadius);
			const firstSvg = `<line x1="${first.xStart}" y1="${first.yStart}" x2="${first.xEnd}" y2="${first.yEnd}" class="tick day first"></line>`;
			theme.clock.element.innerHTML += firstSvg;
		}
	}
}/* dayTicks */



theme.clock.drawYear = function() {
	// Year Label
	const yearOnLeft = dateRatio(config.date) < 0.5
	const labelSide = yearOnLeft ? -1 : 1
	const x = theme.clock.innerRadius * 0.55 * labelSide;
	const y = 0;

	const svg = `<text x="${x}" y="${y}" class="label year">${config.year}</text>`;

	theme.clock.element.innerHTML += svg;
}


theme.clock.drawNeedle = function() {
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
		<g class="needle">
			<path d="${path}" transform="${transform}"></path>
		</g>`;
	theme.clock.element.innerHTML += svg;
}
