import { HTMLApp } from "../[html-common]/module/HTMLApp.js";
import { ui } from './view-html-ui.js';
import { clockView } from './view-clock.js';
import * as dates from "./Dates.js";
import { yearclockApp } from './yearclockApp.js';



class Controller {


	keyFunctionMap = {
		'd'	: this.dayForward,
		'.'	: this.dayForward,
		'D'	: this.dayBackward,
		','	: this.dayBackward,
		'?'	: ui.toggleAppInfoDialog,
	};


	eventListeners = [
		{
			query: '#form-clock',
			type: 'change',
			listener: this.formChangeHandler
		},
		{
			element: document,
			type: 'keydown',
			listener: this.keyboardHandler
		},
		{
			query: 'select,input',
			type: 'keydown',
			listener: (event)=>event.stopPropagation()
		},
		{
			query: '#button-dayBack',
			type: 'click',
			listener: this.dayBackward,
		},
		{
			query: '#button-dayForward',
			type: 'click',
			listener: this.dayForward,
		},
		{
			query: '#button-showAppInfo',
			type: 'click',
			listener: ui.toggleAppInfoDialog,
		},
		{
			query: '.colourScheme-selector',
			type: 'click',
			listener: (event) => { this.colourSchemeHandler(event); }
		},
	];


	constructor() {
		HTMLApp.addEventListeners(this.eventListeners, this);
		console.debug('controller');
	}



	formChangeHandler(event) {
		//log('formChangeHandler:', event);
		//log('event.target', event.target);
		//log('event.currentTarget', event.currentTarget);
		//log('event.target.name', event.target.name);
		//log('event.target.value', event.target.value);

		switch(event.target.name) {
			case 'style'        : ui.updateStyle(event.target.value); break;
			case 'background'   : ui.updateBackground(event.target.value) ; break;
			case 'date'         : clockView.changeDate(new dates.Date(event.target.value)) ; break;
			default             : clockView.updateClock(); break;
		}

	}/* formChangeHandler */




	keyboardHandler(event) {
		if (!event.altKey && !event.ctrlKey && !event.metaKey) {

			if (this.keyFunctionMap[event.key]) {
				event.preventDefault();
				this.keyFunctionMap[event.key]();
			}
		}
	}/* keyboardHandler */



	dayForward() {
		const currentDate = new dates.Date(ui.date);  //valueAsDate
		currentDate.incrementDay();
		clockView.changeDate(currentDate);
		ui.date = currentDate;
	}


	dayBackward() {
		const currentDate = new dates.Date(ui.date);  //valueAsDate
		currentDate.decrementDay();
		clockView.changeDate(currentDate);
		ui.date = currentDate;
	}


	colourSchemeHandler(event) {
		ui.colourScheme = event.target.value;
		yearclockApp.setColourScheme(event.target.value);
	}



}/* Controller */

export const controller = new Controller();






