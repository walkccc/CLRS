'use strict';

const spawn = require('child_process').spawn;
const path = require('path');
const camelcase = require('camelcase');
const stringSimilarity = require('string-similarity');

module.exports = {
  handleType(value) {
    let type = value;
    if (typeof value !== 'function') {
      type = value.constructor;
    }

    // Depending on the type of the default value,
    // select a default initializer function
    switch (type) {
      case String:
        return ['[value]'];
      case Array:
        return ['<list>'];
      case Number:
      case parseInt:
        return ['<n>', parseInt];
      default:
        return [''];
    }
  },

  readOption(option) {
    let value = option.defaultValue;
    const contents = {};

    // If option has been used, get its value
    for (const name of option.usage) {
      const fromArgs = this.raw[name];
      if (typeof fromArgs !== 'undefined') {
        value = fromArgs;
      }
    }

    // Process the option's value
    for (let name of option.usage) {
      let propVal = value;

      // Convert the value to an array when the option is called just once
      if (
        Array.isArray(option.defaultValue) &&
        typeof propVal !== typeof option.defaultValue
      ) {
        propVal = [propVal];
      }

      if (
        typeof option.defaultValue !== 'undefined' &&
        typeof propVal !== typeof option.defaultValue
      ) {
        propVal = option.defaultValue;
      }

      let condition = true;

      if (option.init) {
        // Only use the toString initializer if value is a number
        if (option.init === toString) {
          condition = propVal.constructor === Number;
        }

        if (condition) {
          // Pass it through the initializer
          propVal = option.init(propVal);
        }
      }

      // Camelcase option name (skip short flag)
      if (name.length > 1) {
        name = camelcase(name);
      }

      // Add option to list
      contents[name] = propVal;
    }

    return contents;
  },

  getOptions(definedSubcommand) {
    const options = {};
    const args = {};

    // Copy over the arguments
    Object.assign(args, this.raw);
    delete args._;

    // Set option defaults
    for (const option of this.details.options) {
      if (typeof option.defaultValue === 'undefined') {
        continue;
      }

      Object.assign(options, this.readOption(option));
    }

    // Override defaults if used in command line
    for (const option in args) {
      if (!{}.hasOwnProperty.call(args, option)) {
        continue;
      }

      const related = this.isDefined(option, 'options');

      if (related) {
        const details = this.readOption(related);
        Object.assign(options, details);
      }

      if (!related && !definedSubcommand) {
        // Unknown Option
        const availableOptions = [];
        this.details.options.forEach(opt => {
          availableOptions.push.apply(availableOptions, opt.usage);
        });

        const suggestOption = stringSimilarity.findBestMatch(
          option,
          availableOptions
        );

        process.stdout.write(`The option "${option}" is unknown.`);

        if (suggestOption.bestMatch.rating >= 0.5) {
          process.stdout.write(' Did you mean the following one?\n');

          const suggestion = this.details.options.filter(item => {
            for (const flag of item.usage) {
              if (flag === suggestOption.bestMatch.target) {
                return true;
              }
            }

            return false;
          });

          process.stdout.write(
            this.generateDetails(suggestion)[0].trim() + '\n'
          );

          // eslint-disable-next-line unicorn/no-process-exit
          process.exit();
        } else {
          process.stdout.write(` Here's a list of all available options: \n`);
          this.showHelp();
        }
      }
    }

    return options;
  },

  generateExamples() {
    const examples = this.details.examples;
    const parts = [];

    for (const item in examples) {
      if (!{}.hasOwnProperty.call(examples, item)) {
        continue;
      }
      const usage = this.printSubColor('$ ' + examples[item].usage);
      const description = this.printMainColor(
        '- ' + examples[item].description
      );
      parts.push(`  ${description}\n\n    ${usage}\n\n`);
    }

    return parts;
  },

  generateDetails(kind) {
    // Get all properties of kind from global scope
    const items = typeof kind === 'string' ? this.details[kind] : kind;
    const parts = [];
    const isCmd = kind === 'commands';

    // Sort items alphabetically
    items.sort((a, b) => {
      const first = isCmd ? a.usage : a.usage[1];
      const second = isCmd ? b.usage : b.usage[1];

      switch (true) {
        case first < second:
          return -1;
        case first > second:
          return 1;
        default:
          return 0;
      }
    });

    for (const item in items) {
      if (!{}.hasOwnProperty.call(items, item)) {
        continue;
      }

      let usage = items[item].usage;
      let initial = items[item].defaultValue;

      // If usage is an array, show its contents
      if (usage.constructor === Array) {
        if (isCmd) {
          usage = usage.join(', ');
        } else {
          const isVersion = usage.indexOf('v');
          usage = `-${usage[0]}, --${usage[1]}`;

          if (!initial) {
            initial = items[item].init;
          }

          usage +=
            initial && isVersion === -1
              ? ' ' + this.handleType(initial)[0]
              : '';
        }
      }

      // Overwrite usage with readable syntax
      items[item].usage = usage;
    }

    // Find length of longest option or command
    // Before doing that, make a copy of the original array
    const longest = items.slice().sort((a, b) => {
      return b.usage.length - a.usage.length;
    })[0].usage.length;

    for (const item of items) {
      let usage = item.usage;
      let description = item.description;
      const defaultValue = item.defaultValue;
      const difference = longest - usage.length;

      // Compensate the difference to longest property with spaces
      usage += ' '.repeat(difference);

      // Add some space around it as well
      if (typeof defaultValue !== 'undefined') {
        if (typeof defaultValue === 'boolean') {
          description += ` (${defaultValue
            ? 'enabled'
            : 'disabled'} by default)`;
        } else {
          description += ` (defaults to ${JSON.stringify(defaultValue)})`;
        }
      }
      parts.push(
        '  ' +
          this.printMainColor(usage) +
          '  ' +
          this.printSubColor(description)
      );
    }

    return parts;
  },

  runCommand(details, options) {
    // If help is disabled, remove initializer
    if (details.usage === 'help' && !this.config.help) {
      details.init = false;
    }

    // If command has initializer, call it
    if (details.init) {
      const sub = [].concat(this.sub);
      sub.shift();

      return details.init.bind(this)(details.usage, sub, options);
    }

    // Generate full name of binary
    const subCommand = Array.isArray(details.usage)
      ? details.usage[0]
      : details.usage;
    let full = this.binary + '-' + subCommand;

    const args = process.argv;
    let i = 0;

    while (i < 3) {
      args.shift();
      i++;
    }

    if (process.platform === 'win32') {
      const binaryExt = path.extname(this.binary);
      const mainModule = process.env.APPVEYOR ? '_fixture' : process.mainModule.filename;

      full = `${mainModule}-${subCommand}`;

      if (path.extname(this.binary)) {
        full = `${mainModule.replace(binaryExt, '')}-${subCommand}${binaryExt}`;
      }
      // Run binary of sub command on windows
      args.unshift(full);
      this.child = spawn(process.execPath, args, {
        stdio: 'inherit'
      });
    } else {
      // Run binary of sub command
      this.child = spawn(full, args, {
        stdio: 'inherit'
      });
    }

    // Throw an error if something fails within that binary
    this.child.on('error', err => {
      throw err;
    });

    this.child.on('exit', (code, signal) => {
      process.on('exit', () => {
        this.child = null;
        if (signal) {
          process.kill(process.pid, signal);
        } else {
          process.exit(code);
        }
      });
    });

    // Proxy SIGINT to child process
    process.on('SIGINT', () => {
      if (this.child) {
        this.child.kill('SIGINT');
        this.child.kill('SIGTERM'); // If that didn't work, we're probably in an infinite loop, so make it die
      }
    });
  },

  checkVersion(parent) {
    // Load parent module
    try {
      const pkginfo = require('pkginfo');
      pkginfo(parent);
    } catch (err) {
      // Do nothing, but version could not be aquired
    }

    // And get its version property
    const version = parent.exports.version || '-/-';

    if (version) {
      // If it exists, register it as a default option
      this.option('version', 'Output the version number');

      // And immediately output it if used in command line
      if (this.raw.v || this.raw.version) {
        console.log(version);

        // eslint-disable-next-line unicorn/no-process-exit
        process.exit();
      }
    }
  },

  isDefined(name, list) {
    // Get all items of kind
    const children = this.details[list];

    // Check if a child matches the requested name
    for (const child of children) {
      const usage = child.usage;
      const type = usage.constructor;

      if (type === Array && usage.indexOf(name) > -1) {
        return child;
      }

      if (type === String && usage === name) {
        return child;
      }
    }

    // If nothing matches, item is not defined
    return false;
  }
};
