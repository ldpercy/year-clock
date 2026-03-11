import { HTMLApp } from "../[html-common]/module/HTMLApp.js";
import { ui } from './view-html-ui.js';
import * as dates from "./Dates.js";


const elementMap = {
	style_theme			: 'stylesheet-theme',
	style_style			: 'stylesheet-style',
	clock_container		: 'clockContainer',
};

let element;
let clockInstance = {}; // clock instances will be collected here

class ClockView {


	eventListeners = [	];


	constructor() {
		//HTMLApp.addEventListeners(this.eventListeners, this);
		//console.debug('controller');
		element = HTMLApp.buildElementMap(document, elementMap);
	}




	changeDate(yearclockDate)
	{
		//console.debug('yearclockDate', yearclockDate);
		//console.debug('this instanceof Date', yearclockDate instanceof Date);
		//console.debug('!isNaN(this)', !isNaN(yearclockDate));

		if (!yearclockDate.isValid)
		{
			console.warn('Invalid date', yearclockDate);
			return;
		}
		clockInstance[1234].setDisplayDate(yearclockDate);
		const clockSVG = clockInstance[1234].getClockSVG();
		element.clock_container.innerHTML = clockSVG;
	}



	updateClock() {
		const newDate = new dates.Date(ui.date);

		if (!newDate.isValid)
		{
			console.warn('Invalid date', newDate);
			return;
		}

		const updateClockParams = {
			id          : '1234',
			date        : newDate,
			theme       : ui.theme,
			style       : ui.style,
			language    : ui.language,
			background  : ui.background,
			hemisphere  : ui.hemisphere,
		};

		this.drawClock(updateClockParams);
	}





	/* drawClock
	*/
	async drawClock(clockParameter) {

		//log('drawClock', arguments);

		let cssUrl_theme = `yearclock/theme/${clockParameter.theme}/theme.css`;
		element.style_theme.setAttribute('href', cssUrl_theme);

		if (clockParameter.style) {
			let cssUrl_style = `yearclock/theme/${clockParameter.theme}/style-${clockParameter.style}.css`;
			element.style_style.setAttribute('href', cssUrl_style);
		}


		const themeModuleUrl = `./theme/${clockParameter.theme}/theme.js`;


		// need something like railroad-handling here, but can't remember how to implement the pattern

		//try {
			// this will overwrite the theme binding each time, might need to improve?
			const themeModule = await import(themeModuleUrl);

			//console.log('themeModule',themeModule);

			clockInstance[clockParameter.id] = new themeModule.Theme(clockParameter);

			const clockSVG = clockInstance[clockParameter.id].getClockSVG();

			element.clock_container.innerHTML = clockSVG;

			if (this.page.initial.test) { this.runTest(this.page.initial.test, clockSVG); }
		// }
		// catch (error) {
		// 	console.error(`Error for '${clockParameter.theme}' theme:`, error);
		// 	this.page.element.container.innerHTML = `<h2 class="themeError">${error}</h2>`;
		// }

	}/* drawClock */






}/* ClockView */


export const clockView = new ClockView();