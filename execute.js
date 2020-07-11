const log = console.log;
const baseDEBUG = require('./DEBUG');
const executableHandler = require('./executableHandler');
const getCacheFilepath = require('./getCacheFilepath');

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

  const fullArgs = {
    countAllVisits,
    inputFilepath,
    isCaching,
    outputFilepath,
    verbose,
    DEBUG,
  };

  DEBUG && log('inklecate-node is using an executable inklecate.', fullArgs);

  return executableHandler(fullArgs);
};
