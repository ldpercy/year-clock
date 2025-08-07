class Clock {

	constructor(
			id,				// identifier for instance
			date,			// date to display
			theme,			// clock theme
			style,			// css style variant for the clock
			language,		// two-letter language code
			background,		// the background to show
			hemisphere,		// [northern,southern] which hemisphere the clock is in, used for seasons
		) {
		this.id = id;
		this.date = date;
		this.theme = theme; // redundant, here for completeness
		this.style = style;
		this.language = language;
		this.background = background;
		this.hemisphere = hemisphere;
	}

}/* Clock */