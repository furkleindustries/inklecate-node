const {
  join,
} = require('path');
const uuid5 = require('uuid/v5');

const cacheDir = join(__dirname, 'cache');

module.exports = function getCacheFilePath(absolutePath) {
  const cacheId = uuid5(absolutePath, uuid5.URL);
  return join(cacheDir, `${cacheId}.json`);
};
