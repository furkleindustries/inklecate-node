#!/usr/bin/env node

const baseDEBUG = require('./DEBUG');

const error = console.error
const log = console.log
const program = require('commander');
const inklecate = require('./inklecate');
const { version } = require('./package.json');
const { assertValid } = require('ts-assertions');

program
  .version(version)
  .usage('inklecate <options> ...<ink file(s)>')
  .option('-v', 'Get the version identifier.', () => {
    log(version);
    process.exit(0);
  })
  .option('-o, --outputFile <outputFile>', 'Output file name')
  .option('-c', 'Count all visits to knots, stitches and weave points, not\n' +
                  'just those referenced by TURNS_SINCE and read counts')
  .option('--verbose', 'Verbose mode - print compilation timings')
  .option('--glob', 'Allow glob compilation of multiple files.')
  .option('--DEBUG', 'Enable debug mode for inklecate-node (not inklecate).')
  .parse(process.argv);

const DEBUG = baseDEBUG || program.DEBUG;

const inputFilepaths = assertValid(
  program.args.filter((arg) => arg[0] !== '-'),
  'No input filepaths were found.',
  (result) => result.length,
);

const opts = Object.freeze({
  inputFilepaths,
  countAllVisits: Boolean(program.c),
  glob: Boolean(program.glob),
  outputFilepath: program.outputFile || null,
  verbose: Boolean(program.verbose),
  DEBUG: Boolean(program.DEBUG),
});

inklecate(opts).then(
  (data) => {
    DEBUG && log('inklecate-node has completed.');

    if (!data ||
        (Array.isArray(data) && !data.length) ||
        !Object.keys(data).length)
    {
      DEBUG && error('The return value from inklecate was null or undefined.');
      error('No result from inklecate-node.');
      return;
    }

    DEBUG && log('inklecate-node is outputting the response.');

    const list = Array.isArray(data) ? data : [ data ];
    list.forEach(log);
  },

  error,
);
