//
//	Localisation
//


export const month = {
	"en": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
	"es": ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
	"fr": ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
	"zh": ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
	"hi": ["जनवरी", "फ़रवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"],
	"ru": ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"],
	"ko": ["일월", "이월", "삼월", "사월", "오월", "유월", "칠월", "팔월", "구월", "시월", "십일월", "십이월"]
}


export function haveL10n(language) {
	return (!!this.month[language]); // sigh...
}


export function getMonthNames(language) {
	return this.month[language];
}


export function getLocaleLanguage(localeString) {
	return (localeString) ? localeString.slice(0, 2) : null;
}


/*
Language precedence - fall to next if unavailable/unsupported
1. url parameter
2. user agent language setting
3. yearclock default language
*/

export function getSupportedBrowserLanguage() {
	let result = this.getLocaleLanguage(navigator.language); // navigator.languages[0]
	result = (this.haveL10n(result)) ? result : null;
	return result;
}


export function getSupportedLanguage(locale) {
	let result = this.getLocaleLanguage(locale);
	result = (this.haveL10n(result)) ? result : null;
	return result;
}

