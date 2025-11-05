/* ThemeBase
*/
yearclock.theme.Base = class extends yearclock.theme.YearClock {


	viewBox = '-1200 -1200 2400 2400';

	sf = yearclock.Maths.significantFigures(4);


	//
	// formatting functions
	//

	formatTitle = function(type, data) {
		let result;
		switch(type) {
			case 'hands'    : result = `${data.date.toIsoDate()} - ${data.date.dayName} - d${data.date.dayOfYear}`; break;
			default         : result = data.name || data.id; break;
		}
		return result;
	}

	formatLabel = function(labelType, data) {
		let result;
		switch(labelType) {
			case 'year'         : result = `${data.year}`; break;
			case 'date'         : result = `${data.toIsoDate()}` ; break;
			case 'dayNumber'    : result = `${data.date.dayOfMonth}`; break;
			case 'dayShort'     : result = `${data.name.slice(0,3)}`; break;

			case 'monthNumber'  : result = `${data.number}`; break;
			case 'monthShort'     : result = `${data.name.slice(0,3)}`; break;

			case 'romanNumeralDay'   : result = `${yearclock.Maths.asRomanNumerals(data.date.dayOfMonth)}`; break;
			case 'romanNumeralMonth' : result = `${yearclock.Maths.asRomanNumerals(data.number)}`; break;
			case 'romanNumeralYear'  : result = `${yearclock.Maths.asRomanNumerals(data.year)}`; break;

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
		const vb =  this.svg.splitViewBox(viewBox);
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

		//console.debug('getPeriodDayTicks', periodArray);

		for (let day of periodArray)
		{
			if (day.date.isWeekend)
			{
				tickLine = this.svg.radialLine(day.radians.start, tick.weekendStart, tick.weekendEnd);
				tickClass = 'weekend';
			}
			else // day.isWeekday
			{
				tickLine = this.svg.radialLine(day.radians.start, tick.weekdayStart, tick.weekdayEnd);
				tickClass = 'weekday';
			}

			tickSvg +=
				`<line class="${tickClass}" data-date="${day.date.toIsoDate()}" x1="${tickLine.xStart}" y1="${tickLine.yStart}" x2="${tickLine.xEnd}" y2="${tickLine.yEnd}" ></line>`;

			if (day.date.isFirst) // Draw an extra line for firsts of the month
			{
				tickLine = this.svg.radialLine(day.radians.start, tick.monthFirstStart, tick.monthFirstEnd);
				tickClass = 'first';
				tickSvg +=
					`<line class="${tickClass}" data-date="${day.date.toIsoDate()}" x1="${tickLine.xStart}" y1="${tickLine.yStart}" x2="${tickLine.xEnd}" y2="${tickLine.yEnd}" ></line>`;
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
	getYearHand(handConfig, angularRange = this.angularRange) {
		//console.debug('getYearHand', arguments);
		//console.debug(this.displayDate.daysInYear, this.displayDate.dayOfYear-1, degreeDelta);
		// calculate year hand params


		//const yearDayDivision = yearclock.Geometry.divisionDegrees(this.displayDate.dateRange.length, this.displayDate.dayOfYear-1, angularRange);


		//console.debug('this.displayDate.dateRange', this.displayDate.dateRange);
		//console.debug('this.displayDate.dateRange.length', this.displayDate.dateRange.length);

		const yearDayDivision = angularRange.division(this.displayDate.dayOfYear-1, this.displayDate.dateRange.length);
		//console.debug('yearDayDivision', yearDayDivision);

		//console.debug('yearDayDivision.middle', yearDayDivision.middle);



		const yearTransform = `rotate(${yearDayDivision.middle.degrees},0,0)`;


		// get year hand
		const yearHandFunc = (handConfig.function) ? handConfig.function() : this.getBasicHand;
		//log('yearHandFunc:',yearHandFunc);
		const result = yearHandFunc(handConfig, yearTransform, 'yearHand', '');
		return result;
	}/* getYearHand */


	/* getMonthHand */
	getMonthHand = function(handConfig, angularRange = this.angularRange) {
		// calculate month hand params


		//const monthDayDivision = yearclock.Geometry.divisionDegrees(this.displayDate.monthDayArray.length, this.displayDate.getDate()-1, degreeDelta);

		const monthDayDivision = angularRange.division(this.displayDate.getDate()-1, this.displayDate.monthRange.length);
		//console.debug('monthDayDivision', monthDayDivision);


		const monthTransform = `rotate(${monthDayDivision.middle.degrees},0,0)`;
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
				sectorPath = this.svg.getSectorResized(sector.angularRange.start, sector.angularRange.end, annulus, option.sizeAdjust);
			}
			else {
				sectorPath = this.svg.getSectorPath(sector.angularRange.start, sector.angularRange.end, annulus);
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
	getSectorLabels = function(sectorName, sectorArray, setting) // :String
	{
		//console.debug(arguments);
		const sectorLabels = new yearclock.SVG.Chunk();
		const labelFormat = setting.format || sectorName;

		for (let sector of sectorArray)
		{
			sectorLabels.add(this.getSectorLabel(sector, setting, labelFormat));
		}

		const result = `
			<g class="group-label ${sectorName} ${setting.name||''}">
				${sectorLabels.toString()}
			</g>`;
		return result;
	}/* getSectorLabels */


	/* getSectorLabel
	*/
	getSectorLabel = function(sector, setting, labelFormat, classString='') // :SVGChunk
	{
		const result = new yearclock.SVG.Chunk();
		const radiansLabel = sector.angularRange.position(setting.sectorPosition).radians;

		const center     = new PolarPoint(radiansLabel, setting.radius).toPoint();
		let rotation;
		let transform = '';

		if (setting.rotate)
		{
			rotation = this.rotationDegrees(radiansLabel, setting);
			transform = `rotate(${this.sf(rotation)}, ${this.sf(center.x)}, ${this.sf(center.y)})`;
		}

		result.text =
			`<text class="${classString} ${setting.name||''} ${sector.class}" x="${this.sf(center.x)}" y="${this.sf(center.y)}" transform="${transform}">${this.formatLabel(labelFormat, sector)}</text>`;
		return result;
	}/* getSectorLabel */



	/* getSectorLabelsCurved
		setting = {
			radius         : number,
			invert         : boolean,
		};
	*/
	getSectorLabelsCurved = function(sectorName, sectorArray, setting) //:String
	{
		const sectorLabels = new yearclock.SVG.Chunk();
		const labelFormat = setting.format || sectorName;

		for (let sector of sectorArray)
		{
			sectorLabels.add(this.getSectorLabelCurved(sector, setting, labelFormat));
		}

		const result = `
			<g class="group-label label-${sectorName}">
				<defs>
					${sectorLabels.defs}
				</defs>
				${sectorLabels.text}
			</g>`;
		return result;
	}/* getSectorLabelsCurved */



	/* getSectorLabelCurved
		setting = {
			radius         : number,
			invert         : boolean,
		};
	*/
	getSectorLabelCurved = function(sector, setting, labelFormat, classString='') // :SVGChunk
	{
		const result = new yearclock.SVG.Chunk();
		let labelArc = '';

		const pathId = `labelPath-${setting.name}-${sector.id}`;

		if (setting.invert === 'all') {
			labelArc = this.svg.getArcPath(sector.radians.end, sector.angularRange.start, setting.radius);
		}
		else if (setting.invert && (Math.cos(sector.radians.middle) < 0)) {
			labelArc = this.svg.getArcPath(sector.radians.end, sector.angularRange.start, setting.radius);
		}
		else {
			labelArc = this.svg.getArcPath(sector.angularRange.start, sector.radians.end, setting.radius);
		}

		result.defs =
			`<path id="${pathId}" d="${labelArc}"/>`;
		result.text = `
			<text>
				<textPath class="${classString} ${sector.class}" startOffset="50%" href="#${pathId}">${this.formatLabel(labelFormat, sector)}</textPath>
			</text>
		`;

		return result;
	}/* getSectorLabelCurved */



	/* rotationDegrees
	*/
	rotationDegrees = function(radians, setting) {
		let result = 0;

		switch(setting.rotate) {
			case 'none'         : result = 0; break;
			case 'radial-left'  : result = yearclock.Geometry.degrees(radians) - 90; break;
			case 'radial-right' : result = yearclock.Geometry.degrees(radians) + 90; break;
			case 'radial-in'    : result = yearclock.Geometry.degrees(radians) + 180; break;
			case 'radial'       : result = yearclock.Geometry.degrees(radians); break;
			case true           : result = yearclock.Geometry.degrees(radians); break;
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

		const vb = this.svg.splitViewBox(viewBox);

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
			const radians = element.angularRange.position(setting.position).radians;
			//console.debug(radians);

			const center     = new PolarPoint(radians, setting.radius).toPoint();
			let transform = '';

			if (setting.rotate)
			{
				let rotate = this.rotationDegrees(radians, setting);
				transform = `rotate(${this.sf(rotate)}, ${this.sf(center.x)}, ${this.sf(center.y)})`;
			}
			const symbolSvg =
				`<use href="#${setting.elementId}" class="${element.class}"
					x="${this.sf(center.x)}" y="${this.sf(center.y)}"
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

		let defs = '';
		let sectors = '';
		let textMask = '';
		let sectorPath = '';
		let maskPath = '';
		let textKnockout; // = new yearclock.SVG.Chunk();

		for (let sector of sectorArray)
		{
			textKnockout = new yearclock.SVG.Chunk();
			textMask = '';
			const pathId = `labelPath-${sectorName}-${sector.id}`;
			const maskId = `sectorMask-${sectorName}-${sector.id}`;

			setting.label.forEach(
				(label) => {
					if (label.textType === 'textPath') {
						textKnockout.add(this.getSectorLabelCurved(sector, label, label.format, '---test---'));
					}
					else { // use regular 'text' elements as the knockout shape
						textKnockout.add(this.getSectorLabel(sector, label, label.format, 'knockout-shapeKnockedout'));
					}
				}
			);

			// sector path, mask, sector itself:
			if (setting.sizeAdjust) {
				sectorPath = this.svg.getSectorResized(sector.angularRange.start, sector.radians.end, setting.sector, setting.sizeAdjust);
				maskPath = this.svg.getSectorResized(sector.angularRange.start, sector.radians.end, setting.sector, setting.maskExpand);
			}
			else {
				sectorPath = this.svg.getSectorPath(sector.angularRange.start, sector.radians.end, setting.sector);
				maskPath = sectorPath;
			}


			const sectorMask = `
				<mask id="${maskId}" class="sectorMask-${sectorName} knockout-mask">
					<path class="knockout-shapeContaining" d="${maskPath}"/>
					${textKnockout.text}
				</mask>
			`;
			defs += textKnockout.defs;
			defs += sectorMask;

			const sectorSVG =
				`<path
					d="${sectorPath}"
					class="sector ${sectorName}-${sector.id} ${sector.class}"
					style="mask: url(#${maskId});"
					>
					<title>${this.formatTitle(sectorName, sector)}</title>
				</path>`;
			sectors += sectorSVG;

		} // for (let sector of sectorArray)

		// ${labelPaths}
		const result =
			`<g class="group-sector ${sectorName}">
				<defs>
					${defs}
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
			setting.label.forEach((label) => {
				if (label.textType === 'textPath') {
					labelSVG += this.getSectorLabelsCurved(setting.name, setting.array, label);
				}
				else {
					labelSVG += this.getSectorLabels(setting.name, setting.array, label);
				}
			});
		}

		const result = `
			<g class="group-ring ring-${setting.name}">
				<!-- <title>${setting.name}</title> -->
				<!-- sectors: -->
				${sectorSVG}
				<!-- labels: -->
				${labelSVG}
			</g>
		`;

		return result;
	}/* getRing */



}/* ThemeBase */