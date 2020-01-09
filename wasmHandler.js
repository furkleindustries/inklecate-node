const ArgsEnum = require('./ArgsEnum');
const {
  error,
  log,
} = require('colorful-logging');
const finish = require('./finish');
const {
  readFile,
  writeFile,
} = require('fs-extra');
const quit = require('./quit');
const { initializeMonoEnvironment } = require('inklecate-wasm');

module.exports = async (args) => {
  const {
    inputFilepath,
    isCaching,
    isPlaying,
    outputFilepath,
  } = args;

  const readProm = readFile(inputFilepath);
  const compileProm = initializeMonoEnvironment();

  const [
    ink,
    compile,
  ] = await Promise.all([
    readProm,
    compileProm,
  ]);

  const json = compile(ink);
  await writeFile(json, outputFilepath);

  const finishArgs = {
    inputFilepath,
    isCaching,
    isPlaying,
    outputFilepath,
  };

  finish(finishArgs).then(resolve, reject);
};

