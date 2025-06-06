/* Plain SVG
*/
themeClass['plain-svg'] = class extends ThemeBase {

	viewBox           = padViewBox(30);
	clockRadius       = 1200;
	outerRadius       = 1150;
	innerRadius       = 945;

	monthLabel = {
		radius         : 1010,
		sectorPosition : 0.5,
		rotate         : true,
		invert         : true,
	}

	weekdayMarkerLength = 42;
	weekendMarkerLength = 57;
	yearHandLength    = 980;
	dateLabelPosition         = 530;

}/* Plain SVG */