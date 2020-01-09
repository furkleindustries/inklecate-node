const baseDEBUG = require('./DEBUG');

const getCacheFilepath = require('./getCacheFilepath');

module.exports = (args) => {
  const DEBUG = args.DEBUG || baseDEBUG;

  const inputFilepath = args.inputFilepath;
  const isCaching = args.isCaching;
  const outputFilepath = isCaching ?
    getCacheFilepath(args.inputFilepath) :
    args.outputFilepath;

  const isPlaying = args.isPlaying;
  const keepRunning = args.keepRunning;
  const verbose = args.verbose;
  const wasm = args.wasm;

  const fullArgs = {
    inputFilepath,
    isCaching,
    isPlaying,
    keepRunning,
    outputFilepath,
    verbose,
    DEBUG,
  };

  if (wasm) {
    return wasmHandler(fullArgs);
  }

  return executableHandler(fullArgs);
};
