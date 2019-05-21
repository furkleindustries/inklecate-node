const execute = require('./execute');
const glob = require('glob');
const {
  relative,
} = require('path');

module.exports = function inklecate(args) {
  const argsGlob = args.glob;
  const isPlaying = args.isPlaying;
  const hasOutputArg = Boolean(args.outputFilepath);
  const isOutputting = !isPlaying || hasOutputArg;
  const outputFilepath = relative(process.cwd(), args.outputFilepath || '');
  const isCaching = isOutputting && !hasOutputArg;
  const keepRunning = args.keepRunning;
  const verbose = args.verbose;
  const DEBUG = args.DEBUG;

  const inputFilepaths = args.inputFilepaths.map(function map(filepath) {
    return relative(process.cwd(), filepath);
  });

  const executeArgs = {
    isCaching,
    isPlaying,
    keepRunning,
    outputFilepath,
    verbose,
    DEBUG,
  };

  return Promise.all(inputFilepaths.map(function map(inputFilepath) {
    return new Promise(function cb(resolve, reject) {    
      if (argsGlob) {
        glob(filepath, function cb(err, matches) {
          if (err) {
            return reject(err);
          }

          Promise.all(matches.map(function map(inputFilepath) {
            return execute(Object.assign({}, executeArgs, { inputFilepath }));
          })).then(resolve, reject);
        });
      } else {
        execute(Object.assign({}, executeArgs, { inputFilepath })).then(
          resolve,
          reject,
        );
      }
    });
  }));
};
