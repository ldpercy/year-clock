import { HTMLApp } from "../[html-common]/module/HTMLApp.js";



let element;

const elementMap = {
	appInfoDialog	: 'dialog-appInfo',
};

let currentCommandSet = 1;



class HTMLUserInterface {

	constructor() {
		element = HTMLApp.buildElementMap(document, elementMap);
		//console.log(element);

	}



	toggleAppInfoDialog() {
		/** @type {HTMLDialogElement} */
		const d = document.querySelector("#dialog-appInfo");
		d.showModal();
	}

}


export const ui = new HTMLUserInterface();