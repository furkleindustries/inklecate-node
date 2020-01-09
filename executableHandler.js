const ArgsEnum = require('./ArgsEnum');
const { spawn } = require('child_process');
const {
  error,
  log,
} = require('colorful-logging');
const DEBUG = require('./DEBUG');
const finish = require('./finish');
const { readFile } = require('fs-extra');
const getInklecatePath = require('./getInklecatePath');

module.exports = (args) => {
  const {
    inputFilepath,
    isCaching,
    isPlaying,
    keepRunning,
    outputFilepath,
    verbose,
  } = args;

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

  return new Promise((resolve, reject) => {
    proc.stdout.on('readable', () => {
      const readout = proc.stdout.read();
      if (readout) {
        DEBUG && log('inklecate has emitted a readable event through stdout:');
        log((readout || '').toString().trim());
        maybeLastError = readout;
      }
    });

    proc.stderr.on('data', (err) => {
      error(err);
      DEBUG && error('inklecate has emited a data event through stderr:');
      return reject(err);
    });

    proc.stderr.on('error', (err) => {
      error(err);
      DEBUG && error('inklecate has emitted an error event through stderr:');
      return reject(err);
    });

    const chunks = [];
    proc.stdout.on('data', (chunk) => {
      const chunkStr = String(chunk);
      if (isPlaying) {
        playLine(chunkStr, stdin);
      } else {
        chunks.push(chunkStr);
      }
    });

    DEBUG && proc.stdout.on('end', () => {
      log('inklecate has closed its stdout channel.');
    });

    proc.on('exit', async (code, signal) => {
      DEBUG && log('inklecate is done.');

      if (code > 0) {
        return reject(new Error(
          `${maybeLastError || ''}\n` +
          `inklecate exited with code ${code}` +
            `${signal ? ` and signal ${signal}` : ''}.`,
        ));
      }

      
      let text;
      try {
        text = await readFile(inputFilepath, 'utf8');
      } catch (err) {
        return reject(err);
      }

      let storyContent;
      try {
        json = (await readFile(outputFilepath, 'utf8')).trim();
        storyContent = JSON.parse(json);
      } catch (err) {
        return reject(err);
      }

      const finishArgs = {
        inputFilepath,
        isCaching,
        isPlaying,
        outputFilepath,
        storyContent,
        text,
        DEBUG,
      };

      return finish(finishArgs).then(resolve, reject);
    });
  });
};
