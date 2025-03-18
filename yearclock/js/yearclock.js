/* setup and draw
*/



/* Draw Clock
*/
function drawClock()
{
	// Set Up Drawing
	const drawing = Snap("#clock")

	drawing.circle(0, 0, config.clockRadius)
		.addClass('face year');

	// Draw Months
	for (let month of config.months)
	{
		const startAngle = dateRadians(month.startDate)
		const endAngle   = dateRadians(month.endDate)

		// Month sector

		sector(drawing, startAngle, endAngle, config.clockStyle.innerRadius, config.clockStyle.outerRadius )
			.addClass("sector month")
			.addClass(month.code)

		// Month Label

		const midAngle = midpoint(startAngle,endAngle) + (Math.TAU * 0.25)
		const upsideDown = Math.cos(midAngle) < 0

		const yOffset    = upsideDown ? config.clockStyle.monthLabelRadius : 0 - config.clockStyle.monthLabelRadius
		const labelAngle = upsideDown ? midAngle + Math.PI          : midAngle

		drawing.text(0, yOffset, month.name)
			.addClass("label month")
			.attr({
				'transform': svgRotateString(Snap.deg(labelAngle),0,0)
			})
	}

	// Day Ticks
	for (let day of config.days)
	{
		const angle = dateRadians(day.date)

		if (day.first) // If first day in month
		{
			// Draw First Tick
			radialLine(drawing, angle, config.clockStyle.innerRadius, config.clockStyle.outerRadius)
				.addClass("tick day first")
		}

		if (!day.weekend && !day.first) // If neither weekend nor first day in month
		{
			// Draw a standard day tick
			const tickInnerRadius = config.clockStyle.outerRadius -config.clockStyle.weekdayTickLength

			radialLine(drawing, angle, tickInnerRadius, config.clockStyle.outerRadius)
				.addClass("tick day weekday")
		}

		if (day.weekend)
		{
			// Draw a weekend tick
			const tickInnerRadius = config.clockStyle.outerRadius -config.clockStyle.weekendTickLength

			radialLine(drawing, angle, tickInnerRadius, config.clockStyle.outerRadius)
				.addClass("tick day weekend")
		}
	}

	// Year Label
	const yearOnLeft = dateRatio(config.now) < 0.5
	const labelSide = yearOnLeft ? -1 : 1

	drawing.text(config.clockStyle.innerRadius * 0.55 * labelSide, 0, config.year)
		.addClass("label year")


	// Needle
	const needlePathString = `
		M 12 160
		L -12 160
		L 0, -1010
		Z
		M 30 0
		A 30,30 0 1 1 -30,00
		A 30,30 0 1 1 30,00`;

	const needleTransformString = svgRotateString(dateDegrees(config.now),0,0);

	drawing.path(needlePathString)
		.transform(needleTransformString)
		.addClass("needle year");

}
