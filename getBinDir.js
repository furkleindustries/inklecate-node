const {
  join,
} = require('path');

module.exports = function getBinDir() {
  return join(__dirname, 'bin');
};
