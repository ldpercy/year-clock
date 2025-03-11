

/* config & setup
*/

// Clock Style
const clockStyle = {
	outerRadius: 1120,
	innerRadius: 920,

	needleLength: 1000,

	monthLabelRadius: 980,	// how far out from the center the month-titles are positioned
	monthLabelSize: 48,
	monthLabelYShift: 0.4,

	weekdayTickLength: 40,
	weekdayTickWidth: 2,
	weekendTickLength: 55,
	weekendTickWidth: 7,

	yearFontSize: 250,
	yearYShift: 0.4,
}

// i18n
const gregLocal = {
	"en": [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
	"es": [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ],
	"fr": [ "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre" ],
	"zh": [ "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月" ],
	"hi": [ "जनवरी", "फ़रवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर" ],
	"ru": [ "январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь" ],
	"ko": [ "일월", "이월", "삼월", "사월", "오월", "유월", "칠월", "팔월", "구월", "시월", "십일월", "십이월" ]
}

const monthCodes = [ "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec" ]

// Language

var userLang = navigator.language || navigator.userLanguage


// Set Up Current Date

const dateParam = getParameterByName('date')
let now = dateParam ? new Date(dateParam) : new Date()
let year = now.getFullYear()



/* URL Parameters
*/

function getParameterByName(name)
{
	const url = window.location.href
	name = name.replace(/[\[\]]/g, "\\$&")
	const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)")
	const results = regex.exec(url)
	if (!results) return null
	if (!results[2]) return ''
	return decodeURIComponent(results[2].replace(/\+/g, " "))
}



/* Geometry
*/

Math.TAU = 2 * Math.PI;

function Point (x, y)
{
	this.x = x;
	this.y = y;
}

function polarPoint (angle, radius)
{
	return new Point(
		radius * Math.cos(angle),
		radius * Math.sin(angle)
	)
}

function clockAngle( revolutions )
{
	return Math.TAU * (revolutions - 0.25)
}

function midpoint(a,b)
{
	return 0.5 * (a + b)
}

// Shapes //

function radialLine(drawing, angle, innerRadius, outerRadius)
{
	const start = polarPoint(angle, innerRadius)
	const end   = polarPoint(angle, outerRadius)

	return drawing.line(start.x, start.y, end.x, end.y)
}

function segment(drawing, startAngle, endAngle, innerRadius, outerRadius)
{
	const outerStart = polarPoint(startAngle, outerRadius)
	const outerEnd   = polarPoint(endAngle,   outerRadius)
	const innerEnd   = polarPoint(endAngle,   innerRadius)
	const innerStart = polarPoint(startAngle, innerRadius)

	const path = [
		"M", outerStart.x, outerStart.y,
		"A", outerRadius, outerRadius, 0, 0, 1, outerEnd.x, outerEnd.y,
		"L", innerEnd.x, innerEnd.y,
		"A", innerRadius, innerRadius, 0, 0, 0, innerStart.x, innerStart.y,
		"Z"
	].join(" ")

	return drawing.path(path)
}

function svgRotateString(angle, centre_x, centre_y)
{
	return ['rotate(', angle, centre_x, centre_y, ')'].join(' ')
}



// Dates //

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



// Internationalization //

function superLang( subLang )
{
	return subLang ? subLang.slice( 0, 2 ) : null
}


const languageParam = superLang( getParameterByName('language') )
const browserLanguage = superLang( navigator.language || navigator.userLanguage )

const monthNames = gregLocal[languageParam] || gregLocal[browserLanguage] || gregLocal["en"]

// Set Up Months



const months = monthNames.map(function( monthName, monthNumber )
{
	const startDate = new Date(year, monthNumber)
	const nextMonth = new Date(year, monthNumber + 1)
	const endDate   = new Date(nextMonth - 1000)

	return { "name": monthName, "code": monthCodes[monthNumber], "startDate": startDate, "endDate": endDate }
})

// Set Up Days

let days = []

for (let date = new Date(year,0); date.getFullYear() <= year; d = incrementDay(date))
{
	const day = {
		date:    new Date(date),
		first:   date.getDate() == 1,
		weekend: isWeekend(date)
	}

	days.push(day)
}



// Draw Clock //

function drawClock()
{
	// Set Up Drawing //

	const drawing = Snap("#clock")

	// Draw Months //

	for (let month of months)
	{
		const startAngle = dateRadians(month.startDate)
		const endAngle   = dateRadians(month.endDate)

		// Month Segment

		segment(drawing, startAngle, endAngle, clockStyle.innerRadius, clockStyle.outerRadius )
			.addClass("segment month")
			.addClass(month.code)

		// Month Label

		const midAngle = midpoint(startAngle,endAngle) + (Math.TAU * 0.25)
		const upsideDown = Math.cos(midAngle) < 0

		const yOffset    = upsideDown ? clockStyle.monthLabelRadius : 0 - clockStyle.monthLabelRadius
		const labelAngle = upsideDown ? midAngle + Math.PI          : midAngle

		drawing.text(0, yOffset, month.name)
			.addClass("label month")
			.attr({
				'text-anchor': 'middle',
				'font-size': clockStyle.monthLabelSize,
				'dy': clockStyle.monthLabelSize * clockStyle.monthLabelYShift,
				'transform': svgRotateString(Snap.deg(labelAngle),0,0)
			})
	}

	// Draw Day Ticks //

	for (let day of days)
	{
		const angle = dateRadians(day.date)

		if (day.first) // If first day in month
		{
			// Draw First Tick
			radialLine(drawing, angle, clockStyle.innerRadius, clockStyle.outerRadius)
				.addClass("tick day first")
				.attr({ "stroke-width": clockStyle.weekdayTickWidth })
		}

		if (!day.weekend && !day.first) // If neither weekend nor first day in month
		{
			// Draw a standard day tick
			const tickInnerRadius = clockStyle.outerRadius - clockStyle.weekdayTickLength

			radialLine(drawing, angle, tickInnerRadius, clockStyle.outerRadius)
				.addClass("tick day weekday")
				.attr({ "stroke-width": clockStyle.weekdayTickWidth })
		}

		if (day.weekend)
		{
			// Draw a weekend tick
			const tickInnerRadius = clockStyle.outerRadius - clockStyle.weekendTickLength

			radialLine(drawing, angle, tickInnerRadius, clockStyle.outerRadius)
				.addClass("tick day weekend")
				.attr({
					"stroke-width": clockStyle.weekendTickWidth,
					"stroke-linecap": "round"
				})
		}
	}

	// Draw Year Label //

	const yearOnLeft = dateRatio(now) < 0.5
	const labelSide = yearOnLeft ? -1 : 1

	drawing.text(clockStyle.innerRadius * 0.55 * labelSide, 0, year)
		.addClass("label year")
		.attr({
			'text-anchor': 'middle',
			'font-size': clockStyle.yearFontSize
			'dy': clockStyle.yearFontSize * clockStyle.yearYShift,
		})

	// Draw Needle //

	const needlePathString = [
		"M",  1.2, 20,
		"L", -1.2, 20,
		"L",    0, 0 - clockStyle.needleLength,
		"Z"
	].join(" ")

	const needleTransformString = svgRotateString(dateDegrees(now),0,0)

	drawing.path(needlePathString)
		.transform(needleTransformString)
		.addClass("needle year")
		.attr({ "stroke-width": 2, "stroke-linejoin": "round" })

	drawing.circle(0, 0, 5)
		.addClass("pivot year")
}
