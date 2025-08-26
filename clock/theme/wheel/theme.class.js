/* Wheel
*/
themeClass['wheel'] = class extends ThemeBase {

	viewBox           = padViewBox(50, '-1600 -1200 3200 2400');
	clockRadius       = 1200;
	// outerRadius       = 1150;
	// innerRadius       = 950;

	monthRing = {
		sector : new Annulus(1150, 950),
		label : {
			radius         : 1050,
			sectorPosition : 0.5,
			rotate         : 'radial-right',
			invert         : false,
			textType       : 'text',
		}
	};

	dayRing = {
		sector : new Annulus(850, 650),
		label : {
			radius         : 750,
			sectorPosition : 0.5,
			rotate         : 'radial-right',
			invert         : false,
			textType       : 'text',
		}
	};



	dateLabel   = { position : new Point( 0, 0) };


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
		const yearTransform = `rotate(${-90-yearDayDivision.middle},0,0)`;

		const monthDayDivision = divisionDegrees(this.displayDate.daysInMonth, this.displayDate.date-1);
		const monthTransform = `rotate(${-90-monthDayDivision.middle},0,0)`;

		// ${this.getSectors('month', this.displayDate.monthArray, this.monthSector.outerRadius, this.monthSector.innerRadius)}

		//log(this.displayDate);

		const moonRadians = this.displayDate.monthDayArray[0].radians.middle;
		const moonPosition = polarPoint(moonRadians, this.dayRing.label.radius);



		const themeSVG = `

			<defs>
				${this.getFilters()}
			</defs>

			<!-- ${this.getFace(this.clockRadius)} -->

			${this.getDateLabel('year', this.dateLabel)}

			<g class="monthRing">
				<g transform="${yearTransform}">
					${this.getSectorsWithKnockout('monthNumber', this.displayDate.monthArray, this.monthRing)}
				</g>
			</g>

			<g class="dayRing">
				<g transform="${monthTransform}">

					${this.getSectorsWithKnockout('dayNumber', this.displayDate.monthDayArray, this.dayRing)}

					<!-- <circle class="month-first" cx="${moonPosition.x}" cy="${moonPosition.y}" r="100"/> -->

					<!-- ${this.getSectorLabels('dayNumber', this.displayDate.monthDayArray, this.dayRing.label)} -->
				</g>
			</g>

		`;

		/*
			${this.getSectorsWithKnockout('dayNumber', this.displayDate.monthDayArray, this.daySector)}

			${this.getSectorLabels('dayNumber', this.displayDate.monthDayArray, this.dayName)}
		*/

		return themeSVG;
	}/* getThemeSVG */



	getDateLabel = function(labelType, setting) {

		const svg =
			`<g class="dateLabel" >

				<defs>
					<mask id="knockout-dateLabel-${labelType}" class="knockout-mask">
						<!--
						<rect class="knockout-shapeContaining" x="-500" y="-500" width="1000" height="1000" />
						-->
						<circle cx="0" cy="0" r="400" class="knockout-shapeContaining"/>

						<text x="${setting.position.x}" y="${setting.position.y}" class="knockout-shapeKnockedout dateLabel ${labelType}"> ${this.formatLabel(labelType, this.displayDate)}</text>
					</mask>
				</defs>

				<g style="mask:url(#knockout-dateLabel-${labelType})">
					<circle cx="0" cy="0" r="300" class="star"/>
					<!--
					<text x="${setting.position.x}" y="${setting.position.y}" class="label dateLabel ${labelType}" ${(setting.attribute || '')}>asdf ${this.formatLabel(labelType, this.displayDate)}</text>
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

		// const textType = 'textPath'; // text,textPath


		for (let sector of sectorArray)
		{
			//log('sector:', sector);

			const pathId = `labelPath-${sectorType}-${sector.id}`;
			const maskId = `sectorMask-${sectorType}-${sector.id}`;


			if (settings.label.textType === 'textPath') {
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
			const sectorPath = getSectorPath(sector.radians.start, sector.radians.end, settings.sector);

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
			`<g class="sectorGroup ${sectorType}">
				<defs>
					${sectorMasks}
					${labelPaths}
				</defs>
				${sectors}


			</g>`;
		return result;

	}/* getSectorsWithKnockout */



	getFilters = function() {
		const result = `
	 <filter
		 id="f143"
		 x="-0.25"
		 width="1.5"
		 y="-0.25"
		 height="1.5"
		 inkscape:menu="Non realistic 3D shaders"
		 inkscape:menu-tooltip="Non realistic frosted glass imitation"
		 inkscape:label="Frosted glass"
		 style="color-interpolation-filters:sRGB">
		<feGaussianBlur
			result="result8"
			stdDeviation="7"
			id="feGaussianBlur20429" />
		<feComposite
			in="result8"
			operator="xor"
			result="result6"
			in2="result8"
			id="feComposite20431" />
		<feDisplacementMap
			result="result4"
			scale="75"
			yChannelSelector="A"
			xChannelSelector="A"
			in2="result6"
			in="result6"
			id="feDisplacementMap20433" />
		<feComposite
			k1="2"
			in="SourceGraphic"
			operator="arithmetic"
			result="result2"
			in2="result4"
			id="feComposite20435"
			k2="0"
			k3="0"
			k4="0" />
		<feComposite
			in2="result2"
			operator="in"
			in="result6"
			result="fbSourceGraphic"
			id="feComposite20437" />
	 </filter>

		`;

		return result;
	}/* getFilters */


}/* Plain SVG */
