// operations are in charge of checking for if an object has the correct options
const operations = {
	'COUNT': (data, opts) => {
		if (!opts.sign) {
			return null;
		}

		if (!opts.value) {
			return null;
		}

		const arrayLength = data.size;
		const sign = opts.sign;
		
		switch(sign) {
			case '=':
				return arrayLength == opts.value;
			case '!=':
				return arrayLength != opts.value;
			case '>':
				return arrayLength > opts.value;
			case '<':
				return arrayLength < opts.value;
			case '>=':
				return arrayLength >= opts.value;
			case '<=':
				return arrayLength <= opts.value;
		}
	}, 'EXISTS': (data, opts) => {
		return data.size > 0;
	}
};

module.exports.operations = operations;
module.exports.VALUES = Object.keys(operations);
