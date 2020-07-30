const ArgsEnum = require('./ArgsEnum');
const { spawn } = require('child_process');
const error = console.error;
const log = console.log;
const DEBUG = require('./DEBUG');
const finish = require('./finish');
const { readFile } = require('fs-extra');
const getInklecatePath = require('./getInklecatePath');

module.exports = (args) => {
  const {
    countAllVisits,
    inputFilepath,
    isCaching,
    outputFilepath,
    verbose,
  } = args;

  const proc = spawn(getInklecatePath(), [
    countAllVisits ? ArgsEnum.CountAllVisits : null,
    verbose ? ArgsEnum.Verbose : null,
    ArgsEnum.OutputFile,
    outputFilepath,
    inputFilepath,
  ].filter(Boolean));

  const compilerOutput = [];

  return new Promise((resolve, reject) => {
    proc.stdout.on('readable', () => {
      const readout = proc.stdout.read();
      if (readout) {
        const output = (readout || '').toString().trim();
        if (output) {
          DEBUG && log('inklecate has emitted a readable event through stdout.');
          compilerOutput.push(output.toString());
        }
      }
    });

    proc.stderr.on('data', (data) => {
      if (data) {
        DEBUG && warn('inklecate has emited a data event through stderr:');
        compilerOutput.push(data.toString());
      }
    });

    proc.stderr.on('error', (err) => {
      if (err) {
        DEBUG && error('inklecate has emited a error event through stderr:');
        compilerOutput.push(err.toString());
        return reject(compilerOutput);
      }
    });

    const chunks = [];
    proc.stdout.on('data', (chunk) => {
      chunks.push(chunk.toString());
    });

    DEBUG && proc.stdout.on('end', () => {
      log('inklecate has closed its stdout channel.');
    });

    proc.on('exit', async (code, signal) => {
      DEBUG && log('inklecate is done.');

      if (code > 0) {
        error(compilerOutput);
        return reject(new Error(
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
        compilerOutput,
        countAllVisits,
        inputFilepath,
        isCaching,
        outputFilepath,
        storyContent,
        text,
        DEBUG,
      };

      return finish(finishArgs).then(resolve, reject);
    });
  });
};
