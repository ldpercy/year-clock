
//
// Testing
//

yearclock.Test = class {

	static runTest(string) {
		let result = [];
		result.push(this.smokeTest(string));
		return result;
	}


	/* smokeTest
	*/
	static smokeTest(testString) {
		let result = [];
		const smokeString = ['NaN', 'undefined', 'null', 'Infinity', 'Object', 'Invalid'];

		smokeString.forEach(
			(string) => {
				const count = this.matchCount(testString, string);
				if (count) {
					const sr = {};
					sr[`${string}`] = count;
					result.push(sr);
				}
			}
		);
		return result;
	}


	static matchCount(string, regex) {
		const count  = string.matchAll(regex).toArray().length;
		return count;
	}

}/* yearclock.Test */