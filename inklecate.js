const execute = require('./execute');
const glob = require('glob');
const {
  relative,
} = require('path');

module.exports = function inklecate(args) {
  return new Promise(function cb(resolve, reject) {
    if (!args) {
      return reject('No args provided to inklecate method.');
    }

    const argsGlob = args.glob;
    const isPlaying = args.isPlaying;
    const hasOutputArg = Boolean(args.outputFilepath);
    const isOutputting = !isPlaying || hasOutputArg;
    const outputFilepath = relative(process.cwd(), args.outputFilepath || '');
    const isCaching = isOutputting && !hasOutputArg;
    const keepRunning = args.keepRunning;
    const verbose = args.verbose;
    const DEBUG = args.DEBUG;

    let inputFilepaths;
    if (typeof args === 'string') {
      inputFilepaths = [ args ];
    } else if (typeof args.inputFilepaths === 'string') {
      inputFilepaths = [ args.inputFilepaths ];
    } else if (Array.isArray(args.inputFilepaths)) {
      inputFilepaths = args.inputFilepaths;
    } else if (typeof args.inputFilepath === 'string') {
      inputFilepaths = [ args.inputFilepath ];
    } else if (Array.isArray(args.inputFilepath)) {
      inputFilepaths = args.inputFilepath;
    }

    if (!inputFilepaths || !inputFilepaths.length) {
      return reject('No input filepaths provided to inklecate-node\'s ' +
                    'inklecate method.');
    }

    inputFilepaths = inputFilepaths.map(function map(filepath) {
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

    Promise.all(inputFilepaths.map(function map(inputFilepath) {
      return new Promise(function cb(resolve, reject) {    
        if (argsGlob) {
          glob(inputFilepath, function cb(err, matches) {
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
    })).then(function resolved(data) {
      return resolve(data.length > 1 ? data : data[0]);
    }, reject);
  })
};
