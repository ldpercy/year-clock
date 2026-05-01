import { HTMLApp } from "../[html-common]/module/HTMLApp.js";
import * as dates from "./Dates.js";
import { clockView } from './view-clock.js';
import { yearclockApp } from "./yearclockApp.js";







let element;
let form;


const elementMap = {
	appInfoDialog		: 'dialog-appInfo',


	// The clock form
	clockForm			: 'form-clock',
	themeInput			: 'input-theme',
	datePicker			: 'input-date',
	languageInput		: 'input-language',
	styleInput			: 'input-style',
	backgroundInput		: 'input-background',
	hemisphereInput		: 'input-hemisphere',
	style_style			: 'stylesheet-style',
	style_background	: 'stylesheet-background',

};



class HTMLUserInterface {


	eventListeners = [

	];

	constructor() {
		element = HTMLApp.buildElementMap(document, elementMap);
		//console.log(element);
		HTMLApp.addEventListeners(this.eventListeners, this);
		form = document.forms['clockSettings'];
	}


	initialise() {
		this.date = yearclockApp.parameter.initial.date;
		this.theme = yearclockApp.parameter.initial.theme;
		this.language = yearclockApp.parameter.initial.language;
		this.style = yearclockApp.parameter.initial.style;
		this.background = yearclockApp.parameter.initial.background;
		this.hemisphere = yearclockApp.parameter.initial.hemisphere;
		this.updateBackground(yearclockApp.parameter.initial.background);
	}




	updateStyle(style) {
		//page.element.themeInput.value
		const cssUrl_style = (style) ? `theme/${this.theme}/style-${style}.css` : '';
		element.style_style.setAttribute('href', cssUrl_style);
	}



	updateBackground(background) {
		const cssUrl_background = (background) ? `page/background/${background}.css` : '';
		element.style_background.setAttribute('href', cssUrl_background);
	}

	toggleAppInfoDialog() {
		/** @type {HTMLDialogElement} */
		//const d = document.querySelector("#dialog-appInfo");
		element.appInfoDialog.showModal();
	}


	//
	//	Accessors
	//

	/** @returns {string} */
	get theme() {
		return element.themeInput.value;
	}

	/** @param {string} theme */
	set theme(theme) {
		element.themeInput.value = theme;
	}

	/** @returns {Date} */
	get date() {
		return element.datePicker.valueAsDate;
	}

	/** @param {Date} date */
	set date(date) {
		element.datePicker.value = new dates.Date(date).toIsoDate();
	}



	/** @returns {string} */
	get colourScheme() {
		return form.colourScheme.value;
	}

	/** @param {string} colourScheme */
	set colourScheme(colourScheme) {
		form.colourScheme.value = colourScheme;
	}


	/** @returns {string} */
	get style() {
		return element.styleInput.value;
	}

	/** @param {string} style */
	set style(style) {
		element.styleInput.value = style;
	}

	/** @returns {string} */
	get language() {
		return element.languageInput.value;
	}

	/** @param {string} language */
	set language(language) {
		element.languageInput.value = language;
	}

	/** @returns {string} */
	get background() {
		return element.backgroundInput.value;
	}

	/** @param {string} background */
	set background(background) {
		element.backgroundInput.value = background;
	}

	/** @returns {string} */
	get hemisphere() {
		return element.hemisphereInput.value;
	}

	/** @param {string} hemisphere */
	set hemisphere(hemisphere) {
		element.hemisphereInput.value = hemisphere;
	}

}/* HTMLUserInterface */


export const ui = new HTMLUserInterface();