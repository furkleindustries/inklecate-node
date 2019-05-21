const baseDEBUG = require('./DEBUG');

const {
  error,
  log,
} = require('colorful-logging');
const program = require('commander');
const inklecate = require('./inklecate');
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
  .option('--glob', 'Allow glob compilation of multiple files.')
  .option('--DEBUG', 'Enable debug mode for inklecate-node.')
  .parse(process.argv);

const DEBUG = baseDEBUG || program.DEBUG;

const inputFilepaths = assertValid(
  program.args.filter((arg) => arg[0] !== '-'),
  'No input filepaths were found.',
  (result) => result.length,
);

const opts = Object.freeze({
  inputFilepaths,
  glob: program.glob,
  keepRunning: program.k,
  isPlaying: program.p || program.play,
  outputFilepath: program.o || program.outputFile || null,
  verbose: program.v,
  DEBUG: program.DEBUG,
});

inklecate(opts).then(
  function resolved(data) {
    DEBUG && log('inklecate-node has completed.');
    if (!data ||
        (Array.isArray(data) && !data.length) ||
        !Object.keys(data).length)
    {
      error('No result from inklecate-node.');
      return;
    }

    const list = Array.isArray(data) ? data : [ data ];
    list.forEach(function forEach(datum) {
      if (datum &&
          (datum.storyContent || (Array.isArray(datum) && datum.length)))
      {
        log(JSON.stringify(datum));
      }
    });
  },
  function rejected(err) {
    error(err);
  },
);
