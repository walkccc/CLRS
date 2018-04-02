'use strict';

const chalk = require('chalk');
const utils = require('./utils');

const publicMethods = {
  option: require('./option'),
  options: require('./options'),
  command: require('./command'),
  parse: require('./parse'),
  example: require('./example'),
  examples: require('./examples'),
  showHelp: require('./help')
};

function Args() {
  this.details = {
    options: [],
    commands: [],
    examples: []
  };

  // Configuration defaults
  this.config = {
    help: true,
    version: true,
    usageFilter: null,
    value: null,
    name: null,
    mainColor: 'yellow',
    subColor: 'dim'
  };

  this.printMainColor = chalk;
  this.printSubColor = chalk;

  this.parent = module.parent;
}

// Assign internal helpers
for (const util in utils) {
  if (!{}.hasOwnProperty.call(utils, util)) {
    continue;
  }

  Args.prototype[util] = utils[util];
}

// Assign public methods
for (const method in publicMethods) {
  if (!{}.hasOwnProperty.call(publicMethods, method)) {
    continue;
  }

  Args.prototype[method] = publicMethods[method];
}

module.exports = new Args();
