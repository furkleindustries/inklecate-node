#!/usr/bin/node

module.exports = {
  getBinDir: require('./getBinDir'),
  getInklecatePath: require('./getInklecatePath'),
  inklecate: require('./inklecate'),
};

if (process.argv.length > 1) {
  require('./cli');
}
