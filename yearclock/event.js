
function getYearEvent(date) {

	const key = isoMonthDay(date);

	const yearEvent = {
		'01-01' : { symbol:'🌅', name: "New Year's Day" },
		'02-14' : { symbol:'💘', name: "Valentines day" },
		'10-31' : { symbol:'🎃', name: "Halloween" },
		'12-24' : { symbol:'🎅', name: 'Christmas Eve' },
		'12-25' : { symbol:'🎄', name: 'Christmas Day' },
		'12-26' : { symbol:'🥊', name: 'Boxing Day' },
		'12-31' : { symbol:'🎇', name: "New Year's Eve" }, // 🎇🎆
	};

	return yearEvent[key];

}/* yearEvent */

function getWeekEvent(date) {
	const key = date.getDay();
	const weekEvent = {
		1 : { symbol:'🌚', name: "" },
		2 : { symbol:'', name: "" },
		3 : { symbol:'🐪', name: "Hump day" },
		4 : { symbol:'', name: '' },
		5 : { symbol:'🍺', name: '' },
		6 : { symbol:'🏖️', name: '' },
		7 : { symbol:'🌞', name: "" },
	};

	return weekEvent[key];

}


function getMonthEvent(date) {
	const key = date.getDate();
	const monthEvent = {
		1 : { symbol:'🥇', name: "" },
		2 : { symbol:'🥈', name: "" },
		3 : { symbol:'🥉', name: "" },
	};

	let result = monthEvent[key]

	if (isLastDayOfMonth(date)) {
		result = { symbol:'🔚', name: "" };
	}

	return result;
}


function getCustomEvent(date) {

	const key = isoMonthDay(date);

	const customEvent = {
		'03-14' : { symbol:'🥧', name: "Pi day" },
		'05-04' : { symbol:'¼', name: "May the Fourth be with you" },
	};

	return customEvent[key];
}


function getSeasonEvent(seasonId) {

	const seasonEvent = {
		'autumn' : { symbol:'🍂', name: "Autumn" },
		'winter' : { symbol:'🥶', name: "Winter" },
		'spring' : { symbol:'🌱', name: "Spring" },
		'summer' : { symbol:'🌞', name: "Summer" },
	}

	return seasonEvent[seasonId];
}
