// Packages
const ms = require('ms')
const updateNotifier = require('update-notifier')
const chalk = require('chalk')

module.exports = (pkg, name, interval) => {
  // By default, we cache for one day
  const updateCheckInterval = interval ? ms(interval) : ms('1d')

  const { update } = updateNotifier({
    pkg,
    updateCheckInterval
  })

  if (!update) {
    return
  }

  const message = `The latest version of ${name} is ${chalk.bold(update.latest)}`
  console.log(`${chalk.white.bold.bgRed('UPDATE AVAILABLE')} ${message}`)

  if (pkg.name === 'now-cli') {
    const url = 'https://zeit.co/update-cli'
    console.log(`Read more here: ${url}`)
  }
}
