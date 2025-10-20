



function getSeason(date, seasonArray) {
	result = seasonArray.find(
		(season) => yearclock.Date.isInRange(date, season.dateRange)
	);
	return result;
}

