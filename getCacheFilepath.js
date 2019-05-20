const {
  join,
} = require('path');
const uuid = require('uuid/v4');

const cacheDir = join(__dirname, 'cache');
const cacheId = uuid();
const cacheFileName = join(cacheDir, `${cacheId}.json`);

module.exports = function getCacheFilePath() {
  return cacheFileName;
}
