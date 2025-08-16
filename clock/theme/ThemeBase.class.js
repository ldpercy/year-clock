/* ThemeBase
*/
class ThemeBase extends Clock {


	viewBox = '-1200 -1200 2400 2400';


	//
	// formatting functions
	//

	formatTitle = function(type, data) {
		let result;
		switch(type) {
			case 'hands'    : result = `${isoDate(data.date.object)} - ${data.date.name} - d${data.date.dayOfYear}`; break;
			default         : result = data.name || data.id; break;
		}
		return result;
	}

	formatLabel = function(labelType, data) {
		let result;
		switch(labelType) {
			case 'year'         : result = `${data.year}`; break;
			case 'date'         : result = `${isoDate(data.object)}` ; break;
			case 'dayNumber'    : result = `${data.dayOfMonth}`; break;
			default             : result = data.name || data.id; break;
		}
		return result;
	}



	//
	// drawing functions
	//


	/* getClockSVG
	*/
	getClockSVG = function(displayDate)
	{
		const grid = (this.background === 'wireframe') ? this.getGrid(this.viewBox) : '';

		const clockSVG = `
			<svg id="clock" class="yearclock hemisphere-${this.hemisphere}" viewBox="${this.viewBox}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
				${grid}
				${this.getThemeSVG(displayDate)}
			</svg>`;

		return clockSVG;
	}/* getClockSVG */


	/* getThemeSVG
	*/
	getThemeSVG = function(displayDate)
	{
		return `<text> getThemeSVG should be overridden by the theme </text>`;
	}/* getThemeSVG */



	/* getViewbox
	Mainly for debugging for now
	*/
	getViewbox = function(viewBox=this.viewBox) {
		const vb =  splitViewBox(viewBox);
		const svg = `<rect class="viewBox" x="${vb.x}" y="${vb.y}" width="${vb.width}" height="${vb.height}"></rect>`;
		return svg;
	}/* getViewbox */


	getBody = function(body) {
		const svg =
			`<circle cx="0" cy="0" r="${body.radius}" class="body"></circle>`
		return svg;
	}


	getFace = function(faceRadius) {
		const svg = `<circle cx="0" cy="0" r="${faceRadius}" class="face"></circle>`
		return svg;
	}



	/* getPeriodDayTicks
	*/
	getPeriodDayTicks = function(periodType, periodArray, tick) {
		let tickClass = '';
		let tickLine = '';
		let tickSvg = '';

		for (let day of periodArray)
		{
			if (day.isWeekend)
			{
				tickLine = radialLine(day.radians.start, tick.weekendStart, tick.weekendEnd);
				tickClass = 'weekend';
			}
			else // day.isWeekday
			{
				tickLine = radialLine(day.radians.start, tick.weekdayStart, tick.weekdayEnd);
				tickClass = 'weekday';
			}

			tickSvg +=
				`<line class="${tickClass}" data-date="${day.isoShort}" x1="${tickLine.xStart}" y1="${tickLine.yStart}" x2="${tickLine.xEnd}" y2="${tickLine.yEnd}" ></line>`;

			if (day.isFirst) // Draw an extra line for firsts of the month
			{
				tickLine = radialLine(day.radians.start, tick.monthFirstStart, tick.monthFirstEnd);
				tickClass = 'first';
				tickSvg +=
					`<line class="${tickClass}" data-date="${day.isoShort}" x1="${tickLine.xStart}" y1="${tickLine.yStart}" x2="${tickLine.xEnd}" y2="${tickLine.yEnd}" ></line>`;
			}
		}

		const result = `
			<g class="day ${periodType} tick">
				${tickSvg}
			</g>`;

		return result;
	}/* getPeriodDayTicks */



	/* getPeriodMarkers
	*/
	getPeriodMarkers = function() {

	}
	/* getPeriodMarkers */



	/* getDateLabel
	This and year below need to be generally sorted out
	*/
	getDateLabel = function(labelType, displayDate, setting) {
		let x,y;

		if (setting.position instanceof Point)
		{
			x = setting.position.x;
			y = setting.position.y;
		}
		else
		{
			const yearOnLeft = dateRatio(displayDate.object) < 0.5
			const labelSide = yearOnLeft ? -1 : 1
			x = setting.position * labelSide;
			y = 0;
		}

		const svg =
			`<g class="dateLabel">
				<text x="${x}" y="${y}" class="label dateLabel ${labelType}" ${(setting.attribute || '')}>${this.formatLabel(labelType, displayDate)}</text>
			</g>`;

		return svg;
	}/* getDateLabel */



	/* getHands
	*/
	getHands = function(displayDate, handConfig) {
		//log('getHands:',handConfig);

		const yearHand = (handConfig.year) ? this.getYearHand(displayDate, handConfig.year): '';
		const monthHand = (handConfig.month) ? this.getMonthHand(displayDate, handConfig.month): '';

		const svg = `
			<g class="hands">
				<title>${this.formatTitle('hands',{'date':displayDate})}</title>
				${yearHand}
				${monthHand}
			</g>`;
		return svg;
	}/* getHands */


	/* getYearHand */
	getYearHand = function(displayDate, handConfig, degreeDelta = new DegreeDelta) {
		// calculate year hand params
		const yearDayDivision = divisionDegrees(displayDate.daysInYear, displayDate.dayOfYear-1, degreeDelta);
		const yearTransform = `rotate(${yearDayDivision.middle},0,0)`;
		// get year hand
		const yearHandFunc = (handConfig.function) ? handConfig.function() : this.getBasicHand;
		//log('yearHandFunc:',yearHandFunc);
		const result = yearHandFunc(handConfig, yearTransform, 'yearHand', '');
		return result;
	}/* getYearHand */


	/* getMonthHand */
	getMonthHand = function(displayDate, handConfig, degreeDelta = new DegreeDelta) {
		// calculate month hand params
		const monthDayDivision = divisionDegrees(displayDate.monthDayArray.length, displayDate.object.getDate()-1, degreeDelta);
		const monthTransform = `rotate(${monthDayDivision.middle},0,0)`;
		// get month hand
		const monthHandFunc = (handConfig.function)  ? handConfig.function() : this.getBasicHand;
		const result = monthHandFunc(handConfig, monthTransform, 'monthHand', '');
		return result;
	}/* getMonthHand */



	/* getBasicHand
	*/
	getBasicHand = function(param, transform, cssClass, id)
	{
		const path = `
			M 12 160
			L -12 160
			L 0, -${param.length}
			Z
			M 30 0
			A 30,30 0 1 1 -30,00
			A 30,30 0 1 1 30,00`;
		const svg = `<path  id="${id}" class="${cssClass}" d="${path}" transform="${transform}"></path>`;
		return svg;
	}/* getBasicHand */



	/* getHand1
	Test of a more configurable hand shape
	*/
	getHand1 = function(param, transform, cssClass, id) {

		const discX = param.discRadius * (5/13);
		const discY = param.discRadius * (12/13);
		/* Need to use a better pythagorean triad or do the trig properly */

		const path = `
			M -${param.tipRadius}, -${param.length}
			A ${param.tipRadius},${param.tipRadius} 0 1 1 ${param.tipRadius}, -${param.length}

			L ${discX} -${discY}
			A ${param.discRadius},${param.discRadius} 0 0 1 ${discX}, ${discY}

			L ${param.width} ${param.tail}
			L -${param.width} ${param.tail}

			L -${discX} ${discY}
			A ${param.discRadius},${param.discRadius} 0 0 1 -${discX}, -${discY}

			Z`;
		const svg =
			`<path id="${id}" class="hand1 ${cssClass}" d="${path}" transform="${transform}"/>`;
		return svg;
	}/* getHand1 */



	/* getPeriodDaySectors
	Is this still necessary??
	*/
	getPeriodDaySectors = function(name, periodArray, radiusStart, radiusEnd)
	{
		//log('getPeriodDaySectors:', arguments);
		let sectorPath = '';
		let sectorSvg = '';

		for (let day of periodArray)
		{
			//let thisDivisionRadians = divisionRadians(periodArray.length, day.dayOfPeriod);

			//log(thisDivisionRadians);
			const sectorPath = getSectorPath(day.radians.start, day.radians.end, radiusStart, radiusEnd);
			sectorSvg += `<path class="sector day ${day.name} ${day.class}" d="${sectorPath}"><title>${this.formatTitle('day',day)}</title></path>`;
		}

		const result = `
			<g class="periodSectors ${name}">
				${sectorSvg}
			</g>`;

		return result;
	}/* getPeriodDaySectors */


	/* getSectors
	*/
	getSectors = function(sectorType, sectorArray, annulus)
	{
		let newSvg = '';
		for (let sector of sectorArray)
		{
			const sectorPath = getSectorPath(sector.radians.start, sector.radians.end, annulus);
			const sectorSvg = `<path d="${sectorPath}" class="sector ${sectorType}-${sector.id} ${sector.class}"><title>${this.formatTitle(sectorType, sector)}</title></path>`;
			newSvg += sectorSvg;
		}
		const result = `<g class="sectorGroup ${sectorType}">${newSvg}</g>`;
		return result;
	}/* getSectors */


	/* getSectorLabels
		labelSetting = {
			radius         : number,
			sectorPosition : number,
			rotate         : boolean,
			invert         : boolean,
		};
	*/
	getSectorLabels = function(sectorType, sectorArray, labelSettings)
	{
		//log('getSectorLabels:', arguments);
		let newSvg = '';
		for (let sector of sectorArray)
		{
			//log('sector:', sector);
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


	/* getSectorLabelsCurved
		labelSetting = {
			radius         : number,
			invert         : boolean,
		};
	*/
	getSectorLabelsCurved = function(sectorType, sectorArray, labelSettings)
	{
		//log('getSectorLabels:', arguments);

		let defs = '';
		let textPaths = '';
		let labelArc = '';

		for (let sector of sectorArray)
		{
			//log('sector:', sector);

			const pathId = `labelPath-${sectorType}-${sector.id}`;

			if (labelSettings.invert && (Math.cos(sector.radians.middle) < 0)) {
				labelArc = getArcPath(sector.radians.end, sector.radians.start, labelSettings.radius);
			}
			else {
				labelArc = getArcPath(sector.radians.start, sector.radians.end, labelSettings.radius);
			}

			const labelPath = `<path id="${pathId}" d="${labelArc}"/>`;
			defs += labelPath;

			const textPath = `<textPath class="${sector.class}" startOffset="50%" href="#${pathId}">${this.formatLabel(sectorType, sector)}</textPath>`;
			textPaths += textPath;
		}

		const result =
			`<g class="label ${sectorType}">
				<defs>${defs}</defs>
				<text>${textPaths}</text>
			</g>`;
		return result;
	}/* getSectorLabelsCurved */



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


	/* getGrid
	*/
	getGrid = function(viewBox, spacing=100, major=500) {

		const vb = splitViewBox(viewBox);

		const x1 = vb.x;
		const x2 = vb.x + vb.width;
		const y1 = vb.y;
		const y2 = vb.y + vb.height;


		const xAxis = `<line class="axis" x1="${x1}" y1="0" x2="${x2}" y2="0"></line>`;
		const yAxis = `<line class="axis" x1="0" y1="${y1}" x2="0" y2="${y2}"></line>`;

		let horizontal = '';
		let vertical = '';

		let x=0, y=0;

		while (x < (vb.width/2)){
			x += spacing;
			const className = (x % major === 0) ? 'major' : 'minor';
			vertical += `
				<line class="${className}" x1="${x}" y1="${y1}" x2="${x}" y2="${y2}"></line>
				<line class="${className}" x1="${-x}" y1="${y1}" x2="${-x}" y2="${y2}"></line>
			`;
		}
		while (y < (vb.height/2)){
			y += spacing;
			const className = (y % major === 0) ? 'major' : 'minor';
			horizontal += `
				<line class="${className}" x1="${x1}" y1="${y}" x2="${x2}" y2="${y}"></line>
				<line class="${className}" x1="${x1}" y1="${-y}" x2="${x2}" y2="${-y}"></line>
			`;
		}

		const result = `
			<g id="grid">
				${xAxis}
				${yAxis}
				${vertical}
				${horizontal}
			</g>
		`;

		return result;
	}/* getGrid */




	/* getSymbols
		symbolSetting = {
			radius         : number,
			position       : number,
			rotate         : boolean,
			invert         : boolean,
		};
	*/
	getSymbols = function(symbolType, symbolArray, settings)
	{
		//log('getSymbols:', arguments);
		let newSvg = '';
		for (let element of symbolArray)
		{
			//log('sector:', sector);
			const radians = element.radians.start + (element.radians.width * settings.position);

			const center     = polarPoint(radians, settings.radius);
			let transform = '';

			if (settings.rotate)
			{
				let rotate = this.rotationDegrees(radians, settings);
				transform = `rotate(${sf(rotate)}, ${sf(center.x)}, ${sf(center.y)})`;
			}
			const symbolSvg =
				`<use href="#${settings.elementId}" class="${element.class}"
					x="${sf(center.x)}" y="${sf(center.y)}"
					width="${settings.width}" height="${settings.height}"
					transform="${transform}"/>`;
			newSvg += symbolSvg;
		}

		const result = `
			<g class="symbol ${symbolType}">
				${newSvg}
			</g>`;
		return result;
	}/* getSymbols */





}/* ThemeBase */