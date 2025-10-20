//
//	Geometry
//
//	Temporary-ish while I'm splitting up maths
//



function radians(degrees) {
	return (degrees/360) * yearclock.Maths.TAU;
}

function degrees(radians) {
	return (radians/yearclock.Maths.TAU) * 360;
}


/* divisionDegrees
Given integer divisions of a circle, return the start, middle and end angle of the numbered division.
Divisions are now zero-based.

degreesLength is an offset from radiansStart.
*/
function divisionDegrees(divisions, number, degreeDelta = new DegreeDelta) {
	let result = {
		start  : degreeDelta.start + degreeDelta.delta * ((number + 0.0) / divisions),
		middle : degreeDelta.start + degreeDelta.delta * ((number + 0.5) / divisions),
		end    : degreeDelta.start + degreeDelta.delta * ((number + 1.0) / divisions),
	}
	result.width = result.end - result.start;
	return result;
}

/* divisionRadians
Given integer divisions of an arc, return start, middle, end & width in radians of the numbered division.
Divisions are now zero-based.

Default is full-circle.

I might need to generalise/extrapolate this a bit.
Currently it works on the idea that an arc (commonly a whole circle) is divided evenly then gives the parameters for the numbered division.
If we instead think about a number-arc mapping we can extrapolate outside the range including negatives.
Will probably need to rebase on zero though.
Actually as written it already works for numbers outside of range, so I'll just 0 base it so it makes more sense.


*/
function divisionRadians(divisions, number, radianDelta = new RadianDelta) {

	const result = {
		start  : radianDelta.start + radianDelta.delta * ((number + 0.0) / divisions),
		middle : radianDelta.start + radianDelta.delta * ((number + 0.5) / divisions),
		end    : radianDelta.start + radianDelta.delta * ((number + 1.0) / divisions),

	}
	result.width = result.end - result.start;
	return result;
}/* divisionRadians */


/* dateRadians
Will automatically extrapolate if the date falls outside of the date range.
*/
function dateRadians(date, dateRange, radianDelta = new RadianDelta) {

	/* 	This might be the key I've been looking for */
	result = divisionRadians(dateRange.length(), yearclock.Date.dayDifference(dateRange.start, date), radianDelta);
	return result;
}/* dateRadians */


/* addRadians
This might be tricky to do is a fully general way.
Currently only works for even spacing of an array.
*/
function addRadians(array, radianDelta = new RadianDelta) {
	array.forEach(
		(element, index) => {element.radians = divisionRadians(array.length, index, radianDelta);} // nb one-based
	);
}/* addRadians */


/* addDateRangeRadians
Currently incomplete/incorrect due to problems with dateRangeRadians
Need to decide some things:
* What date period the arc represents
* What to do with periods outside or crossing out of the primary date range - discard, truncate, extrapolate
* Special conditions for truncates or extrapolates crossing back into an overlapping pseudo-range, eg year boundaries (seasons)

Also need to decide what to do with what would be discards - set the radians to undefined, or remove the items (mutate)?

*/
function addDateRangeRadians(array, arcDateRange, radianDelta = new RadianDelta, outlier = '') {
	array.forEach(
		(element) => {
			element.radians = dateRangeRadians(element.dateRange, arcDateRange, radianDelta, outlier);
		}
	);
}/* addDateRangeRadians */



//
// Classes
//

class Point {
	constructor(x=0, y=0, precision=12) {
		this.x = x;
		this.y = y;
		this.precision = precision;
	}

	plus = function(point) {
		return new Point(
			this.x + point.x,
			this.y + point.y
		);
	}

	distanceFrom = function(point = new Point()) {
		const result = Math.hypot((this.x - point.x), (this.y - point.y));
		return result;
	}

	// Clockwise from y axis
	radiansFrom = function(center = new Point()) {
		const result = Math.PI/2 + Math.atan2(this.y-center.y, this.x-center.x);
		return result;
	}

	toPolarPoint = function(polarPoint = new PolarPoint()) {
		const distance = this.distanceFrom();
		const radian  = (equalAtPrecision(this.precision, distance, 0)) ? polarPoint.radian : this.radiansFrom();
		// for points on the origin return the default PolarPoint radian
		// should probably actually add these akin to a base vector
		return new PolarPoint(
			radian,
			distance
		);
	}

	get radian() {
		return Math.atan2(this.y, this.x) + Math.PI/2;
	}

	// Clockwise from y axis
	radiansFrom = function(center = new Point()) {
		const result = Math.PI/2 + Math.atan2(this.y-center.y, this.x-center.x);
		return result;
	}


	get distanceFromOrigin() {
		return Math.hypot(this.x, this.y);
	}

	getDistanceFrom = function(point = new Point()) {
		return Math.hypot((this.x - point.x), (this.y - point.y));
	}

	// absolute
	set radian(radian) {
		const newPoint = new PolarPoint(radian, this.distanceFromOrigin).toPoint();
		this.x = newPoint.x;
		this.y = newPoint.y;
		return this
	}

	// relative
	rotate = function(radian) {
		const newPoint = new PolarPoint(this.radian + radian, this.distanceFromOrigin).toPoint();
		this.x = newPoint.x;
		this.y = newPoint.y;
		return this;
	}


}/* Point */




class PolarPoint {
	constructor(radian=0, radius=0, precision=12)
	{
		this.radian = radian;
		this.radius = radius;
		this.precision = precision;
	}

	toPoint = function() {
		return new Point(
			this.radius * Math.sin(this.radian),
			this.radius * -Math.cos(this.radian)
		)
	}

	toPointPolarOffset(polarPoint) {  // another polar point represents the deltas
		return new Point(
			(this.radius + polarPoint.radius) * Math.sin(this.radian + polarPoint.radian),
			(this.radius + polarPoint.radius) * -Math.cos(this.radian + polarPoint.radian)
		)
	}

	plus = function(polarPoint) {
		return this.toPoint().plus(polarPoint.toPoint()).toPolarPoint();
		// this way is pretty dumb, figure out a better way
		// the lengths should add arithmetically
		// this one is absolute
	}

	/* move
	A single-step turtle graphics kind of move relative to the current point
	Takes the current radian coordinate as the base heading and the new heading is relative to it.
	Ie a 0 heading will continue in the same direction
	*/
	move = function(distance, heading) {
		const delta = new PolarPoint(this.radian+heading, distance);
		//console.log(delta);
		return this.plus(delta);
	}


	/* newPointOffsetXY
	The offsets are applied to the radial point's 'local' cartesian plane.
	(The absolute versions of this would have been trivial)
	*/
	newPointOffsetXY(dx, dy) {
		let result = new Point(dx, -this.radius + dy);
		result.rotate(this.radian);
		return result;
	}/* newPointOffsetXY */


}/* PolarPoint */


class Annulus {
	constructor(
			outerRadius,
			innerRadius,
			center = new Point(),
			option = {}
		) {
		this.outerRadius = outerRadius;
		this.innerRadius = innerRadius;
		this.center = center;
		this.option = option;
	}
}


class RadianDelta {
	constructor(start = 0, delta = yearclock.Maths.TAU) {
		this.start = start;
		this.delta = delta;
	}
}/* RadianDelta */


class DegreeDelta {
	constructor(start = 0, delta = 360) {
		this.start = start;
		this.delta = delta;
	}
}/* RadianDelta */

