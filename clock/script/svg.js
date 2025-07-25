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

/* getSectorPath
*/
function getSectorPath(radiansStart, radiansEnd, innerRadius, outerRadius)
{
	const outerStart = polarPoint(radiansStart, outerRadius);
	const outerEnd   = polarPoint(radiansEnd,   outerRadius);
	const innerEnd   = polarPoint(radiansEnd,   innerRadius);
	const innerStart = polarPoint(radiansStart, innerRadius);

	const innerArc = (innerRadius === 0) ? '' : `A ${sf(innerRadius)} ${sf(innerRadius)} 0 0 0 ${sf(innerStart.x)} ${sf(innerStart.y)}`;

	const path = `
		M ${sf(outerStart.x)} ${sf(outerStart.y)}
		A ${sf(outerRadius)} ${sf(outerRadius)} 0 0 1 ${sf(outerEnd.x)} ${sf(outerEnd.y)}
		L ${sf(innerEnd.x)} ${sf(innerEnd.y)}
		${innerArc}
		Z`;

	return path;
}/* getSectorPath */


/* getArcPath
TODO: work out how to get inner/outer/reverse paths going
*/
function getArcPath(radiansStart, radiansEnd, radius)
{
	const start = polarPoint(radiansStart, radius);
	const end   = polarPoint(radiansEnd,   radius);

	const rotation     = '0';
	const largeArcFlag = '0';
	const sweepFlag    = (radiansStart < radiansEnd) ? '1' : '0';

	const path = `
		M ${sf(start.x)} ${sf(start.y)}
		A ${sf(radius)} ${sf(radius)} 0 0 ${sweepFlag} ${sf(end.x)} ${sf(end.y)}`;

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
		x      : parseInt(vba[0]),
		y      : parseInt(vba[1]),
		width  : parseInt(vba[2]),
		height : parseInt(vba[3]),
	};
	return result;
}