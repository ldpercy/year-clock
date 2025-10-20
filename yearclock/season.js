



function getSeason(date, seasonArray) {
	result = seasonArray.find(
		(season) => date.isInRange(season.dateRange)
	);
	return result;
}

