const baseDEBUG = require('./DEBUG');

const ArgsEnum = require('./ArgsEnum');
const {
  spawn,
} = require('child_process');
const {
  log,
} = require('colorful-logging');
const quit = require('./quit');
const finish = require('./finish');
const getCacheFilepath = require('./getCacheFilepath');
const getInklecatePath = require('./getInklecatePath');
const {
  relative,
} = require('path');
const {
  assertValid,
} = require('ts-assertions');

module.exports = function inklecate(args) {
  const safeArgs = Array.prototype.slice.call(assertValid(
    args,
    'The args argument was not an array with a filepath.',
    function (args) {
      return Array.isArray(args) && args.length;
    },
  ));

  const DEBUG = safeArgs.indexOf('DEBUG') > -1 || baseDEBUG;

  const isPlaying = safeArgs.indexOf(ArgsEnum.Play) !== -1;
  const re = new RegExp(`^${ArgsEnum.OutputFile} (.+)$`);
  const outputArg = safeArgs.find(re.test.bind(re));
  const isOutputting = !isPlaying || hasOutputArg;
  const hasOutputArg = Boolean(outputArg);
  const isCaching = isOutputting && !hasOutputArg;

  const outputFilepathRaw =
    outputArg && typeof outputArg.match === 'function' ?
      outputArg.match(re)[1] :
      getCacheFilepath();

  const outputFilepath = relative(process.cwd(), outputFilepathRaw);

  const inputFilepathRaw = safeArgs.splice(safeArgs.length - 1, 1)[0];
  const inputFilepath = relative(process.cwd(), inputFilepathRaw);
  const outputArgIndex = safeArgs.indexOf(outputArg);
  safeArgs.splice(outputArgIndex, 1);

  safeArgs.splice(
    safeArgs.length,
    0,
    '-o',
    outputFilepath,
  );

  safeArgs.splice(
    safeArgs.length,
    0,
    inputFilepath,
  );

  return new Promise(function cb(resolve, reject) {
    const proc = spawn(getInklecatePath(), safeArgs);

    const rejector = quit.bind(null, reject);

    proc.stdout.on('readable', function cb() {
      const readout = proc.stdout.read();
      if (readout) {
        DEBUG && log('inklecate has emitted a message:');
        log(String(readout));
      }
    });

    proc.on('error', function cb(err) {
      DEBUG && error('The inklecate-node package has encountered an error.');
      rejector(err);
    });

    DEBUG && proc.on('message', function cb(msg) {
      log(`inklecate has a message: ${msg}`);
    });

    proc.stderr.on('data', function cb(err) {
      DEBUG && error('The inklecate-node package has encountered a stderr issue.');
      rejector(err);
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

      finish(Object.assign({
        inputFilepath,
        isCaching,
        isPlaying,
        outputFilepath,
        reject,
        resolve,
      }, isPlaying ? {} : { compilerOutput: chunks }));
    });
  });
};
