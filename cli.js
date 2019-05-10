const baseDEBUG = require('./DEBUG');

const ArgsEnum = require('./ArgsEnum');
const {
  error,
  log,
} = require('colorful-logging');
const program = require('commander');
const {
  version,
} = require('./package.json');
const {
  assertValid,
} = require('ts-assertions');

program
  .version(version)
  .usage('inklecate2 <options> <ink file>')
  .option('-o, --outputFile <outputFile>', 'Output file name')
  .option('-c', 'Count all visits to knots, stitches and weave points, not\n' +
                  'just those referenced by TURNS_SINCE and read counts')
  .option('-p, --play', 'Play mode')
  .option('-v', 'Verbose mode - print compilation timings')
  .option('-k', 'Keep inklecate running in play mode even after story is ' +
                'complete')
  .option('--DEBUG', 'Enable debug mode for inklecate-node.')
  .parse(process.argv);

const DEBUG = baseDEBUG || program.DEBUG;

const filename = assertValid(
  program.args[0],
  'The file name argument was not found.',
);

const opts = Object.freeze([].concat(
  program.k ? [ ArgsEnum.KeepRunning ] : [],
  program.p || program.play ? [ ArgsEnum.Play ] : [],
  program.v ? [ ArgsEnum.Verbose ] : [],
  program.o || program.outputFile ?
    [ `${ArgsEnum.OutputFile} ${program.o || program.outputFile}` ] :
    [],
).concat([ filename ]));

require('./inklecate')(opts).then(
  function resolved(data) {
    DEBUG && log('inklecate-node has completed.');
    log(JSON.stringify(data.storyContent.root));
  },
  function rejected(err) {
    error(err);
  },
);
