//
// SVG
//
// Unless specified uses a (0,0) origin
//

sf = yearclock.Maths.significantFigures(4);


function radialLine(radians, startRadius, endRadius) {
	const start = new PolarPoint(radians, startRadius).toPoint();
	const end   = new PolarPoint(radians, endRadius).toPoint();
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
	const outerStart = new PolarPoint(radiansStart, annulus.outerRadius).toPoint();
	const outerEnd   = new PolarPoint(radiansEnd,   annulus.outerRadius).toPoint();
	const innerStart = new PolarPoint(radiansEnd,   annulus.innerRadius).toPoint();
	const innerEnd   = new PolarPoint(radiansStart, annulus.innerRadius).toPoint();

	let outerArc = (annulus.option.simpleOuter) ? `L ${sf(outerEnd.x)} ${sf(outerEnd.y)}` : `A ${sf(annulus.outerRadius)},${sf(annulus.outerRadius)} 0 0 1 ${sf(outerEnd.x)},${sf(outerEnd.y)}`;
	let innerArc = (annulus.option.simpleInner) ? `L ${sf(innerEnd.x)} ${sf(innerEnd.y)}` : `A ${sf(annulus.innerRadius)},${sf(annulus.innerRadius)} 0 0 0 ${sf(innerEnd.x)},${sf(innerEnd.y)}`;

	if (annulus.innerRadius === 0) {innerArc = ''};

	const path = `
		M ${sf(outerStart.x)} ${sf(outerStart.y)}
		${outerArc}
		L ${sf(innerStart.x)} ${sf(innerStart.y)}
		${innerArc}
		Z`;

	return path;
}/* getSectorPath */



/* getSectorResized
This is very hacked/chopped together right now, needs to be rationaslied

*/
function getSectorResized(radiansStart, radiansEnd, annulus, sizeAdjust)
{

	const outerStart = new PolarPoint(radiansStart, annulus.outerRadius).newPointOffsetXY( -sizeAdjust.x, -sizeAdjust.y );
	const outerEnd   = new PolarPoint(radiansEnd,   annulus.outerRadius).newPointOffsetXY( +sizeAdjust.x, -sizeAdjust.y );
	const innerStart = new PolarPoint(radiansEnd,   annulus.innerRadius).newPointOffsetXY( +sizeAdjust.x, +sizeAdjust.y );
	const innerEnd   = new PolarPoint(radiansStart, annulus.innerRadius).newPointOffsetXY( -sizeAdjust.x, +sizeAdjust.y );

	//log('getSectorPolarDelta', outerStart, outerEnd);

	let outerArc = `A ${sf(annulus.outerRadius)},${sf(annulus.outerRadius)} 0 0 1 ${sf(outerEnd.x)},${sf(outerEnd.y)}`;
	let innerArc = `A ${sf(annulus.innerRadius)},${sf(annulus.innerRadius)} 0 0 0 ${sf(innerEnd.x)},${sf(innerEnd.y)}`;

	if (annulus.innerRadius === 0) {innerArc = ''};

	const path = `
		M ${sf(outerStart.x)} ${sf(outerStart.y)}
		${outerArc}
		L ${sf(innerStart.x)} ${sf(innerStart.y)}
		${innerArc}
		Z`;

	return path;
}/* getSectorResized */




/* getArcPath
TODO: work out how to get inner/outer/reverse paths going
*/
function getArcPath(radiansStart, radiansEnd, radius)
{
	const start = new PolarPoint(radiansStart, radius).toPoint();
	const end   = new PolarPoint(radiansEnd,   radius).toPoint();

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
function getSectorPathSimple(radiansStart, radiansEnd, annulus)
{
	const outerStart = new PolarPoint(radiansStart, annulus.outerRadius).toPoint();
	const outerEnd   = new PolarPoint(radiansEnd,   annulus.outerRadius).toPoint();
	const innerEnd   = new PolarPoint(radiansEnd,   annulus.innerRadius).toPoint();
	const innerStart = new PolarPoint(radiansStart, annulus.innerRadius).toPoint();

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



class SVGChunk {
	constructor(
		text = '',
		defs = ''
	) {
		this.text = text;
		this.defs = defs;
	}

	add = function(svgChunk) {
		this.text += svgChunk.text;
		this.defs += svgChunk.defs;
	}

	toString = function() {
		const result = `
			<defs>
				${this.defs}
			</defs>
			${this.text}`;
		return result;
	}
}/* SVGChunk */