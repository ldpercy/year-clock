//
// SVG
//
// Unless specified uses a (0,0) origin
//


import * as maths from './Maths.js';




const sf = maths.significantFigures(4);


export function radialLine(angle, startRadius, endRadius) {
	const start = new PolarPoint(angle.radians, startRadius).toPoint();
	const end   = new PolarPoint(angle.radians, endRadius).toPoint();
	const result = {
		xStart : this.sf(start.x),
		yStart : this.sf(start.y),
		xEnd   : this.sf(end.x),
		yEnd   : this.sf(end.y),
	}
	return result;
}

/* getSectorPath
*/
export function getSectorPath(angularRange, annulus)
{
	const outerStart = new PolarPoint(angularRange.start.radians, annulus.outerRadius).toPoint();
	const outerEnd   = new PolarPoint(angularRange.end.radians,   annulus.outerRadius).toPoint();
	const innerStart = new PolarPoint(angularRange.end.radians,   annulus.innerRadius).toPoint();
	const innerEnd   = new PolarPoint(angularRange.start.radians, annulus.innerRadius).toPoint();

	let outerArc = (annulus.option.simpleOuter) ? `L ${this.sf(outerEnd.x)} ${this.sf(outerEnd.y)}` : `A ${this.sf(annulus.outerRadius)},${this.sf(annulus.outerRadius)} 0 0 1 ${this.sf(outerEnd.x)},${this.sf(outerEnd.y)}`;
	let innerArc = (annulus.option.simpleInner) ? `L ${this.sf(innerEnd.x)} ${this.sf(innerEnd.y)}` : `A ${this.sf(annulus.innerRadius)},${this.sf(annulus.innerRadius)} 0 0 0 ${this.sf(innerEnd.x)},${this.sf(innerEnd.y)}`;

	if (annulus.innerRadius === 0) {innerArc = ''};

	const path = `
		M ${this.sf(outerStart.x)} ${this.sf(outerStart.y)}
		${outerArc}
		L ${this.sf(innerStart.x)} ${this.sf(innerStart.y)}
		${innerArc}
		Z`;

	return path;
}/* getSectorPath */



/* getSectorResized
This is very hacked/chopped together right now, needs to be rationaslied
*/
export function getSectorResized(angularRange, annulus, sizeAdjust)
{

	const outerStart = new PolarPoint(angularRange.start.radians, annulus.outerRadius).newPointOffsetXY( -sizeAdjust.x, -sizeAdjust.y );
	const outerEnd   = new PolarPoint(angularRange.end.radians,   annulus.outerRadius).newPointOffsetXY( +sizeAdjust.x, -sizeAdjust.y );
	const innerStart = new PolarPoint(angularRange.end.radians,   annulus.innerRadius).newPointOffsetXY( +sizeAdjust.x, +sizeAdjust.y );
	const innerEnd   = new PolarPoint(angularRange.start.radians, annulus.innerRadius).newPointOffsetXY( -sizeAdjust.x, +sizeAdjust.y );

	//log('getSectorPolarDelta', outerStart, outerEnd);

	let outerArc = `A ${this.sf(annulus.outerRadius)},${this.sf(annulus.outerRadius)} 0 0 1 ${this.sf(outerEnd.x)},${this.sf(outerEnd.y)}`;
	let innerArc = `A ${this.sf(annulus.innerRadius)},${this.sf(annulus.innerRadius)} 0 0 0 ${this.sf(innerEnd.x)},${this.sf(innerEnd.y)}`;

	if (annulus.innerRadius === 0) {innerArc = ''};

	const path = `
		M ${this.sf(outerStart.x)} ${this.sf(outerStart.y)}
		${outerArc}
		L ${this.sf(innerStart.x)} ${this.sf(innerStart.y)}
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
		start     = new PolarPoint(angularRange.end.radians,   radius).toPoint();
		end       = new PolarPoint(angularRange.start.radians, radius).toPoint();
		sweepFlag = 0
	} else {
		start     = new PolarPoint(angularRange.start.radians, radius).toPoint();
		end       = new PolarPoint(angularRange.end.radians,   radius).toPoint();
		sweepFlag = 1
	}


	const rotation     = '0';
	const largeArcFlag = '0';
	//const sweepFlag    = (angularRange.width.degrees > 0) ? '1' : '0';

	const path = `
		M ${this.sf(start.x)} ${this.sf(start.y)}
		A ${this.sf(radius)} ${this.sf(radius)} 0 0 ${sweepFlag} ${this.sf(end.x)} ${this.sf(end.y)}`;

	return path;
}


/* getSectorPathSimple
A simplified version of the above that draws a quadrilateral with straight lines instead of proper arcs. Suitable for very small sectors or other effects.
*/
export function getSectorPathSimple(angularRange, annulus)
{
	const outerStart = new PolarPoint(angularRange.start.radians, annulus.outerRadius).toPoint();
	const outerEnd   = new PolarPoint(angularRange.end.radians,   annulus.outerRadius).toPoint();
	const innerStart = new PolarPoint(angularRange.end.radians,   annulus.innerRadius).toPoint();
	const innerEnd   = new PolarPoint(angularRange.start.radians, annulus.innerRadius).toPoint();

	const path = `
		M ${this.sf(outerStart.x)} ${this.sf(outerStart.y)}
		L ${this.sf(outerEnd.x)} ${this.sf(outerEnd.y)}
		L ${this.sf(innerEnd.x)} ${this.sf(innerEnd.y)}
		L ${this.sf(innerStart.x)} ${this.sf(innerStart.y)}
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

