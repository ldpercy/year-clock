//
// SVG
//
// Unless specified uses a (0,0) origin
//


import * as maths from './Maths.js';
import * as geometry from './Geometry.js';




const sf = maths.significantFigures(4);


export function radialLine(angle, startRadius, endRadius) {
	const start = new geometry.PolarPoint(angle.radians, startRadius).toPoint();
	const end   = new geometry.PolarPoint(angle.radians, endRadius).toPoint();
	const result = {
		xStart : sf(start.x),
		yStart : sf(start.y),
		xEnd   : sf(end.x),
		yEnd   : sf(end.y),
	}
	return result;
}

/* getSectorPath
*/
export function getSectorPath(angularRange, annulus)
{
	const outerStart = new geometry.PolarPoint(angularRange.start.radians, annulus.outerRadius).toPoint();
	const outerEnd   = new geometry.PolarPoint(angularRange.end.radians,   annulus.outerRadius).toPoint();
	const innerStart = new geometry.PolarPoint(angularRange.end.radians,   annulus.innerRadius).toPoint();
	const innerEnd   = new geometry.PolarPoint(angularRange.start.radians, annulus.innerRadius).toPoint();

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
export function getSectorResized(angularRange, annulus, sizeAdjust)
{

	const outerStart = new geometry.PolarPoint(angularRange.start.radians, annulus.outerRadius).newPointOffsetXY( -sizeAdjust.x, -sizeAdjust.y );
	const outerEnd   = new geometry.PolarPoint(angularRange.end.radians,   annulus.outerRadius).newPointOffsetXY( +sizeAdjust.x, -sizeAdjust.y );
	const innerStart = new geometry.PolarPoint(angularRange.end.radians,   annulus.innerRadius).newPointOffsetXY( +sizeAdjust.x, +sizeAdjust.y );
	const innerEnd   = new geometry.PolarPoint(angularRange.start.radians, annulus.innerRadius).newPointOffsetXY( -sizeAdjust.x, +sizeAdjust.y );

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
export function getArcPath(angularRange, radius, reverse = false)
{
	let start;
	let end;
	let sweepFlag;

	if (reverse) {
		start     = new geometry.PolarPoint(angularRange.end.radians,   radius).toPoint();
		end       = new geometry.PolarPoint(angularRange.start.radians, radius).toPoint();
		sweepFlag = 0
	} else {
		start     = new geometry.PolarPoint(angularRange.start.radians, radius).toPoint();
		end       = new geometry.PolarPoint(angularRange.end.radians,   radius).toPoint();
		sweepFlag = 1
	}


	const rotation     = '0';
	const largeArcFlag = '0';
	//const sweepFlag    = (angularRange.width.degrees > 0) ? '1' : '0';

	const path = `
		M ${sf(start.x)} ${sf(start.y)}
		A ${sf(radius)} ${sf(radius)} 0 0 ${sweepFlag} ${sf(end.x)} ${sf(end.y)}`;

	return path;
}


/* getSectorPathSimple
A simplified version of the above that draws a quadrilateral with straight lines instead of proper arcs. Suitable for very small sectors or other effects.
*/
export function getSectorPathSimple(angularRange, annulus)
{
	const outerStart = new geometry.PolarPoint(angularRange.start.radians, annulus.outerRadius).toPoint();
	const outerEnd   = new geometry.PolarPoint(angularRange.end.radians,   annulus.outerRadius).toPoint();
	const innerStart = new geometry.PolarPoint(angularRange.end.radians,   annulus.innerRadius).toPoint();
	const innerEnd   = new geometry.PolarPoint(angularRange.start.radians, annulus.innerRadius).toPoint();

	const path = `
		M ${sf(outerStart.x)} ${sf(outerStart.y)}
		L ${sf(outerEnd.x)} ${sf(outerEnd.y)}
		L ${sf(innerEnd.x)} ${sf(innerEnd.y)}
		L ${sf(innerStart.x)} ${sf(innerStart.y)}
		Z`;

	return path;
}



export function padViewBox(padding, viewBox = '-1200 -1200 2400 2400') {
	const vb = this.splitViewBox(viewBox);
	return `${vb.x-padding} ${vb.y-padding} ${vb.width + 2*padding} ${vb.height + 2*padding}`;
}


export function splitViewBox(viewBoxString) {
	const vba    = viewBoxString.split(' ');
	const result = {
		x      : parseInt(vba[0]),
		y      : parseInt(vba[1]),
		width  : parseInt(vba[2]),
		height : parseInt(vba[3]),
	};
	return result;
}


export function rectanglePath(x, y, width, height, radius) {

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




export class Chunk {
	text;
	defs;

	constructor(
		text = '',
		defs = ''
	) {
		this.text = text;
		this.defs = defs;
	}

	add(svgChunk) {
		this.text += svgChunk.text;
		this.defs += svgChunk.defs;
	}

	toString() {
		const result = `
			<defs>
				${this.defs}
			</defs>
			${this.text}`;
		return result;
	}
}/* yearclock.SVG.Chunk */

