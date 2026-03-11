/* yearclockApp
*/



import { HTMLApp } from "../[html-common]/module/HTMLApp.js";
import * as l10n from "./L10n.js";
import * as dates from "./Dates.js";
import * as testing from "./Testing.js";
import { controller } from './controller.js';
import { parameter, ui } from './view-html-ui.js';
import { clockView } from './view-clock.js';


class YearclockApp extends HTMLApp {

	appVersion = 'v2.🐁Δ';
	projectColour = 'gold';
	appInfo = [`%c
		Year Clock ${this.appVersion} by ldpercy
		https://github.com/ldpercy/year-clock/releases/tag/${this.appVersion}
		`.replace(/\n\t/g,'\n'),
		`color: light-dark(hsl(from ${this.projectColour} h s 30), hsl(from ${this.projectColour} h s 70));`,
	];

	eventListeners = [
		// {
		// 	query: '#form-clock',
		// 	type: 'change',
		// 	listener: this.formChangeHandler
		// },

		// {
		// 	query: '#button-dayBack',
		// 	type: 'click',
		// 	listener: ((event)=>{ event.preventDefault(); this.dayBackward(); })
		// },
		// {
		// 	query: '#button-dayForward',
		// 	type: 'click',
		// 	listener: ((event)=>{ event.preventDefault(); this.dayForward(); })
		// },
		// {
		// 	query: '#button-showAppInfo',
		// 	type: 'click',
		// 	listener: ui.toggleAppInfoDialog
		// },
	];






	documentDOMContentLoaded() {
		super.documentDOMContentLoaded();
		this.setup()
	}


	/* setup
	*/
	setup() {
		// Set initial date based on date param or local date
		parameter.url.date = this.getUrlParameter('date'); // will be null if absent

		if (parameter.url.date === null) {
			parameter.initial.date = parameter.default.date;
		}
		else
		{
			const urlDate =  new dates.Date(parameter.url.date);
			parameter.initial.date = (urlDate.isValid) ? urlDate : parameter.default.date;
		}


		// Theming:
		parameter.url.theme = this.getUrlParameter('theme');
		parameter.initial.theme   = parameter.url.theme || parameter.default.theme;
		parameter.url.style = this.getUrlParameter('style');
		parameter.initial.style   = parameter.url.style || parameter.default.style;
		// Language
		parameter.url.language = this.getUrlParameter('language');
		parameter.initial.language   = l10n.getSupportedLanguage(parameter.url.language) || l10n.getSupportedBrowserLanguage() || parameter.default.language;
		// Background
		parameter.url.background = this.getUrlParameter('background');
		parameter.initial.background   = parameter.url.background || parameter.default.background;
		// Hemisphere
		parameter.url.hemisphere = this.getUrlParameter('hemisphere');
		parameter.initial.hemisphere   = parameter.url.hemisphere || parameter.default.hemisphere;

		// test
		parameter.url.test = this.getUrlParameter('test');
		parameter.initial.test   = parameter.url.test || parameter.default.test;
		if (parameter.initial.test) document.body.classList.add('testing');

		// reusable page elements
		// this.page.element.style_theme        = document.getElementById('stylesheet-theme');
		// this.page.element.style_style        = document.getElementById('stylesheet-style');	// I know this is confusing, will try to find a better name
		// this.page.element.style_background   = document.getElementById('stylesheet-background');

		//this.page.element.container   = document.getElementById('clockContainer');

		// // The clock form
		// this.page.element.themeInput = document.getElementById('input-theme');
		// this.page.element.themeInput.value = this.page.initial.theme;

		// this.page.element.datePicker = document.getElementById('input-date');
		// this.page.element.datePicker.value = this.page.initial.date.toIsoDate();

		// this.page.element.languageInput = document.getElementById('input-language');
		// this.page.element.languageInput.value = this.page.initial.language;

		// this.page.element.styleInput = document.getElementById('input-style');
		// this.page.element.styleInput.value = this.page.initial.style;

		// this.page.element.backgroundInput = document.getElementById('input-background');
		// this.page.element.backgroundInput.value = this.page.initial.background;

		// this.page.element.hemisphereInput = document.getElementById('input-hemisphere');
		// this.page.element.hemisphereInput.value = this.page.initial.hemisphere;

		// this.page.element.clockForm = document.getElementById('form-clock');



		//log('page:', page);

		/** @type {ClockParameters} */
		const initialClockParams = {
			id          : '1234',
			//container   : this.page.element.container,
			date        : parameter.initial.date,
			theme       : parameter.initial.theme,
			style       : parameter.initial.style,
			language    : parameter.initial.language,
			background  : parameter.initial.background,
			hemisphere  : parameter.initial.hemisphere,
		};

		//log('initialClockParams:', initialClockParams);

		ui.updateBackground(parameter.initial.background);

		clockView.drawClock(initialClockParams);
		// I'm sure there's a way to spread these parameters properly...

	} /* setup */










	runTest(testNames, outputString) {
		const testResult = testing.runTest(testNames, outputString);
		//const passTest = (result.flat().length === 0);

		if (testResult.pass) {
			document.getElementById('clockContainer').classList.remove('testFail');
			document.getElementById('clockContainer').classList.add('testPass');

			document.getElementById('testResult').classList.remove('fail');
			document.getElementById('testResult').classList.add('pass');


		}
		else {
			document.getElementById('clockContainer').classList.remove('testPass');
			document.getElementById('clockContainer').classList.add('testFail');
			document.getElementById('testResult').classList.remove('pass');
			document.getElementById('testResult').classList.add('fail');
			console.error('runTest:', JSON.stringify(testResult));
		}
		document.getElementById('testResult').innerHTML = JSON.stringify(testResult,undefined,'  ');
	}/* runTest */


}/* yearclock.App */


export const yearclockApp = new YearclockApp();




/*
// https://gomakethings.com/detecting-click-events-on-svgs-with-vanilla-js-event-delegation/

clockElement.addEventListener('click', function (event) {
	//if (!event.target.matches('.sandwich')) return;
	//	console.log(event.target);
	log('click',event);
}, false);

clockElement.addEventListener('dblclick', function (event) {
	//if (!event.target.matches('.sandwich')) return;
	//	console.log(event.target);
	log('dblclick',event);
}, false);

*/




