/* Wheel
*/
themeClass['wheel'] = class extends ThemeBase {

	viewBox           = padViewBox(30);
	clockRadius       = 1200;
	// outerRadius       = 1150;
	// innerRadius       = 950;

	monthSector = {
		radiusStart       : 1150,
		radiusEnd         : 950,

		label : {
			radius         : 1075,
			sectorPosition : 0.5,
			rotate         : true,
			invert         : false,
		}
	};

	daySector = {
		outerRadius       : 850,
		innerRadius       : 650,
	};





	dayName = {
		radius         : 700,
		sectorPosition : 0.5,
		rotate         : true,
		invert         : false,
	};


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

	dateLabel   = { position : new Point( 0, 0) };


	/* getThemeSVG
	*/
	getThemeSVG = function(displayDate)
	{
		addDateRangeRadians(displayDate.monthArray, displayDate.yearRange);
		displayDate.yearDayArray = getPeriodDayArray(displayDate.yearStart, displayDate.yearEnd, displayDate.object);
		addRadians(displayDate.yearDayArray);

		displayDate.monthDayArray = getPeriodDayArray(startOfMonth(displayDate.object), nextMonth(displayDate.object), displayDate.object, displayDate.language);
		addRadians(displayDate.monthDayArray);

		const yearDayDivision = divisionDegrees(displayDate.daysInYear, displayDate.dayOfYear-1);
		const yearTransform = `rotate(${-yearDayDivision.middle},0,0)`;

		const monthDayDivision = divisionDegrees(displayDate.daysInMonth, displayDate.date-1);
		const monthTransform = `rotate(${-monthDayDivision.middle},0,0)`;

		// ${this.getSectors('month', displayDate.monthArray, this.monthSector.outerRadius, this.monthSector.innerRadius)}

		const themeSVG = `

			<defs>

			</defs>

			${this.getFace(this.clockRadius)}

			<!-- <g transform="${yearTransform}"> -->
				${this.getSectorsWithKnockout('month', displayDate.monthArray, this.monthSector)}
			<!-- </g> -->

			<!--
			<g transform="${monthTransform}">
				${this.getPeriodDaySectors('day', displayDate.monthDayArray, this.daySector.innerRadius, this.daySector.outerRadius)}
				${this.getSectorLabels('dayNumber', displayDate.monthDayArray, this.dayName)}
			</g>
			-->

			${this.getDateLabel('year', displayDate, this.dateLabel)}
		`;

		return themeSVG;
	}/* getThemeSVG */



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


		for (let sector of sectorArray)
		{
			//log('sector:', sector);

			const pathId = `labelPath-${sectorType}-${sector.id}`;
			const maskId = `sectorMask-${sectorType}-${sector.id}`;

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
			const textPath = `<textPath class="${sector.class}" startOffset="50%" href="#${pathId}">${this.formatLabel(sectorType, sector)}</textPath>`;

			//const text = `<text class="${sector.class}">${this.formatLabel(sectorType, sector)}</text>`;


			// sector path, mask, sector itself:
			const sectorPath = getSectorPath(sector.radians.start, sector.radians.end, settings.radiusStart, settings.radiusEnd);

			const sectorMask = `
				<mask id="${maskId}" class="sectorMask-${sectorType}">
					<path d="${sectorPath}"/>
					${textPath}
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

		const result =
			`<g class="sector ${sectorType}">
				<defs>
					${labelPaths}
					${sectorMasks}
				</defs>
				${sectors}
			</g>`;
		return result;

	}/* getSectorsWithKnockout */



}/* Plain SVG */
