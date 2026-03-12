import { HTMLApp } from "../[html-common]/module/HTMLApp.js";
import * as dates from "./Dates.js";
import { clockView } from './view-clock.js';
import { yearclockApp } from "./yearclockApp.js";







let element;

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
	style_background	: 'stylesheet-background',

};



class HTMLUserInterface {


	eventListeners = [

	];

	constructor() {
		element = HTMLApp.buildElementMap(document, elementMap);
		//console.log(element);
		HTMLApp.addEventListeners(this.eventListeners, this);
	}


	initialise() {
		this.date = yearclockApp.parameter.initial.date;
	}




	updateStyle(style) {
		//page.element.themeInput.value
		const cssUrl_style = (style) ? `yearclock/theme/${this.theme}/style-${style}.css` : '';
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
	/** @returns {Date} */
	get date() {
		return element.datePicker.valueAsDate;
	}

	/** @param {Date} date */
	set date(date) {
		element.datePicker.value = new dates.Date(date).toIsoDate();
	}

	/** @returns {string} */
	get theme() {
		return element.themeInput.value;
	}

	/** @returns {string} */
	get style() {
		return element.styleInput.value;
	}

	/** @returns {string} */
	get language() {
		return element.languageInput.value;
	}

	/** @returns {string} */
	get background() {
		return element.backgroundInput.value;
	}

	/** @returns {string} */
	get hemisphere() {
		return element.hemisphereInput.value;
	}


}/* HTMLUserInterface */


export const ui = new HTMLUserInterface();