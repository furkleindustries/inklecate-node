const { log } = require('colorful-logging');
const baseDEBUG = require('./DEBUG');
const executableHandler = require('./executableHandler');
const getCacheFilepath = require('./getCacheFilepath');
const wasmHandler = require('./wasmHandler');

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
  const noWasm = args.noWasm;

  const fullArgs = {
    inputFilepath,
    isCaching,
    isPlaying,
    keepRunning,
    outputFilepath,
    verbose,
    DEBUG,
  };

  if (noWasm) {
    DEBUG && log('inklecate-node is in noWasm mode and is using an executable inklecate.');
    return executableHandler(fullArgs);
  }

  DEBUG && log('inklecate-node is in wasm mode and is using a WebAssembly inklecate.');

  return wasmHandler(fullArgs);
};
