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
			element: document,
			type: 'keydown',
			listener: this.keyboardHandler
		},
	];


	constructor() {
		HTMLApp.addEventListeners(this.eventListeners, this);
		console.debug('controller');
	}



	keyboardHandler(event) {
		console.debug(event);
		if (event.target.id === '') // need a MUCH better of vetting these
		{
			switch(event.key) {
				case ','    : event.preventDefault(); this.dayBackward(); break;
				case '.'   	: event.preventDefault(); this.dayForward(); break;
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






