
import * as yearclockDate from "../Date.js";
import * as svg from "../SVG.js";
import * as geometry from "../Geometry.js";
import * as l10n from "../L10n.js";


export class YearClock {

	angularRange = new geometry.AngularRange();



	constructor(parameter) {
		this.parameter = parameter;
		// this.setDisplayDate(this.parameter.date);
	}

	/*
	this.parameter = {
		id,				// identifier for instance
		date,			// date to display
		theme,			// clock theme
		style,			// css style variant for the clock
		language,		// two-letter language code
		background,		// the background to show
		hemisphere,		// [northern,southern] which hemisphere the clock is in, used for seasons
	}
	*/


	/* setDisplayDate
	Each clock class needs to override this method and call it during construction
	*/
	setDisplayDate(date) {
		this.displayDate = new DisplayDate(date, this.parameter.language);
	}






}/* YearClock */




