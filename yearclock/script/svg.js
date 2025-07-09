//
// SVG
//
// Unless specified uses a (0,0) origin
//

sf = significantFigures(4);


function radialLine(radians, startRadius, endRadius) {
	const start = polarPoint(radians, startRadius);
	const end   = polarPoint(radians, endRadius);
	result = {
		xStart : sf(start.x),
		yStart : sf(start.y),
		xEnd   : sf(end.x),
		yEnd   : sf(end.y),
	}
	return result;
}


function getSectorPath(radiansStart, radiansEnd, innerRadius, outerRadius)
{
	const outerStart = polarPoint(radiansStart, outerRadius);
	const outerEnd   = polarPoint(radiansEnd,   outerRadius);
	const innerEnd   = polarPoint(radiansEnd,   innerRadius);
	const innerStart = polarPoint(radiansStart, innerRadius);

	const path = `
		M ${sf(outerStart.x)} ${sf(outerStart.y)}
		A ${sf(outerRadius)} ${sf(outerRadius)} 0 0 1 ${sf(outerEnd.x)} ${sf(outerEnd.y)}
		L ${sf(innerEnd.x)} ${sf(innerEnd.y)}
		A ${sf(innerRadius)} ${sf(innerRadius)} 0 0 0 ${sf(innerStart.x)} ${sf(innerStart.y)}
		Z`;

	return path;
}


/* getSectorPathSimple
A simplified version of the above that draws a quadrilateral with straight lines instead of proper arcs. Suitable for very small sectors or other effects.
*/
function getSectorPathSimple(radiansStart, radiansEnd, innerRadius, outerRadius)
{
	const outerStart = polarPoint(radiansStart, outerRadius);
	const outerEnd   = polarPoint(radiansEnd,   outerRadius);
	const innerEnd   = polarPoint(radiansEnd,   innerRadius);
	const innerStart = polarPoint(radiansStart, innerRadius);

	const path = `
		M ${sf(outerStart.x)} ${sf(outerStart.y)}
		L ${sf(outerEnd.x)} ${sf(outerEnd.y)}
		L ${sf(innerEnd.x)} ${sf(innerEnd.y)}
		L ${sf(innerStart.x)} ${sf(innerStart.y)}
		Z`;

	return path;
}



function padViewBox(padding, x=-1200, y=-1200, width=2400, height=2400) {
	return `${x-padding} ${y-padding} ${width + 2*padding} ${height + 2*padding}`;
}


function splitViewBox(viewBoxString) {
	const vba    = viewBoxString.split(' ');
	const result = {
		x      : vba[0],
		y      : vba[1],
		width  : vba[2],
		height : vba[3],
	};
	return result;
}