/* yearclockApp
*/



import { HTMLApp } from "../[html-common]/module/HTMLApp.js";
import * as l10n from "./L10n.js";
import * as dates from "./Dates.js";
import * as testing from "./Testing.js";
import { controller } from './controller.js';
import { ui } from './view-html-ui.js';
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


	// object to store general page information
	page = {
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

		parameter : 	// requested values to use
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

		element       : {}, // store references to various page elements
		clockInstance : {}, // clock instances will be collected here
	};



	documentDOMContentLoaded() {
		super.documentDOMContentLoaded();
		this.setup()
	}


	/* setup
	*/
	setup() {
		// Set initial date based on date param or local date
		this.page.parameter.date = this.getUrlParameter('date'); // will be null if absent

		if (this.page.parameter.date === null) {
			this.page.initial.date = this.page.default.date;
		}
		else
		{
			const urlDate =  new dates.Date(this.page.parameter.date);
			this.page.initial.date = (urlDate.isValid) ? urlDate : this.page.default.date;
		}


		// Theming:
		this.page.parameter.theme = this.getUrlParameter('theme');
		this.page.initial.theme   = this.page.parameter.theme || this.page.default.theme;
		this.page.parameter.style = this.getUrlParameter('style');
		this.page.initial.style   = this.page.parameter.style || this.page.default.style;
		// Language
		this.page.parameter.language = this.getUrlParameter('language');
		this.page.initial.language   = l10n.getSupportedLanguage(this.page.parameter.language) || l10n.getSupportedBrowserLanguage() || this.page.default.language;
		// Background
		this.page.parameter.background = this.getUrlParameter('background');
		this.page.initial.background   = this.page.parameter.background || this.page.default.background;
		// Hemisphere
		this.page.parameter.hemisphere = this.getUrlParameter('hemisphere');
		this.page.initial.hemisphere   = this.page.parameter.hemisphere || this.page.default.hemisphere;

		// test
		this.page.parameter.test = this.getUrlParameter('test');
		this.page.initial.test   = this.page.parameter.test || this.page.default.test;
		if (this.page.initial.test) document.body.classList.add('testing');

		// reusable page elements
		this.page.element.style_theme        = document.getElementById('stylesheet-theme');
		this.page.element.style_style        = document.getElementById('stylesheet-style');	// I know this is confusing, will try to find a better name
		this.page.element.style_background   = document.getElementById('stylesheet-background');

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
			date        : this.page.initial.date,
			theme       : this.page.initial.theme,
			style       : this.page.initial.style,
			language    : this.page.initial.language,
			background  : this.page.initial.background,
			hemisphere  : this.page.initial.hemisphere,
		};

		//log('initialClockParams:', initialClockParams);

		ui.updateBackground(this.page.initial.background);

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




