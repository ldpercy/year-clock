/* ThemeBase
*/
class ThemeBase extends Clock {


	constructor(id, date, theme, style, language) {
		super(id, date, theme, style, language);
	}


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


	/* getClockSVG
	*/
	getClockSVG = function(displayDate)
	{
		// const clockSVG = `
		// 	<svg id="clock" class="yearclock" viewBox="${this.viewBox}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
		// 		${this.getFace()}
		// 		${this.getSectors('month', displayDate.monthArray, this.outerRadius, this.innerRadius)}
		// 		${this.getSectorLabels('month', displayDate.monthArray)}
		// 		${this.getPeriodDayTicks('yearDay', displayDate.yearDayArray)}
		// 		${this.getDateLabel(displayDate.object)}
		// 		${this.getHands(displayDate)}
		// 	</svg>
		// `;
		// return clockSVG;
		// throw('getClockSVG should be overridden by the theme');
		return `<svg viewBox="${this.viewBox}"> <text> getClockSVG should be overridden by the theme </text> </svg>`;
	}/* getClockSVG */


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
			let dayAngle = divisionRadians(periodArray.length, day.dayOfPeriod);

			if (day.isWeekend)
			{
				tickLine = radialLine(dayAngle.start, tick.weekendStart, tick.weekendEnd);
				tickClass = 'weekend';
			}
			else // day.isWeekday
			{
				tickLine = radialLine(dayAngle.start, tick.weekdayStart, tick.weekdayEnd);
				tickClass = 'weekday';
			}

			tickSvg +=
				`<line class="${tickClass}" data-date="${day.isoShort}" x1="${tickLine.xStart}" y1="${tickLine.yStart}" x2="${tickLine.xEnd}" y2="${tickLine.yEnd}" ></line>`;

			if (day.isFirst) // Draw an extra line for firsts of the month
			{
				tickLine = radialLine(dayAngle.start, tick.monthFirstStart, tick.monthFirstEnd);
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



	/* getDateLabel
	This and year below need to be generally sorted out
	*/
	getDateLabel = function(date, dateLabelPosition) {
		let x,y;

		if (dateLabelPosition instanceof Point)
		{
			x = dateLabelPosition.x;
			y = dateLabelPosition.y;
		}
		else
		{
			const yearOnLeft = dateRatio(date) < 0.5
			const labelSide = yearOnLeft ? -1 : 1
			x = dateLabelPosition * labelSide;
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



	/* getHands
	*/
	getHands = function(displayDate, handConfig) {

		log('getHands:',handConfig);

		// calculate year hand params
		const yearDayDivision = divisionDegrees(displayDate.daysInYear, displayDate.dayOfYear);
		const yearTransform = `rotate(${yearDayDivision.middle},0,0)`;

		// get year hand
		const yearHandFunc = (handConfig.year.function) ? handConfig.year.function() : this.getBasicHand;
		log('yearHandFunc:',yearHandFunc);

		const yearHand = yearHandFunc(handConfig.year, yearTransform, 'yearHand', '');

		var monthHand = '';

		if (handConfig.month) {
			// calculate month hand params
			const monthDayDivision = divisionDegrees(displayDate.monthDayArray.length, displayDate.object.getDate());
			const monthTransform = `rotate(${monthDayDivision.middle},0,0)`;
			// get month hand
			const monthHandfFunc = (handConfig.month.function)  ? handConfig.month.function() : this.getBasicHand;
			monthHand = monthHandfFunc(handConfig.month, monthTransform, 'monthHand', '');
		}

		const svg = `
			<g class="hands">
				<title>${this.formatTitle('hands',{'date':displayDate})}</title>
				${yearHand}
				${monthHand}
			</g>`;
		return svg;
	}/* getHands */


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



	/* getPeriodDaySectors
	*/
	getPeriodDaySectors = function(name, periodArray, radiusStart, radiusEnd)
	{
		log('getPeriodDaySectors:', arguments);
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


	/* getSectors
	*/
	getSectors = function(sectorType, sectorArray, radiusStart, radiusEnd)
	{
		let newSvg = '';
		for (let sector of sectorArray)
		{
			const sectorPath = getSectorPath(sector.radians.start, sector.radians.end, radiusStart, radiusEnd);
			const sectorSvg = `<path d="${sectorPath}" class="sector ${sectorType}-${sector.id} ${sector.class}"><title>${this.formatTitle(sectorType,sector)}</title></path>`;
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

			const textPath = `<textPath class="${sector.class}" startOffset="50%" xlink:href="#${pathId}">${this.formatLabel(sectorType, sector)}</textPath>`;
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


}/* ThemeBase */