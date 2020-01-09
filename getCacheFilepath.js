const { join } = require('path');
const uuid5 = require('uuid/v5');

const cacheDir = join(__dirname, 'cache');

module.exports = (filepath) => (
  join(cacheDir, `${uuid5(filepath, uuid5.URL)}.json`)
);
