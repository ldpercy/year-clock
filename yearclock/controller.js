import { HTMLApp } from "../[html-common]/module/HTMLApp.js";
import { ui } from './view-html-ui.js';
import { clockView } from './view-clock.js';
import * as dates from "./Dates.js";


const keyFunctionMap = {
	'?'	: ui.toggleAppInfoDialog,
};






class Controller {


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
		//console.debug(event);
		if (event.target.id === '') // need a MUCH better of vetting these
		{
			switch(event.key) {
				case ','    : this.dayBackward(); break;
				case '.'   	: this.dayForward(); break;
				case '?'	: ui.toggleAppInfoDialog(); break;
				default     : /* do nothing */; break;
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



}/* Controller */

export const controller = new Controller();






