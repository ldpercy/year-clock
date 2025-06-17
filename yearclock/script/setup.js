//
// Setup
//

console.clear();
log = createLog();
log('--- setup.js ---')


// Year-clock general configuration
const config = {
	monthCodes      : [ "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec" ],
	defaultLanguage : 'en',

	locale          : 'en',           // The internal locale used for month and day names in classes
	setupDate       : undefined,      // the date used at the initial setup time
};


// Theme configuration
/*const theme = {
	name             : undefined,    // string   - The name of the theme, also the directory the theme files are stored in
	description      : undefined,    // string   - Description of the theme set in the theme config.js
	configUrl        : undefined,    // string   - The location of the theme's config file
	base             : undefined,    // string   - (optional) A base theme that will be loaded prior the main theme
	style            : undefined,    // string   - A set of additional css styles for making quick cosmetic changes
	clock            : {             // object   - Object containing parameters and drawing functions for the theme
		drawClock    : ()=>{},       // function - (mandatory) Main function to draw the theme clock
		// drawPart  : ()=>{},       // function - (optional) Draws the named clock part
	},
};*/


// object to store general page information
const page = {
	// arguments - default, received and computed
	default :
	{
		date        : new Date(),
		theme       : 'season-out',
		style       : '',
		language    : 'en',
	},

	parameter : 	// requested values to use
	{
		date        : undefined,
		theme       : undefined,
		style       : undefined,
		language    : undefined,
	},

	initial :		// initial computed values to use
	{
		date        : undefined,	// initial date to use
		theme       : undefined,	// initial clock theme to use
		style       : undefined,	// initial clock style to use
		language    : undefined,	// initial language to use
	},

	element : {}, // store references to various page elements

};


themeClass = {};		// namespace that theme classes will be defined into
clockInstance = {};		// clock instances will be collected here

/* setup
*/
function setup() {
	// Language
	page.parameter.language = getParameterByName('language');
	page.initial.language   = getLanguage(page.parameter.language, page.default.language);

	// Set initial date based on date param or local date
	page.parameter.date = getParameterByName('date');
	const urlDate = (page.parameter.date !== null) ? new Date(page.parameter.date) : null;
	page.initial.date = (isValidDate(urlDate)) ? urlDate : page.default.date;

	// Theming:
	page.parameter.theme = getParameterByName('theme');
	page.initial.theme   = page.parameter.theme || page.default.theme;
	page.parameter.style = getParameterByName('style');
	page.initial.style   = page.parameter.style || page.default.style;

	// reusable page elements
	page.element.style_theme = document.getElementById('stylesheet-theme');
	page.element.style_style = document.getElementById('stylesheet-style');	// I know this is confusing, will try to find a better name
	page.element.container   = document.getElementById('clockContainer');

	log('page:', page);

	let initialClockParams = {
		id          : '1234',
		container   : page.element.container,
		date        : page.initial.date,
		theme       : page.initial.theme,
		style       : page.initial.style,
		language    : page.initial.language,
	};

	log('initialClockParams:', initialClockParams);

	drawClock(initialClockParams);
	// I'm sure there's a way to spread these parameters properly...

	// Loading is async from here on, so the rest is in callbacks:

} /* setup */




/* drawClock
Part 1:
* load the css
* async load the theme class
*/
function drawClock(clock) {

	log('drawClock',arguments);

	let cssUrl_theme = `theme/${clock.theme}/theme.css`;
	page.element.style_theme.setAttribute('href', cssUrl_theme);

	if (clock.style) {
		let cssUrl_style = `theme/${clock.theme}/style-${clock.style}.css`;
		page.element.style_style.setAttribute('href', cssUrl_style);
	}

	let classUrl = `theme/${clock.theme}/theme.class.js`;
	// async load the theme class
	replaceScript('script-themeClass', classUrl, (()=>{return drawClock2(...arguments)}));

}/* drawClock */


/* drawClock2
Part 2:
* create instance of the theme class for the clock
* write clock svg into the container
*/
function drawClock2(clock) {

	log('drawClock2',arguments);

	clockInstance[clock.id] = new themeClass[clock.theme](clock.id, clock.date, clock.language);

	let displayDate = createDisplayDate(clock.date, clock.language);
	let clockSVG = clockInstance[clock.id].getClockSVG(displayDate);

	clock.container.innerHTML += clockSVG;

}/* drawClock */






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