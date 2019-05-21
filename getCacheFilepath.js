const {
  join,
} = require('path');
const uuid5 = require('uuid/v5');

const cacheDir = join(__dirname, 'cache');

module.exports = function getCacheFilePath(filepath) {
  const cacheId = uuid5(filepath, uuid5.URL);
  return join(cacheDir, `${cacheId}.json`);
};
