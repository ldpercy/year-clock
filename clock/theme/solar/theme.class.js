/* Solar
*/
themeClass['solar'] = class extends ThemeBase {

	viewBox           = padViewBox(50, '-2500 -1200 5000 2800');

	monthRing = {
		name    : 'yearMonth',
		array   : undefined, // this.displayDate.monthArray,
		sector  : new Annulus(1150,950),
		label   : {
			radius         : 1050,
			sectorPosition : 0.5,
			rotate         : true,
			invert         : 'all',
		}
	};

	dayRing = {
		name    : 'monthDay',
		array   : undefined, // this.displayDate.monthDayArray,
		sector : new Annulus(850, 650),
		label : {
			radius         : 500,
			sectorPosition : 0.5,
			rotate         : true,
			invert         : 'all',
		}
	};

	dateLabel   = { position : new Point( 0, 0) };

	/*
	outerRadius       = 1150;
	innerRadius       = 950;
	weekdayMarkerLength = 42;
	weekendMarkerLength = 57;

	tick = {
		weekdayStart    : this.innerRadius,
		weekdayEnd      : this.innerRadius + this.weekdayMarkerLength,
		weekendStart    : this.innerRadius,
		weekendEnd      : this.innerRadius + this.weekendMarkerLength,
		monthFirstStart : this.innerRadius,
		monthFirstEnd   : this.outerRadius,
	};
	*/

	constructor(clockParameter)
	{
		super(clockParameter);
		this.monthRing.array = this.displayDate.monthArray;
		this.dayRing.array   = this.displayDate.monthDayArray;
	}

	/* getThemeSVG
	*/
	getThemeSVG = function()
	{
		addDateRangeRadians(this.displayDate.monthArray, this.displayDate.yearRange);
		this.displayDate.yearDayArray = getPeriodDayArray(this.displayDate.yearStart, this.displayDate.yearEnd, this.displayDate.object);
		addRadians(this.displayDate.yearDayArray);

		this.displayDate.monthDayArray = getPeriodDayArray(startOfMonth(this.displayDate.object), nextMonth(this.displayDate.object), this.displayDate.object, this.displayDate.language);
		addRadians(this.displayDate.monthDayArray);

		const yearDayDivision = divisionDegrees(this.displayDate.daysInYear, this.displayDate.dayOfYear-1);
		const yearTransform = `rotate(${180-yearDayDivision.middle},0,0)`;

		const monthDayDivision = divisionDegrees(this.displayDate.daysInMonth, this.displayDate.date-1);
		const monthTransform = `rotate(${180-monthDayDivision.middle},0,0)`;

		// ${this.getSectors('month', this.displayDate.monthArray, this.monthRing.outerRadius, this.monthRing.innerRadius)}

		//log(this.displayDate);

		const moonRadians = this.displayDate.monthDayArray[0].radians.middle;
		const moonPosition = polarPoint(moonRadians, this.dayRing.label.radius);

		/* ${this.getSectorsWithKnockout('month', this.displayDate.monthArray, this.monthRing)} */

		const themeSVG = `

			<g transform=" scale(2,1) translate(0,1000) ${monthTransform}">

				<circle class="month-first" cx="${moonPosition.x}" cy="${moonPosition.y}" r="100"/>

				${this.getSectors('monthDay', this.displayDate.monthDayArray, this.dayRing.sector)}

				${this.getSectorLabels('dayNumber', this.displayDate.monthDayArray, this.dayRing.label)}
			</g>
			<g transform="scale(2,1) ${yearTransform} ">

				${this.getSun('year', this.dateLabel)}

				${this.getSectors('yearMonth', this.displayDate.monthArray, this.monthRing.sector)}
				${this.getSectorLabelsCurved('yearMonth', this.displayDate.monthArray, this.monthRing.label)}

			</g>

		`;

		/*
			${this.getSectorLabels('dayNumber', this.displayDate.monthDayArray, this.dayName)}
		*/

		return themeSVG;
	}/* getThemeSVG */



	getSun = function(labelType, setting) {

		const svg =
			`<g class="sun">

				<defs>
					<mask id="knockout-dateLabel-${labelType}" class="knockout-mask">
						<!--
						<rect class="knockout-shapeContaining" x="-500" y="-500" width="1000" height="1000" />
						-->
						<circle cx="0" cy="0" r="400" class="knockout-shapeContaining"/>

						<text x="${setting.position.x}" y="${setting.position.y}" class="knockout-shapeKnockedout dateLabel ${labelType}"> ${this.formatLabel(labelType, this.displayDate)}</text>
					</mask>
				</defs>

				<path class="diffractionSpike" d="
					M 50,-50 L 950,0
					L 50,50 L 0,950
					L -50,50 L -950,0
					L -50,-50 L 0,-950
				"/>

				<g > <!-- style="mask:url(#knockout-dateLabel-${labelType})" -->
					<circle class="sun"/>
					<text x="${setting.position.x}" y="${setting.position.y}" class="dateLabel ${labelType}">${this.formatLabel(labelType, this.displayDate)}</text>
				</g>
			</g>`;

			/*
			 class="label dateLabel ${labelType}" ${(setting.attribute || '')}"
			*/

		return svg;

	}/* getSun */




	/* getSectorsWithKnockout
		labelSetting = {
			radius         : number,
			invert         : boolean,
		};
	*/
	getSectorsWithKnockout = function(sectorType, sectorArray, settings)
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

		const textType = 'textPath'; // text,textPath


		for (let sector of sectorArray)
		{
			//log('sector:', sector);

			const pathId = `labelPath-${sectorType}-${sector.id}`;
			const maskId = `sectorMask-${sectorType}-${sector.id}`;


			if (textType === 'textPath') {
				// use 'textPath' elements as the knockout shape
				//create extra label paths
				// label paths:
				if (settings.label.invert && (Math.cos(sector.radians.middle) < 0)) {
					labelArc = getArcPath(sector.radians.end, sector.radians.start, settings.label.radius);
				}
				else {
					labelArc = getArcPath(sector.radians.start, sector.radians.end, settings.label.radius);
				}
				const labelPath = `<path id="${pathId}" d="${labelArc}"/>`;
				labelPaths += labelPath;
				// textPath:
				textMask = `
					<text>
						<textPath class="knockout-shapeKnockedout ${sector.class}" startOffset="50%" href="#${pathId}">${this.formatLabel(sectorType, sector)}</textPath>
					</text>
				`;
			} else {
				// use regular 'text' elements as the knockout shape
				const radiansLabel = sector.radians.start + (sector.radians.width * settings.label.sectorPosition);

				const center     = polarPoint(radiansLabel, settings.label.radius);
				let transform = '';

				if (settings.label.rotate)
				{
					let rotate = this.rotationDegrees(radiansLabel, settings.label);
					transform = `rotate(${sf(rotate)}, ${sf(center.x)}, ${sf(center.y)})`;
				}


				textMask = `<text class="knockout-shapeKnockedout ${sector.class}" x="${sf(center.x)}" y="${sf(center.y)}" transform="${transform}">${this.formatLabel(sectorType, sector)}</text>`;

			}

			// sector path, mask, sector itself:
			const sectorPath = getSectorPath(sector.radians.start, sector.radians.end, settings.radiusStart, settings.radiusEnd);

			const sectorMask = `
				<mask id="${maskId}" class="sectorMask-${sectorType} knockout-mask">
					<path class="knockout-shapeContaining" d="${sectorPath}"/>

					${textMask}
				</mask>
			`;
			sectorMasks += sectorMask;

			const sectorSVG =
				`<path
					d="${sectorPath}"
					class="sector ${sectorType}-${sector.id} ${sector.class}"
					style="mask: url(#${maskId});"
					>
					<title>${this.formatTitle(sectorType, sector)}</title>
				</path>`;
			sectors += sectorSVG;
		}

		// ${labelPaths}
		const result =
			`<g class="sector ${sectorType}">
				<defs>
					${sectorMasks}
					${labelPaths}
				</defs>
				${sectors}


			</g>`;
		return result;

	}/* getSectorsWithKnockout */



}/* Plain SVG */
