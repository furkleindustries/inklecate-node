const execute = require('./execute');
const glob = require('glob');
const { relative } = require('path');

module.exports = (args) => new Promise((resolve, reject) => {
  if (!args) {
    return reject('No args provided to inklecate method.');
  }

  const countAllVisits = Boolean(args.countAllVisits);
  const argsGlob = Boolean(args.glob);
  const outputFilepath = relative(process.cwd(), args.outputFilepath || '');
  const isCaching = Boolean(args.outputFilepath);
  const verbose = Boolean(args.verbose);
  const wasm = Boolean(args.wasm);
  const DEBUG = Boolean(args.DEBUG);

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

  inputFilepaths = inputFilepaths.map((filepath) => (
    relative(process.cwd(), filepath)
  ));

  const executeArgs = {
    countAllVisits,
    isCaching,
    outputFilepath,
    verbose,
    wasm,
    DEBUG,
  };

  Promise.all(inputFilepaths.map((inputFilepath) => new Promise((resolve, reject) => {    
    if (argsGlob) {
      glob(inputFilepath, (err, matches) => {
        if (err) {
          return reject(err);
        }

        const proms = matches.map((inputFilepath) => execute({
          ...executeArgs,
          inputFilepath,
        }));

        return Promise.all(proms).then(resolve, reject);
      });
    }

    return execute({
      ...executeArgs,
      inputFilepath,
    }).then(resolve, reject);
  }))).then((data) => resolve(data.length === 1 ? data[0] : data));
});
