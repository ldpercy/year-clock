//
// SVG
//
// Unless specified uses a (0,0) origin
//

yearclock.SVG = class {

	static sf = yearclock.Maths.significantFigures(4);


	static radialLine(radians, startRadius, endRadius) {
		const start = new PolarPoint(radians, startRadius).toPoint();
		const end   = new PolarPoint(radians, endRadius).toPoint();
		result = {
			xStart : this.sf(start.x),
			yStart : this.sf(start.y),
			xEnd   : this.sf(end.x),
			yEnd   : this.sf(end.y),
		}
		return result;
	}

	/* getSectorPath
	*/
	static getSectorPath(radiansStart, radiansEnd, annulus)
	{
		const outerStart = new PolarPoint(radiansStart, annulus.outerRadius).toPoint();
		const outerEnd   = new PolarPoint(radiansEnd,   annulus.outerRadius).toPoint();
		const innerStart = new PolarPoint(radiansEnd,   annulus.innerRadius).toPoint();
		const innerEnd   = new PolarPoint(radiansStart, annulus.innerRadius).toPoint();

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
	static getSectorResized(radiansStart, radiansEnd, annulus, sizeAdjust)
	{

		const outerStart = new PolarPoint(radiansStart, annulus.outerRadius).newPointOffsetXY( -sizeAdjust.x, -sizeAdjust.y );
		const outerEnd   = new PolarPoint(radiansEnd,   annulus.outerRadius).newPointOffsetXY( +sizeAdjust.x, -sizeAdjust.y );
		const innerStart = new PolarPoint(radiansEnd,   annulus.innerRadius).newPointOffsetXY( +sizeAdjust.x, +sizeAdjust.y );
		const innerEnd   = new PolarPoint(radiansStart, annulus.innerRadius).newPointOffsetXY( -sizeAdjust.x, +sizeAdjust.y );

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
	static getArcPath(radiansStart, radiansEnd, radius)
	{
		const start = new PolarPoint(radiansStart, radius).toPoint();
		const end   = new PolarPoint(radiansEnd,   radius).toPoint();

		const rotation     = '0';
		const largeArcFlag = '0';
		const sweepFlag    = (radiansStart < radiansEnd) ? '1' : '0';

		const path = `
			M ${this.sf(start.x)} ${this.sf(start.y)}
			A ${this.sf(radius)} ${this.sf(radius)} 0 0 ${sweepFlag} ${this.sf(end.x)} ${this.sf(end.y)}`;

		return path;
	}


	/* getSectorPathSimple
	A simplified version of the above that draws a quadrilateral with straight lines instead of proper arcs. Suitable for very small sectors or other effects.
	*/
	static getSectorPathSimple(radiansStart, radiansEnd, annulus)
	{
		const outerStart = new PolarPoint(radiansStart, annulus.outerRadius).toPoint();
		const outerEnd   = new PolarPoint(radiansEnd,   annulus.outerRadius).toPoint();
		const innerEnd   = new PolarPoint(radiansEnd,   annulus.innerRadius).toPoint();
		const innerStart = new PolarPoint(radiansStart, annulus.innerRadius).toPoint();

		const path = `
			M ${this.sf(outerStart.x)} ${this.sf(outerStart.y)}
			L ${this.sf(outerEnd.x)} ${this.sf(outerEnd.y)}
			L ${this.sf(innerEnd.x)} ${this.sf(innerEnd.y)}
			L ${this.sf(innerStart.x)} ${this.sf(innerStart.y)}
			Z`;

		return path;
	}



	static padViewBox(padding, viewBox = '-1200 -1200 2400 2400') {
		const vb = this.splitViewBox(viewBox);
		return `${vb.x-padding} ${vb.y-padding} ${vb.width + 2*padding} ${vb.height + 2*padding}`;
	}


	static splitViewBox(viewBoxString) {
		const vba    = viewBoxString.split(' ');
		const result = {
			x      : parseInt(vba[0]),
			y      : parseInt(vba[1]),
			width  : parseInt(vba[2]),
			height : parseInt(vba[3]),
		};
		return result;
	}


	static rectanglePath(x, y, width, height, radius) {

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


}/* yearclock.SVG */



yearclock.SVG.Chunk = class {
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
}/* yearclock.SVG.Chunk */

