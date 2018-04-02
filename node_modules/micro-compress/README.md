# micro-compress

[![Build status][travis-image]][travis-url] [![NPM version][npm-image]][npm-url] [![XO code style][codestyle-image]][codestyle-url]

> Compression for HTTP microservices built with [Micro](https://github.com/zeit/micro)

## Installation

Install `micro-compress` using [npm](https://www.npmjs.com/):

```bash
npm install --save micro-compress
```

## Usage

### Module usage

Just wrap your [Micro](https://github.com/zeit/micro) HTTP microservice with this module:

```javascript
const {send, json} = require('micro');
const compress = require('micro-compress');

module.exports = compress(async (req, res) => {
	const body = await json(req);
	send(res, 200, body);
});
```

Options for the [`compression`](https://github.com/expressjs/compression) module are passed as the first parameter:

```javascript
const {Z_BEST_COMPRESSION} = require('zlib');
const {send, json} = require('micro');
const compress = require('micro-compress');

module.exports = compress({level: Z_BEST_COMPRESSION}, async (req, res) => {
 const body = await json(req);
 send(res, 200, body);
});
```

## API

### `compress(opts, fn)`

| Name | Type | Description |
|------|------|-------------|
| opts | `object` | Optional. Options passed to [`compression`](https://github.com/expressjs/compression) |
| fn | `function` | The request handler to wrap |

For available options see [`compression`'s options](https://github.com/expressjs/compression#options).

## License

MIT © [Joakim Carlstein](http://joakim.beng.se)

[npm-url]: https://npmjs.org/package/micro-compress
[npm-image]: https://badge.fury.io/js/micro-compress.svg
[travis-url]: https://travis-ci.org/joakimbeng/micro-compress
[travis-image]: https://travis-ci.org/joakimbeng/micro-compress.svg?branch=master
[codestyle-url]: https://github.com/sindresorhus/xo
[codestyle-image]: https://img.shields.io/badge/code%20style-XO-5ed9c7.svg?style=flat
