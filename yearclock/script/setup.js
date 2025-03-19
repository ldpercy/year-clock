/* Setup
*/

console.clear()

const config = {
	clockRadius : 1200,
	monthCodes : [ "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec" ],
	days : [],
	defaultTheme: 'brice',
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

	let themeName = getParameterByName('theme');
	let styleName = getParameterByName('style');

	if (!themeName) themeName = config.defaultTheme;

	setTheme(themeName,styleName);

} // setup


/* setTheme
*/
function setTheme(themeName, styleName){
	let cssUrl_theme = `theme/${themeName}/style.css`;
	styleElement_theme.setAttribute('href',cssUrl_theme);

	if (styleName) {
		let cssUrl_style = `theme/${themeName}/style-${styleName}.css`;
		styleElement_style.setAttribute('href', cssUrl_style);
	}
	else {
		styleElement_style.removeAttribute('href');
	}
}



/* Utilities
*/

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
