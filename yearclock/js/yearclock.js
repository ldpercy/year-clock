/* config & setup
*/

const config = {

	// Clock Style
	clockStyle : {
		outerRadius: 1120,
		innerRadius: 920,

		needleLength: 1000,

		monthLabelRadius: 980,	// how far out from the center the month-titles are positioned

		weekdayTickLength: 40,
		weekendTickLength: 55,
	},

	monthCodes : [ "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec" ],
	days : []
};


/* setup
*/
function setup() {
	// Language
	config.userLang = navigator.language || navigator.userLanguage;

	config.languageParam = superLang( getParameterByName('language') );
	config.browserLanguage = superLang( navigator.language || navigator.userLanguage );

	config.monthNames = i18n.gregLocal[config.languageParam] || i18n.gregLocal[config.browserLanguage] || i18n.gregLocal["en"]

	// Set Current Date
	const dateParam = getParameterByName('date');
	config.now = dateParam ? new Date(dateParam) : new Date();
	config.year = config.now.getFullYear();

	// Set Up Months
	config.months = config.monthNames.map(function( monthName, monthNumber )
	{
		const startDate = new Date(config.year, monthNumber)
		const nextMonth = new Date(config.year, monthNumber + 1)
		const endDate   = new Date(nextMonth - 1000)

		return { "name": monthName, "code": config.monthCodes[monthNumber], "startDate": startDate, "endDate": endDate }
	})

	// Set Up Days
	for (let date = new Date(config.year,0); date.getFullYear() <= config.year; d = incrementDay(date))
	{
		const day = {
			date:    new Date(date),
			first:   date.getDate() == 1,
			weekend: isWeekend(date)
		}

		config.days.push(day)
	}
} // setup


// Dates
function incrementDay(d)
{
	d.setDate(d.getDate() + 1)
}

function dateRatio(date)
{
	const year = date.getFullYear()
	const yearStart = new Date (year, 0)
	const yearEnd   = new Date (year + 1, 0)
	const yearLength = yearEnd - yearStart
	const timeElapsed = date - yearStart
	return timeElapsed / yearLength
}

function isWeekend(d)
{
	const dayNumber = d.getDay()
	return dayNumber == 0 || dayNumber == 6
}

function dateRadians(date)
{
	return clockAngle( dateRatio(date) )
}

function dateDegrees(date)
{
	return 360 * dateRatio(date)
}



/* Draw Clock
*/
function drawClock()
{
	// Set Up Drawing
	const drawing = Snap("#clock")

	// Draw Months
	for (let month of config.months)
	{
		const startAngle = dateRadians(month.startDate)
		const endAngle   = dateRadians(month.endDate)

		// Month Segment

		segment(drawing, startAngle, endAngle, config.clockStyle.innerRadius, config.clockStyle.outerRadius )
			.addClass("segment month")
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
