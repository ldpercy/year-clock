/* Maths
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
		radius * Math.sin(angle),
		radius * -Math.cos(angle)
	)
}

function midpoint(a,b)
{
	return 0.5 * (a + b)
}

function radians(degrees) {
	return (degrees/360) * Math.TAU;
}

function degrees(radians) {
	return (radians/Math.TAU) * 360;
}




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


// clock

function clockAngle( revolutions )
{
	return Math.TAU * (revolutions)
}

function dateRadians(date)
{
	return clockAngle( dateRatio(date) )
}

function dateDegrees(date)
{
	return 360 * dateRatio(date)
}



// Shapes

function snapRadialLine(drawing, angle, innerRadius, outerRadius)
{
	const start = polarPoint(angle, innerRadius)
	const end   = polarPoint(angle, outerRadius)

	return drawing.line(start.x, start.y, end.x, end.y)
}


function radialLine(angle, startRadius, endRadius) {
	const start = polarPoint(angle, startRadius);
	const end   = polarPoint(angle, endRadius);
	result = {
		xStart : start.x,
		yStart : start.y,
		xEnd   : end.x,
		yEnd   : end.y,
	}
	return result;
}


function sector(startAngle, endAngle, innerRadius, outerRadius)
{
	const outerStart = polarPoint(startAngle, outerRadius)
	const outerEnd   = polarPoint(endAngle,   outerRadius)
	const innerEnd   = polarPoint(endAngle,   innerRadius)
	const innerStart = polarPoint(startAngle, innerRadius)

	const path = `
		M ${outerStart.x} ${outerStart.y}
		A ${outerRadius} ${outerRadius} 0 0 1 ${outerEnd.x} ${outerEnd.y}
		L ${innerEnd.x} ${innerEnd.y}
		A ${innerRadius} ${innerRadius} 0 0 0 ${innerStart.x} ${innerStart.y}
		Z`;

	return path;
}


function svgRotateString(angle, centre_x, centre_y)
{
	return ['rotate(', angle, centre_x, centre_y, ')'].join(' ')
}

