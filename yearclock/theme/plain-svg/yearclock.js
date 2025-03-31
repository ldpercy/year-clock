//
// Plain SVG
//

theme.clock.clockRadius      = 1170,
theme.clock.needleLength     = 950;
theme.clock.innerRadius      = 920;
theme.clock.outerRadius      = 1120;
theme.clock.monthLabelRadius = 980;



/* Draw Clock
*/
theme.clock.drawClock = function()
{
	// Set Up Drawing
	theme.clock.element = document.getElementById('clock');

	theme.clock.drawFace();
	theme.clock.drawMonths();
	//theme.clock.drawDayTicks();
	theme.clock.drawYear();
	theme.clock.drawNeedle();

}/* drawClock */



theme.clock.drawFace = function() {
	const svg = `<circle cx="0" cy="0" r="${theme.clock.clockRadius}" class="face"></circle>`
	theme.clock.element.innerHTML += svg;
}


theme.clock.drawMonths = function() {
	// Draw Months
	for (let month of config.months)
	{
		const startAngle = dateRadians(month.startDate);
		const endAngle   = dateRadians(month.endDate);

		// Month sector
		const sectorPath = sector(startAngle, endAngle, theme.clock.innerRadius, theme.clock.outerRadius );
		sectorSvg = `<path d="${sectorPath}" class="sector month ${month.code}"></path>`;
		theme.clock.element.innerHTML += sectorSvg;

		// Month Label
		const midAngle = midpoint(startAngle,endAngle) + (Math.TAU * 0.25);
		const upsideDown = Math.cos(midAngle) < 0;

		const yOffset        = upsideDown ? theme.clock.monthLabelRadius : 0 - theme.clock.monthLabelRadius;
		const labelAngle     = upsideDown ? midAngle + Math.PI          : midAngle;
		const labelTransform = svgRotateString(Snap.deg(labelAngle),0,0);;

		const labelSvg = `<text x="0" y="${yOffset}" class="label month" transform="${labelTransform}">${month.name}</text>`;
		theme.clock.element.innerHTML += labelSvg;
	}
}/* drawMonths */






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
