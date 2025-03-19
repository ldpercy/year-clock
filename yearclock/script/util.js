/*
	Util
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


/* setTheme
*/
function setTheme(themeName){
	styleUrl = `theme/${themeName}/style.css`;
	themeStyleElement.setAttribute('href',styleUrl);
}

