class ThemeBase extends Clock {

	constructor(id) {
		this.id = id;
	}


	description = "common";
	element = undefined;
	config = {};


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
	drawClock = function(clockElement, displayDate)
	{
		// Set Up Drawing
		this.element = clockElement;
		//theme.clock.drawViewbox();
		this.drawFace();
		this.drawMonthSectors(displayDate.monthArray);
		this.drawMonthLabels(displayDate.monthArray);
		this.drawYearDayTicks(displayDate.yearDayArray);
		this.drawDateLabel(displayDate.object);
		this.drawHands(displayDate);
	}/* drawClock */


	/* drawViewbox
	Mainly for debugging for now
	*/
	drawViewbox = function(viewBox=theme.clock.viewBox) {
		const vb =  splitViewBox(viewBox);
		const svg = `<rect class="viewBox" x="${vb.x}" y="${vb.y}" width="${vb.width}" height="${vb.height}"></rect>`;
		theme.clock.element.innerHTML += svg;
	}/* drawViewbox */


	drawBody = function() {
		const svg =
			`<circle cx="0" cy="0" r="${theme.clock.clockRadius}" class="face"></circle>`
		theme.clock.element.innerHTML += svg;
	}


	drawFace = function() {
		const svg = `<circle cx="0" cy="0" r="${theme.clock.clockRadius}" class="face"></circle>`
		theme.clock.element.innerHTML += svg;
	}


	drawMonthSectors = function(monthArray, radiusStart=theme.clock.outerRadius, radiusEnd=theme.clock.innerRadius) {
		let newSvg = '';
		for (let month of monthArray)
		{
			const sectorPath = getSectorPath(month.radiansStart, month.radiansEnd, radiusStart, radiusEnd);
			sectorSvg = `<path d="${sectorPath}" class="sector ${month.code} ${month.class}"><title>${month.name}</title></path>`;
			newSvg += sectorSvg;
		}
		theme.clock.element.innerHTML += `<g class="month sector">${newSvg}</g>`;
	}/* drawMonthSectors */


	/* drawMonthLabels
	This is nearly ready to get rid of
	*/
	drawMonthLabels = function(monthArray) {
		let newSvg = '';
		for (let month of monthArray)
		{
			const radiansLabel = month.radiansStart + (month.radiansWidth * theme.clock.monthLabel.sectorPosition);

			const center     = polarPoint(radiansLabel, theme.clock.monthLabel.radius);
			let transform = '';

			if (theme.clock.monthLabel.rotate)
			{
				let rotate = rotationDegrees(radiansLabel, theme.clock.monthLabel);
				transform = `rotate(${rotate}, ${center.x}, ${center.y})`;
			}
			const labelSvg =
				`<text class="${month.class}" x="${center.x}" y="${center.y}" transform="${transform}">${formatLabel('month', month)}</text>`;
			newSvg += labelSvg;
		}
		theme.clock.element.innerHTML +=
			`<g class="month label monthLabels">
				${newSvg}
			</g>`;
	}/* drawMonthLabels */



	/* drawYearDayTicks
	*/
	drawYearDayTicks = function(yearDayArray) {

		const yearDayTicks = theme.clock.getPeriodDayTicks(yearDayArray);
		theme.clock.element.innerHTML += `
			<g class="day yearDay tick">
				${yearDayTicks}
			</g>`;
	}/* drawYearDayTicks */



	/* drawMonthDayTicks
	*/
	drawMonthDayTicks = function(monthDayArray) {

		const monthDayTicks = theme.clock.getPeriodDayTicks(monthDayArray);
		theme.clock.element.innerHTML += `
			<g class="day monthDay tick">
				${monthDayTicks}
			</g>`;
	}/* drawMonthDayTicks */



	/* getPeriodDayTicks
	*/
	getPeriodDayTicks = function(periodArray) {

		const weekdayTickInnerRadius = theme.clock.outerRadius - theme.clock.weekdayMarkerLength;
		const weekendTickInnerRadius = theme.clock.outerRadius - theme.clock.weekendMarkerLength

		let result = '';
		let tickClass = '';
		let tickLine;
		let tickSvg;

		for (let day of periodArray)
		{
			let dayAngle = divisionRadians(periodArray.length, day.dayOfPeriod);

			if (day.isWeekend)
			{
				tickLine = radialLine(dayAngle.start, theme.clock.outerRadius, weekendTickInnerRadius);
				tickClass = 'weekend';
			}
			else // day.isWeekday
			{
				tickLine = radialLine(dayAngle.start, theme.clock.outerRadius, weekdayTickInnerRadius);
				tickClass = 'weekday';
			}

			tickSvg =
				`<line class="${tickClass}" data-number="${day.number}" data-date="${day.isoShort}" x1="${tickLine.xStart}" y1="${tickLine.yStart}" x2="${tickLine.xEnd}" y2="${tickLine.yEnd}" ></line>`;
			result += tickSvg;

			if (day.isFirst) // Draw an extra line for firsts of the month
			{
				tickLine = radialLine(dayAngle.start, theme.clock.outerRadius, theme.clock.innerRadius);
				tickClass = 'first';
				tickSvg =
					`<line class="${tickClass}" data-number="${day.number}" data-date="${day.isoShort}" x1="${tickLine.xStart}" y1="${tickLine.yStart}" x2="${tickLine.xEnd}" y2="${tickLine.yEnd}" ></line>`;
				result += tickSvg;
			}
		}

		return result;
	}/* getPeriodDayTicks */



	/* drawDateLabel
	This and year below need to be generally sorted out
	*/
	drawDateLabel = function(date, point) {
		let x,y;

		if (theme.clock.dateLabelPosition instanceof Point)
		{
			x = theme.clock.dateLabelPosition.x;
			y = theme.clock.dateLabelPosition.y;
		}
		else
		{
			const yearOnLeft = dateRatio(date) < 0.5
			const labelSide = yearOnLeft ? -1 : 1
			x = theme.clock.dateLabelPosition * labelSide;
			y = 0;
		}

		const svg =
			`<g class="dateLabel">
				<text x="${x}" y="${y}" class="label dateLabel">${formatLabel('date',{'date':date})}</text>
			</g>`;

		theme.clock.element.innerHTML += svg;
	}/* drawDateLabel */


	/* drawYearLabel
	*/
	drawYearLabel = function(date, point) {
		const svg =
			`<g class="dateLabel">
				<text x="${point.x}" y="${point.y}" class="label yearLabel">${formatLabel('year',{'date':date})}</text>
			</g>`;
		theme.clock.element.innerHTML += svg;
	}/* drawYearLabel */


	/* drawWeekLabel
	* /
	theme.clock.drawWeekLabel = function(date, point) {
		const svg =
			`<g class="dateLabel">
				<text x="${point.x}" y="${point.y}" class="label weekLabel">${date.getFullYear()}</text>
			</g>`;
		theme.clock.element.innerHTML += svg;
	}/ * drawWeekLabel */


	/* drawDayLabel
	* /
	theme.clock.drawDayLabel = function(date, point) {
		const svg =
			`<g class="drawDayLabel">
				<text x="${point.x}" y="${point.y}" class="label drawDayLabel">${date.getFullYear()}</text>
			</g>`;
		theme.clock.element.innerHTML += svg;
	}/ * drawYearLabel */




	/* drawHands
	This has a bunch of globals in it - need
	*/
	drawHands = function(displayDate, drawMonthHand) {

		// calculate year hand params
		const yearDayDivision = divisionDegrees(displayDate.daysInYear, displayDate.dayOfYear);
		const yearTransform = `rotate(${yearDayDivision.middle},0,0)`;
		// get year hand
		const yearHand = theme.clock.getHandPath(theme.clock.yearHandLength, yearTransform, 'yearHand', '');

		var monthHand = '';

		if (drawMonthHand) {
			// calculate month hand params
			const monthDayDivision = divisionDegrees(displayDate.monthDayArray.length, displayDate.object.getDate());
			const monthTransform = `rotate(${monthDayDivision.middle},0,0)`;
			// get month hand
			monthHand = theme.clock.getHandPath(theme.clock.monthHandLength, monthTransform, 'monthHand', '');
		}

		const svg = `
			<g class="hands">
				<title>${formatTitle('hands',{'date':displayDate})}</title>
				${yearHand}
				${monthHand}
			</g>`;
		theme.clock.element.innerHTML += svg;
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



	/* drawPeriodDaySectors
	*/
	drawPeriodDaySectors = function(name, periodArray, radiusStart, radiusEnd)
	{
		const periodDaySectors = theme.clock.getPeriodDaySectors(periodArray, radiusStart, radiusEnd);
		theme.clock.element.innerHTML += `
			<g class="periodSectors ${name}">
				${periodDaySectors}
			</g>`;
	}/* drawPeriodDaySectors */


	/* getPeriodDaySectors
	*/
	getPeriodDaySectors = function(periodArray, radiusStart, radiusEnd)
	{
		let result = '';
		let markerClass = '';
		let markerLine;
		let markerSvg = '';
		let sectorPath = '';

		for (let day of periodArray)
		{
			let thisDivisionRadians = divisionRadians(periodArray.length, day.dayOfPeriod);

			//log(day);
			const sectorPath = getSectorPath(thisDivisionRadians.start, thisDivisionRadians.end, radiusStart, radiusEnd);
			sectorSvg = `<path class="sector day ${day.name} ${day.class}" d="${sectorPath}"><title>${formatTitle('day',day)}</title></path>`;

			result += sectorSvg;
		}

		return result;
	}/* getPeriodDaySectors */



	drawSectors = function(sectorType, sectorArray, radiusStart, radiusEnd)
	{
		let newSvg = '';
		for (let sector of sectorArray)
		{
			const sectorPath = getSectorPath(sector.radians.start, sector.radians.end, radiusStart, radiusEnd);
			sectorSvg = `<path d="${sectorPath}" class="sector ${sectorType}-${sector.name} ${sector.class}"><title>${formatTitle(sectorType,sector)}</title></path>`;
			newSvg += sectorSvg;
		}
		theme.clock.element.innerHTML += `<g class="${sectorType}">${newSvg}</g>`;
	}


	/* drawSectorLabels
	*/
	drawSectorLabels = function(sectorType, sectorArray, labelSettings)
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
				let rotate = rotationDegrees(radiansLabel, labelSettings);
				transform = `rotate(${sf(rotate)}, ${sf(center.x)}, ${sf(center.y)})`;
			}
			const labelSvg =
				`<text class="${sector.class}" x="${sf(center.x)}" y="${sf(center.y)}" transform="${transform}">${formatLabel(sectorType, sector)}</text>`;
			newSvg += labelSvg;
		}

		theme.clock.element.innerHTML +=
			`<g class="label ${sectorType}">
				${newSvg}
			</g>`;
	}/* drawSectorLabels */



	/* rotationDegrees
	*/
	rotationDegrees(radians, settings) {
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



}/* ThemeBase  */