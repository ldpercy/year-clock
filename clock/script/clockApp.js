//
// Setup
//





// object to store general page information
const page = {
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


const themeClass = {};		// global namespace that theme classes will be defined into


/* setup
*/
function setup() {
	// Set initial date based on date param or local date
	page.parameter.date = getParameterByName('date');
	const urlDate = (page.parameter.date !== null) ? new Date(page.parameter.date) : null;
	page.initial.date = (isValidDate(urlDate)) ? urlDate : page.default.date;
	// Theming:
	page.parameter.theme = getParameterByName('theme');
	page.initial.theme   = page.parameter.theme || page.default.theme;
	page.parameter.style = getParameterByName('style');
	page.initial.style   = page.parameter.style || page.default.style;
	// Language
	page.parameter.language = getParameterByName('language');
	page.initial.language   = getSupportedLanguage(page.parameter.language) || getSupportedBrowserLanguage() || page.default.language;
	// Background
	page.parameter.background = getParameterByName('background');
	page.initial.background   = page.parameter.background || page.default.background;
	// Hemisphere
	page.parameter.hemisphere = getParameterByName('hemisphere');
	page.initial.hemisphere   = page.parameter.hemisphere || page.default.hemisphere;

	// test
	page.parameter.test = getParameterByName('test');
	page.initial.test   = page.parameter.test || page.default.test;
	if (page.initial.test) document.body.classList.add('testing');

	// reusable page elements
	page.element.style_theme        = document.getElementById('stylesheet-theme');
	page.element.style_style        = document.getElementById('stylesheet-style');	// I know this is confusing, will try to find a better name
	page.element.style_background   = document.getElementById('stylesheet-background');

	page.element.container   = document.getElementById('clockContainer');

	// The clock form
	page.element.themeInput = document.getElementById('input-theme');
	page.element.themeInput.value = page.initial.theme;

	page.element.datePicker = document.getElementById('input-date');
	page.element.datePicker.value = isoDate(page.initial.date);

	page.element.languageInput = document.getElementById('input-language');
	page.element.languageInput.value = page.initial.language;

	page.element.styleInput = document.getElementById('input-style');
	page.element.styleInput.value = page.initial.style;

	page.element.backgroundInput = document.getElementById('input-background');
	page.element.backgroundInput.value = page.initial.background;

	page.element.hemisphereInput = document.getElementById('input-hemisphere');
	page.element.hemisphereInput.value = page.initial.hemisphere;

	page.element.clockForm = document.getElementById('form-clock');
	page.element.clockForm.addEventListener('change', ((event)=>{formChangeHandler(event)}) );


	// keyboard listener
	document.addEventListener('keydown', ((event)=>{keyboardHandler(event)}) );
	// button listeners
	document.getElementById('button-dayBack').addEventListener('click',
		((event)=>{
			event.preventDefault();
			dayBackward();
		})
	);
	document.getElementById('button-dayForward').addEventListener('click',
		((event)=>{
			event.preventDefault();
			dayForward();
		})
	);

	//log('page:', page);

	const initialClockParams = {
		id          : '1234',
		container   : page.element.container,
		date        : page.initial.date,
		theme       : page.initial.theme,
		style       : page.initial.style,
		language    : page.initial.language,
		background  : page.initial.background,
		hemisphere  : page.initial.hemisphere,
	};

	//log('initialClockParams:', initialClockParams);

	updateBackground(page.initial.background);

	drawClock(initialClockParams);
	// I'm sure there's a way to spread these parameters properly...

	// Loading is async from here on, so the rest is in callbacks:

} /* setup */



function keyboardHandler(event) {

	if (event.target.id === '') // need a MUCH better of vetting these
	{
		switch(event.key) {
			case ','    : event.preventDefault(); dayBackward(); break;
			case '.'   	: event.preventDefault(); dayForward(); break;
			default     : /* do nothing */; break;
		}
	}

}/* keyboardHandler */

function dayForward() {
	const currentDate = page.element.datePicker.valueAsDate;  //valueAsDate
	incrementDay(currentDate);
	changeDate(currentDate);
	page.element.datePicker.value = isoDate(currentDate);
}

function dayBackward() {
	const currentDate = page.element.datePicker.valueAsDate;  //valueAsDate
	decrementDay(currentDate);
	changeDate(currentDate);
	page.element.datePicker.value = isoDate(currentDate);
}


function formChangeHandler(event) {
	//log('formChangeHandler:', event);
	//log('event.target', event.target);
	//log('event.currentTarget', event.currentTarget);
	//log('event.target.name', event.target.name);
	//log('event.target.value', event.target.value);

	switch(event.target.name) {
		case 'style'        : updateStyle(event.target.value); break;
		case 'background'   : updateBackground(event.target.value) ; break;
		case 'date'         : changeDate(new Date(event.target.value)) ; break;
		default             : updateClock(); break;
	}

}/* formChangeHandler */



function updateStyle(style) {
	//page.element.themeInput.value
	const cssUrl_style = (style) ? `clock/theme/${page.element.themeInput.value}/style-${style}.css` : '';
	page.element.style_style.setAttribute('href', cssUrl_style);
}

function updateBackground(background) {
	const cssUrl_background = (background) ? `clock/background/${background}.css` : '';
	page.element.style_background.setAttribute('href', cssUrl_background);
}


function updateClock() {
	//log('updateClock:');

	if (!isValidDate(new Date(page.element.datePicker.value)))
	{
		log('Invalid date');
		return;
	}

	const updateClockParams = {
		id          : '1234',
		date        : new Date(page.element.datePicker.value),
		theme       : page.element.themeInput.value,
		style       : page.element.styleInput.value,
		language    : page.element.languageInput.value,
		background  : page.element.backgroundInput.value,
		hemisphere  : page.element.hemisphereInput.value,
	};

	drawClock(updateClockParams);
}



/* drawClock
Part 1:
* load the css
* async load the theme class
*/
function drawClock(clockParameter) {

	//log('drawClock', arguments);

	let cssUrl_theme = `clock/theme/${clockParameter.theme}/theme.css`;
	page.element.style_theme.setAttribute('href', cssUrl_theme);

	if (clockParameter.style) {
		let cssUrl_style = `clock/theme/${clockParameter.theme}/style-${clockParameter.style}.css`;
		page.element.style_style.setAttribute('href', cssUrl_style);
	}

	if (themeClass[clockParameter.theme]) {
		// we already have that theme class in memory
		// go right ahead to drawClock2
		drawClock2(clockParameter);
	}
	else { // go and get the theme class
		let classUrl = `clock/theme/${clockParameter.theme}/theme.class.js`;
		// async load the theme class
		replaceScript('script-themeClass', classUrl, (()=>{return drawClock2(clockParameter)}));
	}

}/* drawClock */


/* drawClock2
Asynchronously called by the class script element's load event.
Part 2:
* create instance of the theme class for the clock
* write clock svg into the container
*/
function drawClock2(clockParameter) {

	//log('drawClock2',arguments);
	let clockSVG;

	//log('dd:',this.displayDate);
	//try {

	//log('--- before instantiation');
		page.clockInstance[clockParameter.id] = new themeClass[clockParameter.theme](clockParameter);
	//log('after instantiation; before getClockSVG');
		clockSVG = page.clockInstance[clockParameter.id].getClockSVG();
	/* }
	catch(error)
	{
		log('found an error');
		log(error);
	} */

	//log('after getClockSVG; before page update');

	page.element.container.innerHTML = clockSVG;

	//log('after page update ---');

	if (page.initial.test) { runTest(clockSVG); }

}/* drawClock */



function changeDate(date)
{
	if (!isValidDate(new Date(page.element.datePicker.value)))
	{
		log('Invalid date');
		return;
	}
	page.clockInstance[1234].setDisplayDate(date);
	const clockSVG = page.clockInstance[1234].getClockSVG();
	page.element.container.innerHTML = clockSVG;
}




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