'use strict';

const EQQ = /\s|=/;
const FLAG = /^-{1,2}/;
const PREFIX = /^--no-/i;

function isBool(any) {
	return typeof any === 'boolean';
}

function toArr(any) {
	return Array.isArray(any) ? any : any == null ? [] : [any];
}

function toString(any) {
	return any == null || any === true ? '' : String(any);
}

function toBool(any) {
	return any === 'false' ? false : Boolean(any);
}

function toNum(any) {
	return (!isBool(any) && Number(any)) || any;
}

function getAlibi(names, arr) {
	if (arr.length === 0) return arr;
	let k, i = 0, len = arr.length, vals = [];
	for (; i < len; i++) {
		k = arr[i];
		vals.push(k);
		if (names[k] !== void 0) {
			vals = vals.concat(names[k]);
		}
	}
	return vals;
}

function typecast(key, val, strings, booleans) {
	if (strings.indexOf(key) !== -1) return toString(val);
	if (booleans.indexOf(key) !== -1) return toBool(val);
	return toNum(val);
}

module.exports = function(args, opts) {
	args = args || [];
	opts = opts || {};

	opts.string = toArr(opts.string);
	opts.boolean = toArr(opts.boolean);

	const aliases = {};
	let k, i, j, x, y, len, type;

	if (opts.alias !== void 0) {
		for (k in opts.alias) {
			aliases[k] = toArr(opts.alias[k]);
			len = aliases[k].length; // save length
			for (i = 0; i < len; i++) {
				x = aliases[k][i]; // alias's key name
				aliases[x] = [k]; // set initial array
				for (j = 0; j < len; j++) {
					if (x !== aliases[k][j]) {
						aliases[x].push(aliases[k][j]);
					}
				}
			}
		}
	}

	if (opts.default !== void 0) {
		for (k in opts.default) {
			type = typeof opts.default[k];
			opts[type] = (opts[type] || []).concat(k);
		}
	}

	// apply to all aliases
	opts.string = getAlibi(aliases, opts.string);
	opts.boolean = getAlibi(aliases, opts.boolean);

	let idx = 0;
	const out = { _: [] };

	while (args[idx] !== void 0) {
		let incr = 1;
		const val = args[idx];

		if (val === '--') {
			out._ = out._.concat(args.slice(idx + 1));
			break;
		} else if (!FLAG.test(val)) {
			out._.push(val);
		} else if (PREFIX.test(val)) {
			out[val.replace(PREFIX, '')] = false;
		} else {
			let tmp;
			const segs = val.split(EQQ);
			const isGroup = segs[0].charCodeAt(1) !== 45; // '-'

			const flag = segs[0].substr(isGroup ? 1 : 2);
			len = flag.length;
			const key = isGroup ? flag[len - 1] : flag;

			if (opts.unknown !== void 0 && aliases[key] === void 0) {
				return opts.unknown(segs[0]);
			}

			if (segs.length > 1) {
				tmp = segs[1];
			} else {
				tmp = args[idx + 1] || true;
				FLAG.test(tmp) ? (tmp = true) : (incr = 2);
			}

			if (isGroup && len > 1) {
				for (i = len - 1; i--; ) {
					k = flag[i]; // all but last key
					out[k] = typecast(k, true, opts.string, opts.boolean);
				}
			}

			const value = typecast(key, tmp, opts.string, opts.boolean);
			out[key] = out[key] !== void 0 ? toArr(out[key]).concat(value) : value;

			// handle discarded args when dealing with booleans
			if (isBool(value) && !isBool(tmp) && tmp !== 'true' && tmp !== 'false') {
				out._.push(tmp);
			}
		}

		idx += incr;
	}

	if (opts.default !== void 0) {
		for (k in opts.default) {
			if (out[k] === void 0) {
				out[k] = opts.default[k];
			}
		}
	}

	for (k in out) {
		if (aliases[k] === void 0) continue;
		y = out[k];
		len = aliases[k].length;
		for (i = 0; i < len; i++) {
			out[aliases[k][i]] = y; // assign value
		}
	}

	return out;
};
