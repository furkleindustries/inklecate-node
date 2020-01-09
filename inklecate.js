// const { spawn } = require('child_process');
// const { log } = require('colorful-logging');
const execute = require('./execute');
// const getInklecatePath = require('./getInklecatePath');
const glob = require('glob');
const { relative } = require('path');

module.exports = (args) => new Promise((resolve, reject) => {
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
  const noWasm = args.noWasm;
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

  if (isPlaying) {
    throw new Error('Not implemented yet.');
    /*if (inputFilepaths.length > 1) {
      return reject('Only one filepath can be used for playing a file.');
    }

    return new Promise((resolve, reject) => spawn(
        `${getInklecatePath()}`,
        [
          '-p',
          resolve(process.cwd(), inputFilepaths[0]),
        ],
        { shell: true },
      )
        .on('message', log)
        .on('error', reject)
        .on('close', (code) => code ? reject(code) : resolve())
    );*/
  }

  inputFilepaths = inputFilepaths.map((filepath) => (
    relative(process.cwd(), filepath)
  ));

  const executeArgs = {
    isCaching,
    isPlaying,
    keepRunning,
    noWasm,
    outputFilepath,
    verbose,
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

        Promise.all(proms).then(resolve, reject);
      });
    } else {
      execute({
        ...executeArgs,
        inputFilepath,
      }).then(resolve, reject);
    }
  }))).then((data) => resolve(data.length === 1 ? data[0] : data));
});
