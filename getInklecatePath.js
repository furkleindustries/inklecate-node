const getBinDir = require('./getBinDir');
const {
  join,
} = require('path');

module.exports = () => (
  process.platform === 'darwin' ?
    join(getBinDir(), 'inklecate') :
    join(getBinDir(), 'inklecate.exe')
);
