//
//	Geometry
//
//	Temporary-ish while I'm splitting up maths
//


import * as dates from "./Date.js";




export class Geometry{

	static radians(degrees) {
		return (degrees/360) * yearclock.Maths.TAU;
	}

	static degrees(radians) {
		return (radians/yearclock.Maths.TAU) * 360;
	}


	//
	//	CRAP CODE START:
	//





	/* dateAngularRange
	Will automatically extrapolate if the date falls outside of the date range.
	*/
	static dateAngularRange(date, dateRange, angularRange = new AngularRange()) {

		// date - the date we're interested in
		// dateRange	- the contextual dateRange
		// angularRange	- the angular range the dateRange is mapped to

		const dayOfPeriod  = dates.dayDifference(dateRange.start, date);
		const daysInPeriod = dateRange.length;

		const result = angularRange.division(dayOfPeriod, daysInPeriod);

		return result;
	}/* dateAngularRange */


	/* addAngularRange
	This might be tricky to do is a fully general way.
	Currently only works for even spacing of an array.
	*/
	static addAngularRange(array, angularRange = new AngularRange()) {
		array.forEach(
			(element, index) => {
				element.angularRange = angularRange.division(index, array.length);
			} // nb one-based
		);
	}/* addAngularRange */


	/* addDateRangeRadians
	Currently incomplete/incorrect due to problems with dateRangeRadians
	Need to decide some things:
	* What date period the arc represents
	* What to do with periods outside or crossing out of the primary date range - discard, truncate, extrapolate
	* Special conditions for truncates or extrapolates crossing back into an overlapping pseudo-range, eg year boundaries (seasons)

	Also need to decide what to do with what would be discards - set the radians to undefined, or remove the items (mutate)?

	*/
	static addDateRangeAngularRange(array, arcDateRange, angularRange = new AngularRange(), outlier = '') {
		array.forEach(
			(element) => {
				element.angularRange = this.dateRangeAngularRange(element.dateRange, arcDateRange, angularRange, outlier);
			}
		);
	}/* addDateRangeRadians */



	/* dateRangeAngularRange
	Given two dates return the start, middle, end & width in radians.
	Gives angles in the context of years.
	*/
	static dateRangeAngularRange(dateRange, arcDateRange, angularRange = new AngularRange, outlier = '') {
		// dateRange	- the range of dates we're interested in
		// arcDateRange	- the date range of the contextual arc
		// angularRange	- the angular range of the contextual arc that the date range is mapped to
		// outlier		- currently unused

		const start = this.dateAngularRange(dateRange.start, arcDateRange, angularRange).start;
		const end = this.dateAngularRange(dateRange.end, arcDateRange, angularRange).start;

		/*
		switch(outlier) {
			case 'truncate'    : result += (Math.cos(radians) < 0) ? 180 : 0; break;
			case 'extrapolate' : result += (Math.sin(radians) < 0) ? 180 : 0; break;
			case 'wrap'    : result += (Math.sin(radians) > 0) ? 180 : 0; break;
		} */


		/* 	Need to add or subtract additional 2pi rotations based on the year difference
		TODO:
		This will have to change with angular context - need to figure out what to do with negatives and year crossings for arcs

		In an arc context it will depedn what the start and length radians represent.
		For example it will be okay to represent a year crossing if the arc date range covers it, but if not then it will be an error, or a truncated sector.
		Will need to think about how to handle these cases.

		*/



		/* let result = {
			start  : start,
			middle : (start + end) / 2,
			end    : end,
			width  : end - start,
		} */

		const result = new AngularRange(start.degrees, end.degrees-start.degrees);

		return result;
	}/* dateRangeAngularRange */



	//
	//	CRAP CODE END
	//



}/* yearclock.Geometry */



/* yearclock.Geometry.Angle
*/
export class Angle {
	#degrees = 0;

	constructor(degrees=0) {
		this.#degrees = degrees;
	}

	get degrees()    { return this.#degrees; }
	get radians()    { return this.#degrees / 180 * Math.PI; }
	get radiansPi()  { return this.#degrees / 180; }
	get radiansTau() { return this.#degrees / 360; }

	set degrees(degrees)         { this.#degrees = degrees; return this; }
	set radians(radians)         { this.#degrees = radians * 180 / Math.PI; return this; }
	set radiansPi(radiansPi)     { this.#degrees = radiansPi * 180; return this; }
	set radiansTau(radiansTau)   { this.#degrees = radiansTau * 360; return this; }

	plus(angle) {
		this.#degrees += angle.degrees;
	}

}/* yearclock.Geometry.Angle */


/* yearclock.Geometry.AngularRange
*/
export class AngularRange  {
	start;
	width;

	constructor(start = 0, width = 360) {
		this.start = new Angle(start);
		this.width = new Angle(width);
	}

	get end()    { return new Angle(this.start.degrees + this.width.degrees); }
	get middle() { return new Angle(this.start.degrees + (this.width.degrees)/2); }

	position(ratio) { return new Angle(this.start.degrees + (this.width.degrees * ratio)); }

	/* division
	Returns a new angular range representing the nth of count part of the parent
	Divisions are zero-based.
	*/
	division(number, count) {
		//console.debug('division', arguments);
		const divWidthDegrees = this.width.degrees / count;
		const startDegrees = this.start.degrees + (divWidthDegrees * number);
		const result = new AngularRange(startDegrees, divWidthDegrees);
		return result;
	}

}/* yearclock.Geometry.AngularRange */




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




//
// Classes
//

export class Point {
	constructor(x=0, y=0, precision=12) {
		this.x = x;
		this.y = y;
		this.precision = precision;
	}

	plus(point) {
		return new Point(
			this.x + point.x,
			this.y + point.y
		);
	}

	distanceFrom(point = new Point()) {
		const result = Math.hypot((this.x - point.x), (this.y - point.y));
		return result;
	}

	// Clockwise from y axis
	radiansFrom(center = new Point()) {
		const result = Math.PI/2 + Math.atan2(this.y-center.y, this.x-center.x);
		return result;
	}

	toPolarPoint(polarPoint = new PolarPoint()) {
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
	radiansFrom(center = new Point()) {
		const result = Math.PI/2 + Math.atan2(this.y-center.y, this.x-center.x);
		return result;
	}


	get distanceFromOrigin() {
		return Math.hypot(this.x, this.y);
	}

	getDistanceFrom(point = new Point()) {
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
	rotate(radian) {
		const newPoint = new PolarPoint(this.radian + radian, this.distanceFromOrigin).toPoint();
		this.x = newPoint.x;
		this.y = newPoint.y;
		return this;
	}


}/* Point */




export class PolarPoint {
	constructor(radian=0, radius=0, precision=12)
	{
		this.radian = radian;
		this.radius = radius;
		this.precision = precision;
	}

	toPoint() {
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

	plus(polarPoint) {
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
	move(distance, heading) {
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




export class Annulus {
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


