const DEBUG = false;

module.exports = (
  DEBUG || process.env.DEBUG || process.env.NODE_ENV === 'development'
);
