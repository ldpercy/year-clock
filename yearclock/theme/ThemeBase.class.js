/* ThemeBase
*/
class ThemeBase extends Clock {

	constructor(id) {
		super();
		this.id = id;
	}


	description = "common";
	element = undefined;
	config = {};



	//
	/*
	viewBox           = '-1200 -1200 2400 2400';
	clockRadius       = 1200;
	outerRadius       = 1120;
	innerRadius       = 930;

	weekdayMarkerLength = 40;
	weekendMarkerLength = 55;
	yearHandLength    = 1030;
	dateLabelPosition         = 500;

	monthLabel = {
		radius         : 985,
		sectorPosition : 0.5,
		rotate         : true,
		invert         : true,
	};
	*/


	//
	// formatting functions
	//


	formatTitle = function(type, data) {
		let result;
		switch(type) {
			case 'hands'    : result = `${isoDate(data.date.object)} - ${data.date.name} - d${data.date.dayOfYear}`; break;
			default         : result = data.name; break;
		}
		return result;
	}

	formatLabel = function(labelType, data) {
		let result;
		switch(labelType) {
			case 'year'     : result = `${data.date.getFullYear()}`; break;
			case 'date'     : result = `${data.date.getFullYear()}`; break;
			default         : result = data.name; break;
		}
		return result;
	}



	//
	// drawing functions
	//


	/* Draw Clock
	*/
	getClockSVG = function(displayDate)
	{
		const clockSVG = `
			<svg id="clock" class="yearclock" viewBox="${this.viewBox}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
				${this.getFace()}
				${this.getMonthSectors(displayDate.monthArray)}
				${this.getMonthLabels(displayDate.monthArray)}
				${this.getYearDayTicks(displayDate.yearDayArray)}
				${this.getDateLabel(displayDate.object)}
				${this.getHands(displayDate)}
			</svg>
		`;

		return clockSVG;
	}/* getClockSVG */


	/* getViewbox
	Mainly for debugging for now
	*/
	getViewbox = function(viewBox=this.viewBox) {
		const vb =  splitViewBox(viewBox);
		const svg = `<rect class="viewBox" x="${vb.x}" y="${vb.y}" width="${vb.width}" height="${vb.height}"></rect>`;
		return svg;
	}/* getViewbox */


	getBody = function() {
		const svg =
			`<circle cx="0" cy="0" r="${this.clockRadius}" class="face"></circle>`
		return svg;
	}


	getFace = function() {
		const svg = `<circle cx="0" cy="0" r="${this.clockRadius}" class="face"></circle>`
		return svg;
	}


	getMonthSectors = function(monthArray, radiusStart, radiusEnd) {
		let newSvg = '';
		for (let month of monthArray)
		{
			const sectorPath = getSectorPath(month.radiansStart, month.radiansEnd, radiusStart, radiusEnd);
			const sectorSvg = `<path d="${sectorPath}" class="sector ${month.code} ${month.class}"><title>${month.name}</title></path>`;
			newSvg += sectorSvg;
		}
		return `<g class="month sector">${newSvg}</g>`;
	}/* getMonthSectors */


	/* getMonthLabels
	This is nearly ready to get rid of
	*/
	getMonthLabels = function(monthArray) {
		let newSvg = '';
		for (let month of monthArray)
		{
			const radiansLabel = month.radiansStart + (month.radiansWidth * this.monthLabel.sectorPosition);

			const center     = polarPoint(radiansLabel, this.monthLabel.radius);
			let transform = '';

			if (this.monthLabel.rotate)
			{
				let rotate = this.rotationDegrees(radiansLabel, this.monthLabel);
				transform = `rotate(${rotate}, ${center.x}, ${center.y})`;
			}
			const labelSvg =
				`<text class="${month.class}" x="${center.x}" y="${center.y}" transform="${transform}">${this.formatLabel('month', month)}</text>`;
			newSvg += labelSvg;
		}
		const result = `<g class="month label monthLabels">${newSvg}</g>`;
		return result;
	}/* getMonthLabels */



	/* getYearDayTicks
	*/
	getYearDayTicks = function(yearDayArray) {
		const yearDayTicks = this.getPeriodDayTicks(yearDayArray);
		const result = `
			<g class="day yearDay tick">
				${yearDayTicks}
			</g>`;
		return result;
	}/* getYearDayTicks */



	/* getMonthDayTicks
	*/
	getMonthDayTicks = function(monthDayArray) {
		const monthDayTicks = this.getPeriodDayTicks(monthDayArray);
		const result = `
			<g class="day monthDay tick">
				${monthDayTicks}
			</g>`;
		return result;
	}/* getMonthDayTicks */



	/* getPeriodDayTicks
	*/
	getPeriodDayTicks = function(periodArray) {

		const weekdayTickInnerRadius = this.outerRadius - this.weekdayMarkerLength;
		const weekendTickInnerRadius = this.outerRadius - this.weekendMarkerLength

		let result = '';
		let tickClass = '';
		let tickLine;
		let tickSvg;

		for (let day of periodArray)
		{
			let dayAngle = divisionRadians(periodArray.length, day.dayOfPeriod);

			if (day.isWeekend)
			{
				tickLine = radialLine(dayAngle.start, this.outerRadius, weekendTickInnerRadius);
				tickClass = 'weekend';
			}
			else // day.isWeekday
			{
				tickLine = radialLine(dayAngle.start, this.outerRadius, weekdayTickInnerRadius);
				tickClass = 'weekday';
			}

			tickSvg =
				`<line class="${tickClass}" data-number="${day.number}" data-date="${day.isoShort}" x1="${tickLine.xStart}" y1="${tickLine.yStart}" x2="${tickLine.xEnd}" y2="${tickLine.yEnd}" ></line>`;
			result += tickSvg;

			if (day.isFirst) // Draw an extra line for firsts of the month
			{
				tickLine = radialLine(dayAngle.start, this.outerRadius, this.innerRadius);
				tickClass = 'first';
				tickSvg =
					`<line class="${tickClass}" data-number="${day.number}" data-date="${day.isoShort}" x1="${tickLine.xStart}" y1="${tickLine.yStart}" x2="${tickLine.xEnd}" y2="${tickLine.yEnd}" ></line>`;
				result += tickSvg;
			}
		}

		return result;
	}/* getPeriodDayTicks */



	/* getDateLabel
	This and year below need to be generally sorted out
	*/
	getDateLabel = function(date, point) {
		let x,y;

		if (this.dateLabelPosition instanceof Point)
		{
			x = this.dateLabelPosition.x;
			y = this.dateLabelPosition.y;
		}
		else
		{
			const yearOnLeft = dateRatio(date) < 0.5
			const labelSide = yearOnLeft ? -1 : 1
			x = this.dateLabelPosition * labelSide;
			y = 0;
		}

		const svg =
			`<g class="dateLabel">
				<text x="${x}" y="${y}" class="label dateLabel">${this.formatLabel('date',{'date':date})}</text>
			</g>`;

		return svg;
	}/* getDateLabel */


	/* getYearLabel
	*/
	getYearLabel = function(date, point) {
		const svg =
			`<g class="dateLabel">
				<text x="${point.x}" y="${point.y}" class="label yearLabel">${this.formatLabel('year',{'date':date})}</text>
			</g>`;
		return svg;
	}/* getYearLabel */


	/* getWeekLabel
	* /
	getWeekLabel = function(date, point) {
		const svg =
			`<g class="dateLabel">
				<text x="${point.x}" y="${point.y}" class="label weekLabel">${date.getFullYear()}</text>
			</g>`;
		return svg;
	}/ * drawWeekLabel */


	/* getDayLabel
	* /
	getDayLabel = function(date, point) {
		const svg =
			`<g class="drawDayLabel">
				<text x="${point.x}" y="${point.y}" class="label drawDayLabel">${date.getFullYear()}</text>
			</g>`;
		return svg;
	}/ * drawYearLabel */




	/* getHands
	This has a bunch of globals in it - need
	*/
	getHands = function(displayDate, drawMonthHand) {

		// calculate year hand params
		const yearDayDivision = divisionDegrees(displayDate.daysInYear, displayDate.dayOfYear);
		const yearTransform = `rotate(${yearDayDivision.middle},0,0)`;
		// get year hand
		const yearHand = this.getHandPath(this.yearHandLength, yearTransform, 'yearHand', '');

		var monthHand = '';

		if (drawMonthHand) {
			// calculate month hand params
			const monthDayDivision = divisionDegrees(displayDate.monthDayArray.length, displayDate.object.getDate());
			const monthTransform = `rotate(${monthDayDivision.middle},0,0)`;
			// get month hand
			monthHand = this.getHandPath(this.monthHandLength, monthTransform, 'monthHand', '');
		}

		const svg = `
			<g class="hands">
				<title>${this.formatTitle('hands',{'date':displayDate})}</title>
				${yearHand}
				${monthHand}
			</g>`;
		return svg;
	}


	/* getHandPath
	*/
	getHandPath = function(length, transform, cssClass, id)
	{
		const path = `
			M 12 160
			L -12 160
			L 0, -${length}
			Z
			M 30 0
			A 30,30 0 1 1 -30,00
			A 30,30 0 1 1 30,00`;
		const svg = `<path  id="${id}" class="${cssClass}" d="${path}" transform="${transform}"></path>`;
		return svg;
	}



	/* getPeriodDaySectors
	*/
	getPeriodDaySectors = function(name, periodArray, radiusStart, radiusEnd)
	{
		let sectorPath = '';
		let sectorSvg = '';

		for (let day of periodArray)
		{
			let thisDivisionRadians = divisionRadians(periodArray.length, day.dayOfPeriod);

			//log(thisDivisionRadians);
			const sectorPath = getSectorPath(thisDivisionRadians.start, thisDivisionRadians.end, radiusStart, radiusEnd);
			sectorSvg += `<path class="sector day ${day.name} ${day.class}" d="${sectorPath}"><title>${this.formatTitle('day',day)}</title></path>`;
		}

		const result = `
			<g class="periodSectors ${name}">
				${sectorSvg}
			</g>`;

		return result;
	}/* getPeriodDaySectors */



	getSectors = function(sectorType, sectorArray, radiusStart, radiusEnd)
	{
		let newSvg = '';
		for (let sector of sectorArray)
		{
			const sectorPath = getSectorPath(sector.radians.start, sector.radians.end, radiusStart, radiusEnd);
			const sectorSvg = `<path d="${sectorPath}" class="sector ${sectorType}-${sector.name} ${sector.class}"><title>${this.formatTitle(sectorType,sector)}</title></path>`;
			newSvg += sectorSvg;
		}
		const result = `<g class="${sectorType}">${newSvg}</g>`;
		return result;
	}


	/* getSectorLabels
	*/
	getSectorLabels = function(sectorType, sectorArray, labelSettings)
	{
		let newSvg = '';
		for (let sector of sectorArray)
		{
			//log('drawSectorLabels', sector);
			const radiansLabel = sector.radians.start + (sector.radians.width * labelSettings.sectorPosition);

			const center     = polarPoint(radiansLabel, labelSettings.radius);
			let transform = '';

			if (labelSettings.rotate)
			{
				let rotate = this.rotationDegrees(radiansLabel, labelSettings);
				transform = `rotate(${sf(rotate)}, ${sf(center.x)}, ${sf(center.y)})`;
			}
			const labelSvg =
				`<text class="${sector.class}" x="${sf(center.x)}" y="${sf(center.y)}" transform="${transform}">${this.formatLabel(sectorType, sector)}</text>`;
			newSvg += labelSvg;
		}

		const result =
			`<g class="label ${sectorType}">
				${newSvg}
			</g>`;
		return result;
	}/* getSectorLabels */



	/* rotationDegrees
	*/
	rotationDegrees = function(radians, settings) {
		let result = 0;

		switch(settings.rotate) {
			case 'none'         : result = 0; break;
			case 'radial-left'  : result = degrees(radians) - 90; break;
			case 'radial-right' : result = degrees(radians) + 90; break;
			case 'radial'       : result = degrees(radians); break;
			case true           : result = degrees(radians); break;
			default             : result = 0; break;
		}

		switch(settings.invert) {
			case true       : result += (Math.cos(radians) < 0) ? 180 : 0; break;
			case 'left'     : result += (Math.sin(radians) < 0) ? 180 : 0; break;
			case 'right'    : result += (Math.sin(radians) > 0) ? 180 : 0; break;
		}
		return result;
	}/* rotationDegrees */


}/* ThemeBase */