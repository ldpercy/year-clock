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



	// Parameters - default, url and computed initial
	parameter = {

		/** @type {ClockParameters} */
		default :
		{
			id			: '1234',
			date        : new dates.Date(),
			theme       : 'wheel',
			style       : '',
			language    : 'en',
			background  : '',
			hemisphere  : 'southern',
			test        : undefined,
		},

		/** @type {UrlParameters} */
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
		/** @type {ClockParameters} */
		initial :		// initial computed values to use
		{
			id			: undefined,
			date        : undefined,	// initial date to use
			theme       : undefined,	// initial clock theme to use
			style       : undefined,	// initial clock style to use
			language    : undefined,	// initial language to use
			background  : undefined,
			hemisphere  : undefined,
			test        : undefined,
		},
	};



	documentDOMContentLoaded() {
		super.documentDOMContentLoaded();
		this.setup()
	}


	/* setup
	*/
	setup() {

		// id
		this.parameter.initial.id  =  this.parameter.default.id;

		// Set initial date based on date param or local date
		this.parameter.url.date = this.getUrlParameter('date'); // will be null if absent

		if (this.parameter.url.date === null) {
			this.parameter.initial.date = this.parameter.default.date;
		}
		else
		{
			const urlDate =  new dates.Date(this.parameter.url.date);
			this.parameter.initial.date = (urlDate.isValid) ? urlDate : this.parameter.default.date;
		}


		// Theming:
		this.parameter.url.theme = this.getUrlParameter('theme');
		this.parameter.initial.theme   = this.parameter.url.theme || this.parameter.default.theme;
		this.parameter.url.style = this.getUrlParameter('style');
		this.parameter.initial.style   = this.parameter.url.style || this.parameter.default.style;
		// Language
		this.parameter.url.language = this.getUrlParameter('language');
		this.parameter.initial.language   = l10n.getSupportedLanguage(this.parameter.url.language) || l10n.getSupportedBrowserLanguage() || this.parameter.default.language;
		// Background
		this.parameter.url.background = this.getUrlParameter('background');
		this.parameter.initial.background   = this.parameter.url.background || this.parameter.default.background;
		// Hemisphere
		this.parameter.url.hemisphere = this.getUrlParameter('hemisphere');
		this.parameter.initial.hemisphere   = this.parameter.url.hemisphere || this.parameter.default.hemisphere;

		// test
		this.parameter.url.test = this.getUrlParameter('test');
		this.parameter.initial.test   = this.parameter.url.test || this.parameter.default.test;
		if (this.parameter.initial.test) document.body.classList.add('testing');


		ui.initialise();
		ui.updateBackground(this.parameter.initial.background);

		/** @type {ClockParameters} */
		const initialClockParams = {
			id          : this.parameter.initial.id,
			//container   : this.page.element.container,
			date        : this.parameter.initial.date,
			theme       : this.parameter.initial.theme,
			style       : this.parameter.initial.style,
			language    : this.parameter.initial.language,
			background  : this.parameter.initial.background,
			hemisphere  : this.parameter.initial.hemisphere,
		};

		console.debug('initialClockParams:', initialClockParams);



		clockView.drawClock(initialClockParams);
		// I'm sure there's a way to spread these parameters properly...

	} /* setup */



	/**
	 * @param {string} testNames
	 * @param {string} outputString
	 */
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


