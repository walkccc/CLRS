'use strict';

const path = require('path');
const parser = require('mri');

module.exports = function(argv, options) {
  // Override default option values
  Object.assign(this.config, options);

  if (Array.isArray(this.config.mainColor)) {
    for (const item in this.config.mainColor) {
      if (!{}.hasOwnProperty.call(this.config.mainColor, item)) {
        continue;
      }

      // Chain all colors to our print method
      this.printMainColor = this.printMainColor[this.config.mainColor[item]];
    }
  } else {
    this.printMainColor = this.printMainColor[this.config.mainColor];
  }

  if (Array.isArray(this.config.subColor)) {
    for (const item in this.config.subColor) {
      if (!{}.hasOwnProperty.call(this.config.subColor, item)) {
        continue;
      }

      // Chain all colors to our print method
      this.printSubColor = this.printSubColor[this.config.subColor[item]];
    }
  } else {
    this.printSubColor = this.printSubColor[this.config.subColor];
  }

  if (this.config.help) {
    // Register default options and commands
    this.option('help', 'Output usage information');
    this.command('help', 'Display help', this.showHelp);
  }

  // Parse arguments using mri
  this.raw = parser(argv.slice(1), this.config.mri || this.config.minimist);
  this.binary = path.basename(this.raw._[0]);

  // If default version is allowed, check for it
  if (this.config.version) {
    this.checkVersion(this.parent);
  }

  const subCommand = this.raw._[1];
  const helpTriggered = this.raw.h || this.raw.help;

  const args = {};
  const defined = this.isDefined(subCommand, 'commands');
  const optionList = this.getOptions(defined);

  Object.assign(args, this.raw);
  args._.shift();

  // Export sub arguments of command
  this.sub = args._;

  // If sub command is defined, run it
  if (defined) {
    this.runCommand(defined, optionList);
    return {};
  }

  // Show usage information if "help" or "h" option was used
  // And respect the option related to it
  if (this.config.help && helpTriggered) {
    this.showHelp();
  }

  // Hand back list of options
  return optionList;
};
