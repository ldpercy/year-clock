//
// SVG
//
// Unless specified uses a (0,0) origin
//

sf = significantFigures(4);


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
		xStart : sf(start.x),
		yStart : sf(start.y),
		xEnd   : sf(end.x),
		yEnd   : sf(end.y),
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
		M ${sf(outerStart.x)} ${sf(outerStart.y)}
		A ${sf(outerRadius)} ${sf(outerRadius)} 0 0 1 ${sf(outerEnd.x)} ${sf(outerEnd.y)}
		L ${sf(innerEnd.x)} ${sf(innerEnd.y)}
		A ${sf(innerRadius)} ${sf(innerRadius)} 0 0 0 ${sf(innerStart.x)} ${sf(innerStart.y)}
		Z`;

	return path;
}


function svgRotateString(angle, centre_x, centre_y)
{
	return ['rotate(', angle, centre_x, centre_y, ')'].join(' ')
}
