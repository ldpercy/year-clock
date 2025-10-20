



function getSeason(date, seasonArray) {
	result = seasonArray.find(
		(season) => dateIsInRange(date, season.dateRange)
	);
	return result;
}

