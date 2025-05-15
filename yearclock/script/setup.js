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
	theme.configUrl = `theme/${theme.name}/config.js`;
	theme.scriptUrl = `theme/${theme.name}/yearclock.js`;

	replaceScript('script-themeConfig', theme.configUrl, setThemeConfig);
	// Loading is async from here on, so the rest is in callbacks:
	// Load the config, wait for the callback
	// If specified, load base theme
	// Load the theme script, wait for the callback
	// When the theme script arrives, call theme.drawClock.

} /* setup */



/* setThemeConfig
setup part 2
*/
function setThemeConfig(){
	// onload script-themeConfig
	// theme.description and theme.base are now set

	if (theme.base) {
		log(`theme.base: ${theme.base}`);
		if (theme.loadBaseCSS) {
			// set base css
			let cssUrl_base = `theme/${theme.base}/style.css`;
			config.styleElement_base.setAttribute('href', cssUrl_base);
		}
		//load the base resources
		let baseScriptUrl = `theme/${theme.base}/yearclock.js`;
		replaceScript('script-themeBase', baseScriptUrl, setBaseTheme);
	}
	else {
		log('no theme.base set');
		//just load the theme resources
		replaceScript('script-theme', theme.scriptUrl, setTheme);
	}
}/* setThemeConfig */



function setBaseTheme() {
	// onload script-themeBase
	// base theme values are now set
	// proceed to set theme
	replaceScript('script-theme', theme.scriptUrl, setTheme);
}



function setTheme(){
	// onload script-theme
	// All theme script items are now set.
	// log('onload script-theme');

	let cssUrl_theme = `theme/${theme.name}/style.css`;
	config.styleElement_theme.setAttribute('href', cssUrl_theme);

	if (theme.style) {
		let cssUrl_style = `theme/${theme.name}/style-${theme.style}.css`;
		config.styleElement_style.setAttribute('href', cssUrl_style);
	}

	const clockElement = document.getElementById('clock');
	if (theme.clock.viewBox) {
		clockElement.setAttribute('viewBox', theme.clock.viewBox);
	}



	// displayDate is now a transient object passed in to drawClock
	let displayDate = createDisplayDate(config.setupDate);
	log('Initial displayDate:', displayDate);

	log('--- debug ---');
	debug();
	log('--- Before drawClock ---');
	theme.clock.drawClock(clockElement, displayDate);
	log('--- After drawClock ---');


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

}/* setTheme */


function debug() {

}

