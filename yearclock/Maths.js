//
// Maths
//


export const TAU = 2 * Math.PI;


/* significantFigures
Returns a function that will call toPrecision with the supplied number of significant figures
*/
export function significantFigures(integer) {
	return (number) => { return number.toPrecision(integer) }
}


export function equalAtPrecision(precision, n1, n2) {
	return (n1.toPrecision(precision) === n2.toPrecision(precision))
}


export function asRomanNumerals(number) {
	let result = '';
	let value=number, divisor, remainder;
	const rn = [
		{ s: 'm',  v: 1000 },
		{ s: 'cm', v: 900  },
		{ s: 'd',  v: 500  },
		{ s: 'cd', v: 400  },
		{ s: 'c',  v: 100  },
		{ s: 'xc', v: 90   },
		{ s: 'l',  v: 50   },
		{ s: 'xl', v: 40   },
		{ s: 'x',  v: 10   },
		{ s: 'ix', v: 9    },
		{ s: 'v',  v: 5    },
		{ s: 'iv', v: 4    },
		{ s: 'i',  v: 1    },
	];

	for (var j = 0; j < rn.length; j++) {
		divisor = Math.floor(number/rn[j].v);
		result += rn[j].s.repeat(divisor);
		number = number - (divisor * rn[j].v);
		//log(rn[j], divisor,result,number);
	}

	return result
}

