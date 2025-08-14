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
			radius         : 1050,
			sectorPosition : 0.5,
			rotate         : true,
			invert         : false,
		}
	};

	daySector = {
		radiusStart       : 850,
		radiusEnd         : 650,
		label : {
			radius         : 700,
			sectorPosition : 0.5,
			rotate         : true,
			invert         : false,
		}
	};

	/*
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

			<!-- ${this.getFace(this.clockRadius)} -->

			<g transform="${yearTransform}">
				${this.getSectorsWithKnockout('month', displayDate.monthArray, this.monthSector)}

				${this.getDateLabel('year', displayDate, this.dateLabel)}
			</g>

			<g transform="${monthTransform}">

				${this.getSectorLabels('dayNumber', displayDate.monthDayArray, this.daySector.label)}
			</g>

		`;

		/*
			${this.getSectorsWithKnockout('dayNumber', displayDate.monthDayArray, this.daySector)}
			${this.getPeriodDaySectors('day', displayDate.monthDayArray, this.daySector.innerRadius, this.daySector.outerRadius)}
			${this.getSectorLabels('dayNumber', displayDate.monthDayArray, this.dayName)}
		*/

		return themeSVG;
	}/* getThemeSVG */



	getDateLabel = function(labelType, displayDate, setting) {

		const svg =
			`<g class="dateLabel">

				<defs>
					<mask id="knockout-dateLabel-${labelType}" class="knockout-mask">
						<rect class="knockout-shapeContaining" x="-500" y="-500" width="1000" height="1000" />
						<text x="${setting.position.x}" y="${setting.position.y}" class="knockout-shapeKnockedout dateLabel ${labelType}"> ${this.formatLabel(labelType, displayDate)}</text>
					</mask>
				</defs>

				<g style="mask:url(#knockout-dateLabel-${labelType})">
					<circle cx="0" cy="0" r="600" fill="silver"/>
					<!--
					<text x="${setting.position.x}" y="${setting.position.y}" class="label dateLabel ${labelType}" ${(setting.attribute || '')}>asdf ${this.formatLabel(labelType, displayDate)}</text>
					-->
				</g>
			</g>`;

			/*
			 class="label dateLabel ${labelType}" ${(setting.attribute || '')}"
			*/

		return svg;

	}/* getDateLabel */




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

		const textType = 'text'; // text,textPath


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
				textMask = `<textPath class="knockout-shapeKnockedout ${sector.class}" startOffset="50%" href="#${pathId}">${this.formatLabel(sectorType, sector)}</textPath>`;
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

				</defs>
				${sectors}

				${labelPaths}
			</g>`;
		return result;

	}/* getSectorsWithKnockout */



}/* Plain SVG */
