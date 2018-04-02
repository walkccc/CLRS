# check-updates

This package makes it very easy to implement update notifications into ZEIT packages:

<img width="900" alt="screen shot 2018-01-12 at 15 01 33" src="https://user-images.githubusercontent.com/6170607/34878177-8b2aa826-f7a9-11e7-90df-2c3c7f02a774.png">

## Usage

Firstly, install the package:

```bash
npm install @zeit/check-updates
```

Next, initialize it:

```js
const pkg = require('./package')
const updateNotifier = require('@zeit/check-updates')

updateNotifier(pkg, 'Project Name')
```

You can even pass a millisecond interval for the cache (a day by default):

```js
updateNotifier(pkg, 'Project Name', 80000)
```

## Contributing

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device
2. Link the package to the global module directory: `npm link`
3. Within the module you want to test your local development instance of the package, just link it: `npm link @zeit/check-updates`. Instead of the default one from npm, node will now use your clone.

## Author

Leo Lamprecht ([@notquiteleo](https://twitter.com/notquiteleo)) - [ZEIT](https://zeit.co)
