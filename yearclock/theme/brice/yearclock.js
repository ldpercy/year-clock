//
// yearclock.js
//


// Clock parameters
theme.clock = {
	clockRadius       : 1200,
	outerRadius       : 1120,
	innerRadius       : 920,
	monthLabelRadius  : 980,	// how far out from the center the month-titles are positioned
	weekdayTickLength : 40,
	weekendTickLength : 55,
	needleLength      : 1000,
};



/* Draw Clock
*/
theme.clock.drawClock = function()
{
	// Set Up Drawing
	theme.clock.drawing = Snap("#clock");

	theme.clock.drawFace();
	theme.clock.drawMonths();
	theme.clock.drawDayTicks();
	theme.clock.drawYear();
	theme.clock.drawNeedle();

}/* drawClock */


theme.clock.drawFace = function() {
	theme.clock.drawing.circle(0, 0, theme.clock.clockRadius)
		.addClass('face year');
}


theme.clock.drawMonths = function() {
	// Draw Months
	for (let month of config.months)
	{
		const startAngle = dateRadians(month.startDate)
		const endAngle   = dateRadians(month.endDate)

		// Month sector

		snapSector(theme.clock.drawing, startAngle, endAngle, theme.clock.innerRadius, theme.clock.outerRadius )
			.addClass("sector month")
			.addClass(month.code)

		// Month Label

		const midAngle = midpoint(startAngle,endAngle) + (Math.TAU * 0.25)
		const upsideDown = Math.cos(midAngle) < 0

		const yOffset    = upsideDown ? theme.clock.monthLabelRadius : 0 - theme.clock.monthLabelRadius
		const labelAngle = upsideDown ? midAngle + Math.PI          : midAngle

		theme.clock.drawing.text(0, yOffset, month.name)
			.addClass("label month")
			.attr({
				'transform': svgRotateString(Snap.deg(labelAngle),0,0)
			})
	}
}/* drawMonths */



theme.clock.drawDayTicks = function() {
	// Day Ticks
	for (let day of config.days)
	{
		const angle = dateRadians(day.date)

		if (day.first) // If first day in month
		{
			// Draw First Tick
			radialLine(theme.clock.drawing, angle, theme.clock.innerRadius, theme.clock.outerRadius)
				.addClass("tick day first")
		}

		if (!day.weekend && !day.first) // If neither weekend nor first day in month
		{
			// Draw a standard day tick
			const tickInnerRadius = theme.clock.outerRadius -theme.clock.weekdayTickLength

			radialLine(theme.clock.drawing, angle, tickInnerRadius, theme.clock.outerRadius)
				.addClass("tick day weekday")
		}

		if (day.weekend)
		{
			// Draw a weekend tick
			const tickInnerRadius = theme.clock.outerRadius -theme.clock.weekendTickLength

			radialLine(theme.clock.drawing, angle, tickInnerRadius, theme.clock.outerRadius)
				.addClass("tick day weekend")
		}
	}
}/* dayTicks */



theme.clock.drawYear = function() {
	// Year Label
	const yearOnLeft = dateRatio(config.date) < 0.5
	const labelSide = yearOnLeft ? -1 : 1

	theme.clock.drawing.text(theme.clock.innerRadius * 0.55 * labelSide, 0, config.year)
		.addClass("label year")
}



theme.clock.drawNeedle = function() {
	// Needle
	const needlePathString = `
		M 12 160
		L -12 160
		L 0, -${theme.clock.needleLength}
		Z
		M 30 0
		A 30,30 0 1 1 -30,00
		A 30,30 0 1 1 30,00`;

	const needleTransformString = svgRotateString(dateDegrees(config.date),0,0);

	theme.clock.drawing.path(needlePathString)
		.transform(needleTransformString)
		.addClass("needle year");
}