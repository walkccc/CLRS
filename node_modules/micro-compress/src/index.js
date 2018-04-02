'use strict';
const compression = require('compression');

module.exports = exports = function compress(opts, fn) {
	if (!fn) {
		fn = opts;
		opts = {};
	}
	const compressionHandler = compression(opts);
	return (req, res) => {
		return new Promise(resolve => compressionHandler(req, res, resolve))
			.then(() => fn(req, res));
	};
};
