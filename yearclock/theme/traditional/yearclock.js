//
// Traditional clock/watch face style
//

theme.clock.clockRadius       = 1170,

theme.clock.innerRadius       = 980;
theme.clock.outerRadius       = 1120;
theme.clock.monthLabelRadius  = 900;
theme.clock.weekdayTickLength = 40;
theme.clock.weekendTickLength = 55;
theme.clock.dateLabel         = 500;

theme.clock.monthLabel = {};
theme.clock.monthLabel.position = 0;
theme.clock.monthLabel.rotate = false;
theme.clock.monthLabel.invert = false;

theme.clock.yearHandLength    = 600;
theme.clock.monthHandLength    = 850;


/* Draw Clock
*/
theme.clock.drawClock = function()
{
	// Set Up Drawing
	theme.clock.element = document.getElementById('clock');

	theme.clock.drawFace();
	theme.clock.drawMonthSectors();
	theme.clock.drawMonthLabels();
	//theme.clock.drawYearDayTicks();
	theme.clock.drawMonthDayTicks();
	theme.clock.drawDateText();
	theme.clock.drawYearHand();
	theme.clock.drawMonthHand();

}/* drawClock */




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