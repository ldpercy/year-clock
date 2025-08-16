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
function getSectorPath(radiansStart, radiansEnd, annulus)
{
	const outerStart = polarPoint(radiansStart, annulus.outerRadius);
	const outerEnd   = polarPoint(radiansEnd,   annulus.outerRadius);
	const innerEnd   = polarPoint(radiansEnd,   annulus.innerRadius);
	const innerStart = polarPoint(radiansStart, annulus.innerRadius);

	const innerArc = (annulus.innerRadius === 0) ? '' : `A ${sf(annulus.innerRadius)} ${sf(annulus.innerRadius)} 0 0 0 ${sf(innerStart.x)} ${sf(innerStart.y)}`;

	const path = `
		M ${sf(outerStart.x)} ${sf(outerStart.y)}
		A ${sf(annulus.outerRadius)} ${sf(annulus.outerRadius)} 0 0 1 ${sf(outerEnd.x)} ${sf(outerEnd.y)}
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



function padViewBox(padding, viewBox = '-1200 -1200 2400 2400') {
	const vb = splitViewBox(viewBox);
	return `${vb.x-padding} ${vb.y-padding} ${vb.width + 2*padding} ${vb.height + 2*padding}`;
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


function rectanglePath(x, y, width, height, radius) {

	const path = `
		M ${x+width-radius}, ${y}
		A ${radius},${radius} 0 0 1 ${x+width}, ${y+radius}
		L ${x+width}, ${y+height-radius}
		A ${radius},${radius} 0 0 1 ${x+width-radius}, ${y+height}
		L ${x+radius}, ${y+height}

		A ${radius},${radius} 0 0 1 ${x}, ${y+height-radius}
		L ${x}, ${y+radius}
		A ${radius},${radius} 0 0 1 ${x+radius}, ${y}
		Z`;
	return path;
}

