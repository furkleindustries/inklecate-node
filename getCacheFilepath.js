const { join } = require('path');
const { v5 } = require('uuid');

const cacheDir = join(__dirname, 'cache');

module.exports = (filepath) => {
  return join(cacheDir, `${v5(filepath, v5.URL)}.json`)
};
