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
	defaultTheme    : 'season-out',
	locale          : 'en',           // The internal locale used for month and day names in classes
	setupDate       : undefined,      // the date used at the initial setup time
};


// Theme configuration
const theme = {
	name             : undefined,    // string   - The name of the theme, also the directory the theme files are stored in
	description      : undefined,    // string   - Description of the theme set in the theme config.js
	configUrl        : undefined,    // string   - The location of the theme's config file
	base             : undefined,    // string   - (optional) A base theme that will be loaded prior the main theme
	style            : undefined,    // string   - A set of additional css styles for making quick cosmetic changes
	clock            : {             // object   - Object containing parameters and drawing functions for the theme
		drawClock    : ()=>{},       // function - (mandatory) Main function to draw the theme clock
		// drawPart  : ()=>{},       // function - (optional) Draws the named clock part
	},
};




themeClass = {};		// namespace that theme classes will be defined into
clockInstance = {};		// clock instances will be collected here

/* setup
*/
function setup() {
	// Language
	config.languageParam = getParameterByName('language');
	config.language = getLanguage(config.languageParam);
	log('config.languageParam:', config.languageParam);
	log('config.language:', config.language);
	config.monthNames = l10n.gregLocal[config.language];

	// Set initial display date based on date param or local date
	const dateParameter = getParameterByName('date');
	const urlDate = (dateParameter !== null) ? new Date(dateParameter) : null;
	log('urlDate', urlDate);
	config.setupDate = (isValidDate(urlDate)) ? urlDate : new Date();
	log('setupDate', config.setupDate);


	// Theming:
	config.styleElement_base = document.getElementById('stylesheet-base');
	config.styleElement_theme = document.getElementById('stylesheet-theme');
	config.styleElement_style = document.getElementById('stylesheet-style');	// I know this is confusing, will try to find a better name

	theme.name = getParameterByName('theme') || config.defaultTheme;
	log('theme.name:', theme.name);

	theme.style = getParameterByName('style');
	log('theme.style:', theme.style);


	theme.classUrl = `theme/${theme.name}/theme.class.js`;

	containerElement = document.getElementById('clockContainer');

	drawClock(containerElement, theme.name, '1234', config.setupDate, config.language );

	// Loading is async from here on, so the rest is in callbacks:

} /* setup */







/* drawClock
*/
function drawClock(container, themeName, id, date, language ) {

	log('drawClock',arguments);

	let cssUrl_theme = `theme/${theme.name}/theme.css`;
	config.styleElement_theme.setAttribute('href', cssUrl_theme);

	if (theme.style) {
		let cssUrl_style = `theme/${theme.name}/style-${theme.style}.css`;
		config.styleElement_style.setAttribute('href', cssUrl_style);
	}

	// load the theme class
	replaceScript('script-themeClass', theme.classUrl, (()=>{return drawClock2(...arguments)}));

}/* drawClock */


/* drawClock2
*/
function drawClock2(container, themeName, id, date, language ) {

	log('drawClock2',arguments);

	clockInstance[id] = new themeClass[themeName](id, date, language);


	let displayDate = createDisplayDate(config.setupDate);
	let clockSVG = clockInstance[id].getClockSVG(displayDate);

	container.innerHTML += clockSVG;

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