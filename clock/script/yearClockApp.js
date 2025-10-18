/* YearClockApp
*/
class YearClockApp extends HTMLApp {

	name = "Year Clock";
	info = `
		Year Clock by ldpercy
		https://github.com/ldpercy/year-clock/
		v1.11-dev
		https://github.com/ldpercy/year-clock/pull/39
	`.replace(/\n\t/g,'\n');

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
			listener: ((event)=>{ event.preventDefault(); this.dayBackward(); })
		},
		{
			query: '#button-dayForward',
			type: 'click',
			listener: ((event)=>{ event.preventDefault(); this.dayForward(); })
		},
	];


	// object to store general page information
	page = {
		// arguments - default, received and computed
		default :
		{
			date        : new Date(),
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
		this.page.parameter.date = getParameterByName('date');
		const urlDate = (this.page.parameter.date !== null) ? new Date(this.page.parameter.date) : null;
		this.page.initial.date = (isValidDate(urlDate)) ? urlDate : this.page.default.date;
		// Theming:
		this.page.parameter.theme = getParameterByName('theme');
		this.page.initial.theme   = this.page.parameter.theme || this.page.default.theme;
		this.page.parameter.style = getParameterByName('style');
		this.page.initial.style   = this.page.parameter.style || this.page.default.style;
		// Language
		this.page.parameter.language = getParameterByName('language');
		this.page.initial.language   = getSupportedLanguage(this.page.parameter.language) || getSupportedBrowserLanguage() || this.page.default.language;
		// Background
		this.page.parameter.background = getParameterByName('background');
		this.page.initial.background   = this.page.parameter.background || this.page.default.background;
		// Hemisphere
		this.page.parameter.hemisphere = getParameterByName('hemisphere');
		this.page.initial.hemisphere   = this.page.parameter.hemisphere || this.page.default.hemisphere;

		// test
		this.page.parameter.test = getParameterByName('test');
		this.page.initial.test   = this.page.parameter.test || this.page.default.test;
		if (this.page.initial.test) document.body.classList.add('testing');

		// reusable page elements
		this.page.element.style_theme        = document.getElementById('stylesheet-theme');
		this.page.element.style_style        = document.getElementById('stylesheet-style');	// I know this is confusing, will try to find a better name
		this.page.element.style_background   = document.getElementById('stylesheet-background');

		this.page.element.container   = document.getElementById('clockContainer');

		// The clock form
		this.page.element.themeInput = document.getElementById('input-theme');
		this.page.element.themeInput.value = this.page.initial.theme;

		this.page.element.datePicker = document.getElementById('input-date');
		this.page.element.datePicker.value = isoDate(this.page.initial.date);

		this.page.element.languageInput = document.getElementById('input-language');
		this.page.element.languageInput.value = this.page.initial.language;

		this.page.element.styleInput = document.getElementById('input-style');
		this.page.element.styleInput.value = this.page.initial.style;

		this.page.element.backgroundInput = document.getElementById('input-background');
		this.page.element.backgroundInput.value = this.page.initial.background;

		this.page.element.hemisphereInput = document.getElementById('input-hemisphere');
		this.page.element.hemisphereInput.value = this.page.initial.hemisphere;

		this.page.element.clockForm = document.getElementById('form-clock');





		//log('page:', page);

		const initialClockParams = {
			id          : '1234',
			container   : this.page.element.container,
			date        : this.page.initial.date,
			theme       : this.page.initial.theme,
			style       : this.page.initial.style,
			language    : this.page.initial.language,
			background  : this.page.initial.background,
			hemisphere  : this.page.initial.hemisphere,
		};

		//log('initialClockParams:', initialClockParams);

		this.updateBackground(this.page.initial.background);

		this.drawClock(initialClockParams);
		// I'm sure there's a way to spread these parameters properly...

		// Loading is async from here on, so the rest is in callbacks:

	} /* setup */





	keyboardHandler(event) {
		if (event.target.id === '') // need a MUCH better of vetting these
		{
			switch(event.key) {
				case ','    : event.preventDefault(); this.dayBackward(); break;
				case '.'   	: event.preventDefault(); this.dayForward(); break;
				default     : /* do nothing */; break;
			}
		}
	}/* keyboardHandler */


	dayForward() {
		const currentDate = this.page.element.datePicker.valueAsDate;  //valueAsDate
		incrementDay(currentDate);
		this.changeDate(currentDate);
		this.page.element.datePicker.value = isoDate(currentDate);
	}


	dayBackward() {
		const currentDate = this.page.element.datePicker.valueAsDate;  //valueAsDate
		decrementDay(currentDate);
		this.changeDate(currentDate);
		this.page.element.datePicker.value = isoDate(currentDate);
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
			case 'date'         : this.changeDate(new Date(event.target.value)) ; break;
			default             : this.updateClock(); break;
		}

	}/* formChangeHandler */



	updateStyle(style) {
		//page.element.themeInput.value
		const cssUrl_style = (style) ? `clock/theme/${this.page.element.themeInput.value}/style-${style}.css` : '';
		this.page.element.style_style.setAttribute('href', cssUrl_style);
	}


	updateBackground(background) {
		const cssUrl_background = (background) ? `clock/background/${background}.css` : '';
		this.page.element.style_background.setAttribute('href', cssUrl_background);
	}


	updateClock() {
		//log('updateClock:');

		if (!isValidDate(new Date(this.page.element.datePicker.value)))
		{
			log('Invalid date');
			return;
		}

		const updateClockParams = {
			id          : '1234',
			date        : new Date(this.page.element.datePicker.value),
			theme       : this.page.element.themeInput.value,
			style       : this.page.element.styleInput.value,
			language    : this.page.element.languageInput.value,
			background  : this.page.element.backgroundInput.value,
			hemisphere  : this.page.element.hemisphereInput.value,
		};

		this.drawClock(updateClockParams);
	}



	/* drawClock
	Part 1:
	* load the css
	* async load the theme class
	*/
	drawClock(clockParameter) {

		//log('drawClock', arguments);

		let cssUrl_theme = `clock/theme/${clockParameter.theme}/theme.css`;
		this.page.element.style_theme.setAttribute('href', cssUrl_theme);

		if (clockParameter.style) {
			let cssUrl_style = `clock/theme/${clockParameter.theme}/style-${clockParameter.style}.css`;
			this.page.element.style_style.setAttribute('href', cssUrl_style);
		}

		if (YearClock[clockParameter.theme]) {
			// we already have that theme class in memory
			// go right ahead to drawClock2
			this.drawClock2(clockParameter);
		}
		else { // go and get the theme class
			let classUrl = `clock/theme/${clockParameter.theme}/theme.class.js`;
			// async load the theme class
			replaceScript('script-themeClass', classUrl, (()=>{return this.drawClock2(clockParameter)}));
		}

	}/* drawClock */


	/* drawClock2
	Asynchronously called by the class script element's load event.
	Part 2:
	* create instance of the theme class for the clock
	* write clock svg into the container
	*/
	drawClock2(clockParameter) {

		//log('drawClock2',arguments);
		let clockSVG;

		//log('dd:',this.displayDate);
		//try {

		//log('--- before instantiation');
			this.page.clockInstance[clockParameter.id] = new YearClock[clockParameter.theme](clockParameter);
		//log('after instantiation; before getClockSVG');
			clockSVG = this.page.clockInstance[clockParameter.id].getClockSVG();
		/* }
		catch(error)
		{
			log('found an error');
			log(error);
		} */

		//log('after getClockSVG; before page update');

		this.page.element.container.innerHTML = clockSVG;

		//log('after page update ---');

		if (this.page.initial.test) { runTest(clockSVG); }

	}/* drawClock */



	changeDate(date)
	{
		if (!isValidDate(new Date(this.page.element.datePicker.value)))
		{
			log('Invalid date');
			return;
		}
		this.page.clockInstance[1234].setDisplayDate(date);
		const clockSVG = this.page.clockInstance[1234].getClockSVG();
		this.page.element.container.innerHTML = clockSVG;
	}

}/* YearClockApp */


var yearClockApp = new YearClockApp();




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