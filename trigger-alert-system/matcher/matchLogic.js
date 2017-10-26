// operations are in charge of checking for if an object has the correct options
const operations = {
	'COUNT': (data, value, opts) => {
		if (!opts.sign) {
			return null;
		}

		const arrayLength = data.size;
		const sign = opts.sign;
		
		switch(sign) {
			case '=':
				return arrayLength == value;
			case '!=':
				return arrayLength != value;
			case '>':
				return arrayLength > value;
			case '<':
				return arrayLength < value;
			case '>=':
				return arrayLength >= value;
			case '<=':
				return arrayLength <= value;
		}
	}
};

module.exports.operations = operations;
module.exports.VALUES = Object.keys(operations);
