const ArgsEnum = require('./ArgsEnum');
const {
  spawn,
} = require('child_process');
const {
  error,
  log,
} = require('colorful-logging');
const finish = require('./finish');
const getInklecatePath = require('./getInklecatePath');
const quit = require('./quit');

module.exports = function executableHandler(args) {
  const proc = spawn(getInklecatePath(), [
    isPlaying ? ArgsEnum.Play : null,
    keepRunning ? ArgsEnum.KeepRunning : null,
    verbose ? ArgsEnum.Verbose : null,
    isPlaying ? null : ArgsEnum.OutputFile,
    isPlaying ? null : outputFilepath,
    inputFilepath,
  ].filter(Boolean));

  /* Inklecate seems in some or all cases to send its error messages over
   * stdout, so if we encounter an error code on process exit, we need to make
   * reference to the message. Without this, consumers of inklecate (and
   * inklecate-loader) would not receive error messages at all. */
  let maybeLastError = '';

  return new Promise(function cb(resolve, reject) {
    const rejector = quit.bind(null, reject);

    proc.stdout.on('readable', function cb() {
      const readout = proc.stdout.read();
      if (readout) {
        DEBUG && log('inklecate has emitted a readable event through stdout:');
        log((readout || '').toString().trim());
        maybeLastError = readout;
      }
    });

    proc.stderr.on('data', function cb(err) {
      error(err);
      DEBUG && error('inklecate has emited a data event through stderr:');
      return rejector(err);
    });

    proc.stderr.on('error', function cb(err) {
      error(err);
      DEBUG && error('inklecate has emitted an error event through stderr:');
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
        return reject(new Error(
          `${maybeLastError || ''}\n` +
          `inklecate exited with code ${code}` +
            `${signal ? ` and signal ${signal}` : ''}.`,
        ));
      }

      const finishArgs = Object.assign(
        {
          inputFilepath,
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
