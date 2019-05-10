#!/usr/bin/node

module.exports = {
  ArgsEnum: require('./ArgsEnum'),
  DEBUG: require('./DEBUG'),
  getBinDir: require('./getBinDir'),
  getCacheFilepath: require('./getCacheFilepath'),
  getInklecatePath: require('./getInklecatePath'),
  inklecate: require('./inklecate'),
};

if (process.argv.length > 1) {
  require('./cli');
}
