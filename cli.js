const ArgsEnum = require('./ArgsEnum');
const {
  error,
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
  .option('-o <outputFile>', 'Output file name')
  .option('-c', 'Count all visits to knots, stitches and weave points, not\n' +
                  'just those referenced by TURNS_SINCE and read counts')
  .option('-p, --play', 'Play mode')
  .option('-v', 'Verbose mode - print compilation timings')
  .option('-k', 'Keep inklecate running in play mode even after story is ' +
                'complete')
  .parse(process.argv);

const filename = assertValid(
  program.args[0],
  'The file name argument was not found.',
);

const opts = []
  .concat(program.o ? [ `${ArgsEnum.OutputFile} ${program.o}` ] : [])
  .concat(program.v ? [ ArgsEnum.Verbose ] : [])
  .concat(program.p || program.play ? [ ArgsEnum.Play ] : [])
  .concat(program.k ? [ ArgsEnum.KeepRunning ] : [])
  .concat([ filename ]);

try {
  require('./inklecate')(opts).then(
    function resolved() {
      /* Do nothing. */
    },
    function rejected(err) { throw err; },
  );
} catch (err) {
  error(err);
  throw err;
}
