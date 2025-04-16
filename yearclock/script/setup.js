//
// Setup
//

console.clear();
log = createLog();
log('--- setup.js ---')


// Year-clock general configuration
const config = {
	date            : {},            // The date used for the clock display
	//displayDate     : {},            // The date used for the clock display
	year            : {},            // year information
	days            : [],            // array of day information
	monthCodes      : [ "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec" ],
	defaultLanguage : 'en',
	defaultTheme    : 'plain-svg',
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
	// Set Current Date
	config.date.param      = getParameterByName('date');
	config.date.object     = (config.date.param) ? new Date(config.date.param) : new Date();
	config.date.year       = config.date.object.getFullYear();
	config.date.month      = config.date.object.getMonth() + 1;		// js month starts at 0
	config.date.date       = config.date.object.getDate();
	config.date.dayOfYear  = dayOfYear(config.date.object);
	config.date.daysInYear = undefined;
	log('config.date.object:', config.date.object);


	// Language
	config.languageParam = getParameterByName('language');
	config.language = getLanguage(config.languageParam);
	log('config.languageParam:', config.languageParam);
	log('config.language:', config.language);
	config.monthNames = l10n.gregLocal[config.language];

	// Set Up Months
	config.months = config.monthNames.map(
		function( monthName, monthNumber ) {
			const startDate    = new Date(config.date.year, monthNumber);
			const nextMonth    = new Date(config.date.year, monthNumber + 1);
			const endDate      = new Date(nextMonth - 1000);
			const radiansStart = dateRadians(startDate);
			const radiansEnd   = dateRadians(endDate);
			const radiansWidth = radiansEnd - radiansStart;

			const result = {
				'name'         : monthName,
				'code'         : config.monthCodes[monthNumber],
				'startDate'    : new Date(config.date.year, monthNumber),
				'nextMonth'    : nextMonth,
				'endDate'      : new Date(nextMonth - 1000),
				'radiansStart' : radiansStart,
				'radiansEnd'   : radiansEnd,
				'radiansWidth' : radiansWidth,
				'radiansMid'   : midpoint(radiansStart, radiansEnd),
			}
			return result;
		}
	);

	config.yearDayArray  = getPeriodDayArray(startOfYear(config.date.object), nextYear(config.date.object));
	config.monthDayArray = getPeriodDayArray(startOfMonth(config.date.object), nextMonth(config.date.object));

	config.date.daysInYear = config.yearDayArray.length;

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
*/
function setThemeConfig(){
	// onload script-themeConfig
	// theme.description and theme.base are now set

	if (theme.base) {
		log(`theme.base: ${theme.base}`);
		// set base css
		let cssUrl_base = `theme/${theme.base}/style.css`;
		config.styleElement_base.setAttribute('href', cssUrl_base);
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
	log('--- Before drawClock ---');
	theme.clock.drawClock();
	log('--- After drawClock ---');
}/* setTheme */



//
// Utilities
//


/* URL Parameters
*/
function getParameterByName(name)
{
	const url = window.location.href
	name = name.replace(/[\[\]]/g, "\\$&")
	const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)")
	const results = regex.exec(url)
	if (!results) return null
	if (!results[2]) return ''
	return decodeURIComponent(results[2].replace(/\+/g, " "))
}


/* replaceScript
*/
function replaceScript(id, scriptUrl, callback) {
	//log(`replaceScript: ${id} ${scriptUrl} ${callback}`);
	let scriptElement = document.createElement('script');

	scriptElement.setAttribute('id', id);
	scriptElement.setAttribute('src', scriptUrl);
	scriptElement.addEventListener('load', callback);

	document.getElementById(id).remove();
	document.getElementsByTagName('head')[0].appendChild(scriptElement);
}/* replaceScript */



/* createLog
Returns a log function that logs to the console with performance timing.
Use:
	mylog = createLog();
*/
function createLog() {
	return (...values) => {
		console.log(performance.now(), ...values);
	}
}
