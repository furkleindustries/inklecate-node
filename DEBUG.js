const FORCE_DEBUG = false;

module.exports = FORCE_DEBUG || process.env.DEBUG;
