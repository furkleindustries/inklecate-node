const DEBUG = true;

module.exports = DEBUG || process.env.NODE_ENV === 'development';
