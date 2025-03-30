//
// yearclock.js
//


// Clock Style
theme.clockStyle = {
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
theme.drawClock = function()
{
	// Set Up Drawing
	const drawing = Snap("#clock")

	theme.draw.face(drawing);
	theme.draw.months(drawing);
	theme.draw.dayTicks(drawing);
	theme.draw.year(drawing);
	theme.draw.needle(drawing);

}/* drawClock */


theme.draw.face = function(drawing) {
	drawing.circle(0, 0, theme.clockStyle.clockRadius)
		.addClass('face year');
}


theme.draw.months = function(drawing) {
	// Draw Months
	for (let month of config.months)
	{
		const startAngle = dateRadians(month.startDate)
		const endAngle   = dateRadians(month.endDate)

		// Month sector

		sector(drawing, startAngle, endAngle, theme.clockStyle.innerRadius, theme.clockStyle.outerRadius )
			.addClass("sector month")
			.addClass(month.code)

		// Month Label

		const midAngle = midpoint(startAngle,endAngle) + (Math.TAU * 0.25)
		const upsideDown = Math.cos(midAngle) < 0

		const yOffset    = upsideDown ? theme.clockStyle.monthLabelRadius : 0 - theme.clockStyle.monthLabelRadius
		const labelAngle = upsideDown ? midAngle + Math.PI          : midAngle

		drawing.text(0, yOffset, month.name)
			.addClass("label month")
			.attr({
				'transform': svgRotateString(Snap.deg(labelAngle),0,0)
			})
	}
}/* drawMonths */



theme.draw.dayTicks = function(drawing) {
	// Day Ticks
	for (let day of config.days)
	{
		const angle = dateRadians(day.date)

		if (day.first) // If first day in month
		{
			// Draw First Tick
			radialLine(drawing, angle, theme.clockStyle.innerRadius, theme.clockStyle.outerRadius)
				.addClass("tick day first")
		}

		if (!day.weekend && !day.first) // If neither weekend nor first day in month
		{
			// Draw a standard day tick
			const tickInnerRadius = theme.clockStyle.outerRadius -theme.clockStyle.weekdayTickLength

			radialLine(drawing, angle, tickInnerRadius, theme.clockStyle.outerRadius)
				.addClass("tick day weekday")
		}

		if (day.weekend)
		{
			// Draw a weekend tick
			const tickInnerRadius = theme.clockStyle.outerRadius -theme.clockStyle.weekendTickLength

			radialLine(drawing, angle, tickInnerRadius, theme.clockStyle.outerRadius)
				.addClass("tick day weekend")
		}
	}
}/* dayTicks */



theme.draw.year = function(drawing) {
	// Year Label
	const yearOnLeft = dateRatio(config.now) < 0.5
	const labelSide = yearOnLeft ? -1 : 1

	drawing.text(theme.clockStyle.innerRadius * 0.55 * labelSide, 0, config.year)
		.addClass("label year")
}



theme.draw.needle = function(drawing) {
	// Needle
	const needlePathString = `
		M 12 160
		L -12 160
		L 0, -${theme.clockStyle.needleLength}
		Z
		M 30 0
		A 30,30 0 1 1 -30,00
		A 30,30 0 1 1 30,00`;

	const needleTransformString = svgRotateString(dateDegrees(config.now),0,0);

	drawing.path(needlePathString)
		.transform(needleTransformString)
		.addClass("needle year");
}