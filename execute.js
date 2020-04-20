const { log } = require('colorful-logging');
const baseDEBUG = require('./DEBUG');
const executableHandler = require('./executableHandler');
const getCacheFilepath = require('./getCacheFilepath');
const wasmHandler = require('./wasmHandler');

module.exports = (args) => {
  const DEBUG = args.DEBUG || baseDEBUG;

  const countAllVisits = args.countAllVisits;
  const inputFilepath = args.inputFilepath;
  const isCaching = args.isCaching || !args.outputFilepath;
  const outputFilepath = isCaching ?
    getCacheFilepath(args.inputFilepath) :
    args.outputFilepath;

  if (outputFilepath === inputFilepath) {
    throw new Error('Output filepath was the same as input filepath. Aborting to prevent any potential data loss.')
  }

  const verbose = args.verbose;
  const wasm = args.wasm;

  const fullArgs = {
    countAllVisits,
    inputFilepath,
    isCaching,
    outputFilepath,
    verbose,
    DEBUG,
  };

  if (wasm) {
    DEBUG && log('inklecate-node is in wasm mode and is using the experimental WebAssembly inklecate.');

    return wasmHandler(fullArgs);
  }


  DEBUG && log('inklecate-node is using an executable inklecate.');

  return executableHandler(fullArgs);
};
