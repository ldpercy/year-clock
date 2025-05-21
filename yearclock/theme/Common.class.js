class Common extends Theme {


	description = "common";


	css = `
		.yearclock {
			font-size: 48px;
		}


		.face {
			fill: silver;
		}


		* {
			stroke: black;
			fill: none;
		}

		.label.month {
			text-anchor: middle;
			dominant-baseline: middle;
		}

		.label.dateLabel {
			text-anchor: middle;
			font-size: 5em;
			dominant-baseline: central;
		}
	`;

}