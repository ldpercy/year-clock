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
			case 'dayShort'     : result = `${data.name.slice(0,3)}`; break;

			case 'monthNumber'  : result = `${data.number}`; break;
			case 'monthShort'     : result = `${data.name.slice(0,3)}`; break;

			case 'romanNumeralDay'   : result = `${asRomanNumerals(data.dayOfMonth)}`; break;
			case 'romanNumeralMonth' : result = `${asRomanNumerals(data.number)}`; break;
			case 'romanNumeralYear'  : result = `${asRomanNumerals(data.year)}`; break;

			default             : result = data.name || data.id; break;
		}
		return result;
	}



	//
	// drawing functions
	//


	/* getClockSVG
	*/
	getClockSVG = function()
	{
		const grid = (this.parameter.background === 'wireframe') ? this.getGrid(this.viewBox) : '';

		const clockSVG = `
			<svg id="clock" class="yearclock hemisphere-${this.parameter.hemisphere}" viewBox="${this.viewBox}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
				${grid}
				${this.getThemeSVG(this.displayDate)}
			</svg>`;

		return clockSVG;
	}/* getClockSVG */


	/* getThemeSVG
	*/
	getThemeSVG = function()
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
	*/
	getDateLabel = function(labelType, setting) {

		const labelFormat = setting.format || labelType;

		const svg =
			`<g class="dateLabel">
				<text x="${setting.position.x}" y="${setting.position.y}" class="label dateLabel ${labelType}" ${(setting.attribute || '')}>${this.formatLabel(labelFormat, this.displayDate)}</text>
			</g>`;

		return svg;
	}/* getDateLabel */



	/* getHands
	*/
	getHands = function(handConfig) {
		//log('getHands:',handConfig);

		const yearHand = (handConfig.year) ? this.getYearHand(handConfig.year): '';
		const monthHand = (handConfig.month) ? this.getMonthHand(handConfig.month): '';

		const svg = `
			<g class="hands">
				<title>${this.formatTitle('hands',{'date':this.displayDate})}</title>
				${yearHand}
				${monthHand}
			</g>`;
		return svg;
	}/* getHands */


	/* getYearHand */
	getYearHand = function(handConfig, degreeDelta = new DegreeDelta) {
		// calculate year hand params
		const yearDayDivision = divisionDegrees(this.displayDate.daysInYear, this.displayDate.dayOfYear-1, degreeDelta);
		const yearTransform = `rotate(${yearDayDivision.middle},0,0)`;
		// get year hand
		const yearHandFunc = (handConfig.function) ? handConfig.function() : this.getBasicHand;
		//log('yearHandFunc:',yearHandFunc);
		const result = yearHandFunc(handConfig, yearTransform, 'yearHand', '');
		return result;
	}/* getYearHand */


	/* getMonthHand */
	getMonthHand = function(handConfig, degreeDelta = new DegreeDelta) {
		// calculate month hand params
		const monthDayDivision = divisionDegrees(this.displayDate.monthDayArray.length, this.displayDate.object.getDate()-1, degreeDelta);
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






	/* getSectors
	*/
	getSectors = function(sectorName, sectorArray, annulus, option={})
	{
		let newSvg = '';
		let sectorPath = '';
		for (let sector of sectorArray)
		{
			if (option.sizeAdjust) {
				sectorPath = getSectorResized(sector.radians.start, sector.radians.end, annulus, option.sizeAdjust);
			}
			else {
				sectorPath = getSectorPath(sector.radians.start, sector.radians.end, annulus);
			}

			const sectorSvg = `<path d="${sectorPath}" class="sector ${sectorName}-${sector.id} ${sector.name||''} ${sector.class}"><title>${this.formatTitle(sectorName, sector)}</title></path>`;
			newSvg += sectorSvg;
		}
		const result = `<g class="group-sector ${sectorName}">${newSvg}</g>`;
		return result;
	}/* getSectors */


	/* getSectorLabels
		setting = {
			radius         : number,
			sectorPosition : number,
			rotate         : boolean,
			invert         : boolean,
		};
	*/
	getSectorLabels = function(sectorName, sectorArray, setting)
	{
		//log('getSectorLabels:', arguments);
		const labelFormat = setting.format || sectorName;
		let sectorLabelSvg = '';
		for (let sector of sectorArray)
		{
			sectorLabelSvg += this.getSectorLabel(sector, setting, labelFormat);
		}

		const result =
			`<g class="group-label ${sectorName} ${setting.name||''}">
				${sectorLabelSvg}
			</g>`;
		return result;
	}/* getSectorLabels */


	/* getSectorLabel
	*/
	getSectorLabel = function(sector, setting, labelFormat)
	{
		const radiansLabel = sector.radians.start + (sector.radians.width * setting.sectorPosition);

		const center     = new PolarPoint(radiansLabel, setting.radius).toPoint();
		let rotation;
		let transform = '';

		if (setting.rotate)
		{
			rotation = this.rotationDegrees(radiansLabel, setting);
			transform = `rotate(${sf(rotation)}, ${sf(center.x)}, ${sf(center.y)})`;
		}
		const result =
			`<text class="${sector.class}" x="${sf(center.x)}" y="${sf(center.y)}" transform="${transform}">${this.formatLabel(labelFormat, sector)}</text>`;
		return result;
	}/* getSectorLabel */



	/* getSectorLabelsCurved
		setting = {
			radius         : number,
			invert         : boolean,
		};
	*/
	getSectorLabelsCurved = function(sectorName, sectorArray, setting)
	{
		//log('getSectorLabels:', arguments);

		let defs = '';
		let textPaths = '';
		let labelArc = '';

		for (let sector of sectorArray)
		{
			//log('sector:', sector);

			const pathId = `labelPath-${sectorName}-${sector.id}`;

			if (setting.invert === 'all') {
				labelArc = getArcPath(sector.radians.end, sector.radians.start, setting.radius);
			}
			else if (setting.invert && (Math.cos(sector.radians.middle) < 0)) {
				labelArc = getArcPath(sector.radians.end, sector.radians.start, setting.radius);
			}
			else {
				labelArc = getArcPath(sector.radians.start, sector.radians.end, setting.radius);
			}

			const labelPath = `<path id="${pathId}" d="${labelArc}"/>`;
			defs += labelPath;

			const textPath = `<textPath class="${sector.class}" startOffset="50%" href="#${pathId}">${this.formatLabel(sectorName, sector)}</textPath>`;
			textPaths += textPath;
		}

		const result =
			`<g class="group-label label-${sectorName}">
				<defs>${defs}</defs>
				<text>${textPaths}</text>
			</g>`;
		return result;
	}/* getSectorLabelsCurved */



	/* rotationDegrees
	*/
	rotationDegrees = function(radians, setting) {
		let result = 0;

		switch(setting.rotate) {
			case 'none'         : result = 0; break;
			case 'radial-left'  : result = degrees(radians) - 90; break;
			case 'radial-right' : result = degrees(radians) + 90; break;
			case 'radial-in'    : result = degrees(radians) + 180; break;
			case 'radial'       : result = degrees(radians); break;
			case true           : result = degrees(radians); break;
			default             : result = 0; break;
		}

		switch(setting.invert) {
			case true       : result += (Math.cos(radians) < 0) ? 180 : 0; break;
			case 'left'     : result += (Math.sin(radians) < 0) ? 180 : 0; break;
			case 'right'    : result += (Math.sin(radians) > 0) ? 180 : 0; break;
			case 'all'      : result += 180; break;
		}
		return result;
	}/* rotationDegrees */


	/* getGrid
	Todo: Replace most of this with a pattern
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
	getSymbols = function(symbolType, symbolArray, setting)
	{
		//log('getSymbols:', arguments);
		let newSvg = '';
		for (let element of symbolArray)
		{
			//log('sector:', sector);
			const radians = element.radians.start + (element.radians.width * setting.position);

			const center     = new PolarPoint(radians, setting.radius).toPoint();
			let transform = '';

			if (setting.rotate)
			{
				let rotate = this.rotationDegrees(radians, setting);
				transform = `rotate(${sf(rotate)}, ${sf(center.x)}, ${sf(center.y)})`;
			}
			const symbolSvg =
				`<use href="#${setting.elementId}" class="${element.class}"
					x="${sf(center.x)}" y="${sf(center.y)}"
					width="${setting.width}" height="${setting.height}"
					transform="${transform}"/>`;
			newSvg += symbolSvg;
		}

		const result = `
			<g class="group-symbol ${symbolType}">
				${newSvg}
			</g>`;
		return result;
	}/* getSymbols */




	/* getSectorsWithKnockout
		setting = {
			radius         : number,
			invert         : boolean,
		};
	*/
	getSectorsWithKnockout = function(sectorName, sectorArray, setting)
	{
		//log('getSectorsKnockout:', arguments);

		/*
		need sector and label information
		draw sectors normally
		draw and extra set of sectors with labels to use as masks
		will have to create a set of mask ids to dynamically apply to the actual drawn sectors
		*/

		let sectorMasks = '';
		let labelPaths = '';
		let labelArc = '';
		let sectors = '';
		let textMask = '';
		let sectorPath = '';
		let maskPath = '';

		const labelFormat = setting.label.format || sectorName;

		for (let sector of sectorArray)
		{
			//log('sector:', sector);

			const pathId = `labelPath-${sectorName}-${sector.id}`;
			const maskId = `sectorMask-${sectorName}-${sector.id}`;


			if (setting.label.textType === 'textPath') {
				// use 'textPath' elements as the knockout shape
				//create extra label paths
				// label paths:
				if (setting.label.invert && (Math.cos(sector.radians.middle) < 0)) {
					labelArc = getArcPath(sector.radians.end, sector.radians.start, setting.label.radius);
				}
				else {
					labelArc = getArcPath(sector.radians.start, sector.radians.end, setting.label.radius);
				}
				const labelPath = `<path id="${pathId}" d="${labelArc}"/>`;
				labelPaths += labelPath;
				// textPath:
				textMask = `
					<text>
						<textPath class="knockout-shapeKnockedout ${sector.class}" startOffset="50%" href="#${pathId}">${this.formatLabel(labelFormat, sector)}</textPath>
					</text>
				`;
			} else {
				// use regular 'text' elements as the knockout shape
				const radiansLabel = sector.radians.start + (sector.radians.width * setting.label.sectorPosition);

				const center     = new PolarPoint(radiansLabel, setting.label.radius).toPoint();
				let transform = '';

				if (setting.label.rotate)
				{
					let rotate = this.rotationDegrees(radiansLabel, setting.label);
					transform = `rotate(${sf(rotate)}, ${sf(center.x)}, ${sf(center.y)})`;
				}


				textMask = `<text class="knockout-shapeKnockedout ${sector.class}" x="${sf(center.x)}" y="${sf(center.y)}" transform="${transform}">${this.formatLabel(labelFormat, sector)}</text>`;

			}

			// sector path, mask, sector itself:
			if (setting.sizeAdjust) {
				sectorPath = getSectorResized(sector.radians.start, sector.radians.end, setting.sector, setting.sizeAdjust);
				maskPath = getSectorResized(sector.radians.start, sector.radians.end, setting.sector, setting.maskExpand);
			}
			else {
				sectorPath = getSectorPath(sector.radians.start, sector.radians.end, setting.sector);
				maskPath = sectorPath;
			}

			const sectorMask = `
				<mask id="${maskId}" class="sectorMask-${sectorName} knockout-mask">
					<path class="knockout-shapeContaining" d="${maskPath}"/>
					${textMask}
				</mask>
			`;
			sectorMasks += sectorMask;

			const sectorSVG =
				`<path
					d="${sectorPath}"
					class="sector ${sectorName}-${sector.id} ${sector.class}"
					style="mask: url(#${maskId});"
					>
					<title>${this.formatTitle(sectorName, sector)}</title>
				</path>`;
			sectors += sectorSVG;
		}

		// ${labelPaths}
		const result =
			`<g class="group-sector ${sectorName}">
				<defs>
					${sectorMasks}
					${labelPaths}
				</defs>
				${sectors}


			</g>`;
		return result;

	}/* getSectorsWithKnockout */



	/* getRing
	Combined sectors and labels
	*/
	getRing = function(setting) {

		let sectorSVG = '';
		let labelSVG = '';

		if (setting.sectorType === 'knockout') {
			sectorSVG = this.getSectorsWithKnockout(setting.name, setting.array, setting);
		}
		else
		{
			sectorSVG = this.getSectors(setting.name, setting.array, setting.sector, setting);
			setting.label.forEach((label) => { labelSVG += this.getSectorLabels(setting.name, setting.array, label)});
		}

		// [1,2,3,4].reduce( (p,c)=>{ return `${p} -${c}`  } )
		//ReadonlyArray.reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: readonly T[]) => T): T


		result = `
			<g class="group-ring ring-${setting.name}">
				<title>${setting.name}</title>
				${sectorSVG}
				${labelSVG}
			</g>
		`;

		return result;
	}



}/* ThemeBase */