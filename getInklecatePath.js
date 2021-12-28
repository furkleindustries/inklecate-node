const getBinDir = require('./getBinDir');
const {
  join,
} = require('path');

module.exports = () => (
  process.platform === 'win32' ?
    join(getBinDir(), 'inklecate.exe') :
    join(getBinDir(), 'inklecate')
);
