/* Setup
*/

console.clear()

const config = {
	clockRadius  : 1200,
	monthCodes   : [ "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec" ],
	days         : [],
	defaultTheme : 'brice',

};

// these will be filled in later
const theme = {
	name         : undefined,    // string   - the name of the theme, also the directory the theme files are stored in
	description  : undefined,    // string   - description of the theme set in the theme config.js
	configUrl    : undefined,    // string   - the location of the theme's config file
	base         : undefined,    // string   - a base theme that will be loaded and run prior the main theme
	style        : undefined,    // string   - a set of additional css styles for making quick cosmetic changes
	drawClock    : undefined,    // function - the function provided to draw the theme clock
};


/* setup
*/
function setup() {
	// Language
	config.userLang = navigator.language || navigator.userLanguage;

	config.languageParam = superLang( getParameterByName('language') );
	config.browserLanguage = superLang( navigator.language || navigator.userLanguage );

	config.monthNames = i18n.gregLocal[config.languageParam] || i18n.gregLocal[config.browserLanguage] || i18n.gregLocal["en"]

	// Set Current Date
	const dateParam = getParameterByName('date');
	config.now = dateParam ? new Date(dateParam) : new Date();
	config.year = config.now.getFullYear();

	// Set Up Months
	config.months = config.monthNames.map(function( monthName, monthNumber )
	{
		const startDate = new Date(config.year, monthNumber)
		const nextMonth = new Date(config.year, monthNumber + 1)
		const endDate   = new Date(nextMonth - 1000)

		return { "name": monthName, "code": config.monthCodes[monthNumber], "startDate": startDate, "endDate": endDate }
	})

	// Set Up Days
	for (let date = new Date(config.year,0); date.getFullYear() <= config.year; d = incrementDay(date))
	{
		const day = {
			date:    new Date(date),
			first:   date.getDate() == 1,
			weekend: isWeekend(date)
		}

		config.days.push(day)
	}

	// Theming:
	styleElement_base = document.getElementById('stylesheet-style');
	styleElement_theme = document.getElementById('stylesheet-theme');
	styleElement_style = document.getElementById('stylesheet-style');	// I know this is confusing, will try to find a better name

	theme.name = getParameterByName('theme');
	if (!theme.name) theme.name = config.defaultTheme;

	theme.style = getParameterByName('style');
	theme.configUrl = `theme/${theme.name}/config.js`;
	theme.scriptUrl = `theme/${theme.name}/yearclock.js`;

	setThemeConfig(theme.name);
	// We're async at this point, so the rest is in callbacks:
	// load the config, wait for the callback
	// load the theme script, wait for the callback
	// when the theme script arrives, call theme.drawClock.

} // setup




/* setThemeConfig
*/
function setThemeConfig(themeName){
	// theme.description and them.base are now set

	if (theme.base) {
		console.log(`theme.base: ${theme.base}`);

		//load the base resources
		//load the theme resources
	}
	else {
		console.log('no theme.base set');
		//just load the theme resources
	}

	replaceScript('script-themeConfig', theme.configUrl, onloadThemeConfig);
}


function onloadThemeConfig(){
	console.log('onloadThemeConfig');

	setThemeStylesheets();
	replaceScript('script-theme', theme.scriptUrl, onloadThemeScript);
}

function onloadThemeScript(){
	console.log('onloadThemeScript');
	theme.drawClock();
}



/* setThemeStyleSheets
*/
function setThemeStylesheets(){

	if (theme.base) {
		let cssUrl_base = `theme/${theme.base}/style.css`;
		styleElement_base.setAttribute('href', cssUrl_base);
	}
	else {
		styleElement_base.removeAttribute('href');
	}

	let cssUrl_theme = `theme/${theme.name}/style.css`;
	styleElement_theme.setAttribute('href', cssUrl_theme);

	if (theme.style) {
		let cssUrl_style = `theme/${theme.name}/style-${theme.style}.css`;
		styleElement_style.setAttribute('href', cssUrl_style);
	}
	else {
		styleElement_style.removeAttribute('href');
	}
}





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

	//console.log(`replaceScript: ${id} ${scriptUrl} ${callback}`);
	let scriptElement = document.createElement('script');

	scriptElement.setAttribute('id', id);

	scriptElement.setAttribute('src', scriptUrl);
	scriptElement.setAttribute('name', 'appendScript');
	scriptElement.addEventListener('load', callback);

	// then bind the event to the callback function
	// there are several events for cross browser compatibility
	//script.onreadystatechange = callback;
	document.getElementById(id).remove();
	document.getElementsByTagName('head')[0].appendChild(scriptElement);
}


