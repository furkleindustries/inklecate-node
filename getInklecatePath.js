const getBinDir = require('./getBinDir');
const {
  join,
} = require('path');

module.exports = function getInklecatePath() {
  if (process.platform === 'darwin') {
    return join(getBinDir(), 'inklecate');
  }

  return join(getBinDir(), 'inklecate.exe');
};
