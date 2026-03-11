import { HTMLApp } from "../[html-common]/module/HTMLApp.js";
import * as dates from "./Dates.js";
import { clockView } from './view-clock.js';

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



// object to store general page information
export const parameter = {
	// arguments - default, received and computed
	default :
	{
		date        : new dates.Date(),
		theme       : 'wheel',
		style       : '',
		language    : 'en',
		background  : '',
		hemisphere  : 'southern',
		test        : false,
	},

	url : 	// requested values to use
	{
		date        : undefined,
		theme       : undefined,
		style       : undefined,
		language    : undefined,
		background  : undefined,
		hemisphere  : undefined,
		test        : undefined,
	},

	initial :		// initial computed values to use
	{
		date        : undefined,	// initial date to use
		theme       : undefined,	// initial clock theme to use
		style       : undefined,	// initial clock style to use
		language    : undefined,	// initial language to use
		background  : undefined,
		hemisphere  : undefined,
		test        : undefined,
	},
};





class HTMLUserInterface {




	eventListeners = [
		{
			query: '#form-clock',
			type: 'change',
			listener: this.formChangeHandler
		},
	];

	constructor() {
		element = HTMLApp.buildElementMap(document, elementMap);
		//console.log(element);
		HTMLApp.addEventListeners(this.eventListeners, this);
	}




	formChangeHandler(event) {
		//log('formChangeHandler:', event);
		//log('event.target', event.target);
		//log('event.currentTarget', event.currentTarget);
		//log('event.target.name', event.target.name);
		//log('event.target.value', event.target.value);

		switch(event.target.name) {
			case 'style'        : this.updateStyle(event.target.value); break;
			case 'background'   : this.updateBackground(event.target.value) ; break;
			case 'date'         : clockView.changeDate(new dates.Date(event.target.value)) ; break;
			default             : clockView.updateClock(); break;
		}

	}/* formChangeHandler */


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

	/** @param {dates.Date} date */
	set date(date) {
		element.datePicker.value = date.toIsoDate();
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