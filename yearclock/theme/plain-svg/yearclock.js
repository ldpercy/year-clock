//
// Plain SVG
//

theme.clock.clockRadius  = 1180,
theme.clock.needleLength = 950;


theme.clock.element = document.getElementById('clock');



theme.clock.drawYear = function() {
	// Year Label
	const yearOnLeft = dateRatio(config.date) < 0.5
	const labelSide = yearOnLeft ? -1 : 1
	const x = theme.clock.innerRadius * 0.55 * labelSide;
	const y = 0;

	const element = `<text x="${x}" y="${y}" class="label year">${config.year}</text>`;

	theme.clock.element.innerHTML += element;
}
