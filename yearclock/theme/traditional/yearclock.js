//
// Traditional clock/watch face style
//

theme.clock.clockRadius       = 1170,
theme.clock.needleLength      = 950;
theme.clock.innerRadius       = 920;
theme.clock.outerRadius       = 1120;
theme.clock.monthLabelRadius  = 980;
theme.clock.weekdayTickLength = 40;
theme.clock.weekendTickLength = 55;
theme.clock.dateLabel         = 500;

theme.clock.monthLabel = {};
theme.clock.monthLabel.position = 0;
theme.clock.monthLabel.rotate = false;
theme.clock.monthLabel.invert = false;






/* drawMonthLabels
*/
theme.clock.drawMonthLabels = function() {
	newSvg = '';
	for (let month of config.months)
	{
		const center     = polarPoint(month.startAngle, theme.clock.monthLabelRadius);
		const labelSvg =
			`<text x="${center.x}" y="${center.y}">${month.name.slice(0,3)}</text>`;
		newSvg += labelSvg;
	}
	theme.clock.element.innerHTML += `<g class="month label monthLabels">${newSvg}</g>`;
}/* drawMonthLabels */