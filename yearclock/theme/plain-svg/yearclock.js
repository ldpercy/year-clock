//
// Plain SVG
//

theme.clock.clockRadius  = 1170,
theme.clock.needleLength = 950;


theme.clock.element = document.getElementById('clock');


theme.clock.drawFace = function() {
	const svg = `<circle cx="0" cy="0" r="${theme.clock.clockRadius}" class="face"></circle>`
	theme.clock.element.innerHTML += svg;
}


theme.clock.drawYear = function() {
	// Year Label
	const yearOnLeft = dateRatio(config.date) < 0.5
	const labelSide = yearOnLeft ? -1 : 1
	const x = theme.clock.innerRadius * 0.55 * labelSide;
	const y = 0;

	const svg = `<text x="${x}" y="${y}" class="label year">${config.year}</text>`;

	theme.clock.element.innerHTML += svg;
}


theme.clock.drawNeedle = function() {
	const path = `
		M 12 160
		L -12 160
		L 0, -${theme.clock.needleLength}
		Z
		M 30 0
		A 30,30 0 1 1 -30,00
		A 30,30 0 1 1 30,00`;
	const transform = svgRotateString(dateDegrees(config.date),0,0);
	const svg = `
		<g class="needle">
			<path d="${path}" transform="${transform}"></path>
		</g>`;
	theme.clock.element.innerHTML += svg;
}
