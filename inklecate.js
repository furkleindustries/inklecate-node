const execute = require('./execute');
const { relative } = require('path');

module.exports = (args) => new Promise((resolve, reject) => {
  if (!args) {
    return reject('No args provided to inklecate method.');
  }

  const countAllVisits = Boolean(args.countAllVisits);
  const outputFilepath = args.outputFilepath ?
    relative(process.cwd(), args.outputFilepath) :
    null;

  const isCaching = Boolean(!outputFilepath);
  const verbose = Boolean(args.verbose);
  const DEBUG = Boolean(args.DEBUG);

  const inputFilepath = relative(process.cwd(), args.inputFilepath);

  if (!inputFilepath) {
    return reject('No input filepath provided to inklecate-node\'s ' +
                  'inklecate method.');
  }

  const executeArgs = {
    countAllVisits,
    isCaching,
    outputFilepath,
    verbose,
    DEBUG,
  };

  return execute({
    ...executeArgs,
    inputFilepath,
  }).then(resolve, reject);
});
