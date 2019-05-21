const baseDEBUG = require('./DEBUG');

const ArgsEnum = require('./ArgsEnum');
const {
  spawn,
} = require('child_process');
const {
  log,
} = require('colorful-logging');
const finish = require('./finish');
const getCacheFilepath = require('./getCacheFilepath');
const getInklecatePath = require('./getInklecatePath');
const quit = require('./quit');

module.exports = function execute(args) {
  const DEBUG = args.DEBUG || baseDEBUG;

  debugger;
  const inputFilepath = args.inputFilepath;
  const isCaching = args.isCaching;
  const outputFilepath = isCaching ?
    getCacheFilepath(inputFilepath) :
    args.outputFilepath;

  const isPlaying = args.isPlaying;
  const keepRunning = args.keepRunning;
  const verbose = args.verbose;

  const proc = spawn(getInklecatePath(), [
    isPlaying ? ArgsEnum.Play : null,
    keepRunning ? ArgsEnum.KeepRunning : null,
    verbose ? ArgsEnum.Verbose : null,
    isPlaying ? null : ArgsEnum.OutputFile,
    isPlaying ? null : outputFilepath,
    inputFilepath,
  ].filter(Boolean));

  return new Promise(function cb(resolve, reject) {
    const rejector = quit.bind(null, reject);

    proc.stdout.on('readable', function cb() {
      const readout = proc.stdout.read();
      if (readout) {
        DEBUG && log('inklecate has emitted a message:');
        log((readout || '').toString().trim());
      }
    });

    proc.on('error', function cb(err) {
      DEBUG && error('The inklecate-node package has encountered an error.');
      return rejector(err);
    });

    DEBUG && proc.on('message', function cb(msg) {
      log(`inklecate has a message: ${msg}`);
    });

    proc.stderr.on('data', function cb(err) {
      DEBUG && error('The inklecate-node package has encountered a stderr issue.');
      return rejector(err);
    });

    const chunks = [];
    proc.stdout.on('data', function cb(chunk) {
      const chunkStr = String(chunk);
      if (isPlaying) {
        playLine(chunkStr, stdin);
      } else {
        chunks.push(chunkStr);
      }
    });

    DEBUG && proc.stdout.on('end', function cb() {
      log('inklecate has closed its stdout channel.');
    });

    proc.on('exit', function cb(code, signal) {
      DEBUG && log('inklecate is done.');

      if (code > 0) {
        return rejector(
          `inklecate exited with code ${code}` +
            `${signal ? ` and signal ${signal}` : ''}.`,
        );
      }

      const finishArgs = Object.assign(
        {
          inputFilepath: inputFilepath,
          isCaching,
          isPlaying,
          outputFilepath,
        },
        isPlaying ? {} : { compilerOutput: chunks },
      );

      finish(finishArgs).then(resolve, reject);
    });
  });
};
