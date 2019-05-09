const ArgsEnum = require('./ArgsEnum');
const {
  error,
  log,
} = require('colorful-logging');
const {
  spawn,
} = require('child_process');
const getInklecatePath = require('./getInklecatePath');
const readline = require('readline');
const {
  assert,
} = require('ts-assertions');

module.exports = function inklecate(args) {
  assert(
    args,
    'The args argument was not an array with a filepath and at least one ' +
      'option.',
    function (args) {
      return Array.isArray(args) && args.length >= 2;
    },
  );

  const isPlaying = args.indexOf(ArgsEnum.Play) !== -1
  if (!isPlaying) {
    assert(
      args.filter(function filter(arg) {
        return new RegExp(`^${ArgsEnum.OutputFile}`).test(arg);
      }).length,
      'The -p play option was not received, but no -o output file option ' +
        'was given.',
    );
  }

  return new Promise(function (resolve, reject) {
    const proc = spawn(getInklecatePath(), args);

    proc.on('exit', function ex() {
      if (isPlaying) {
        console.log('THE END');
      }

      return resolve();
    });

    proc.stdout.on('data', function data(chunk) {
      const chunkStr = String(chunk);
      if (isPlaying) {
        if (/\?>\s+$/.test(chunkStr)) {
          const prompt = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false,
          });

          prompt.question(chunkStr, function cb(result) {
            prompt.close();
            proc.stdin.write(`${result}\n`);
          });
        } else {
          log(chunkStr);
          return resolve();
        }
      }
    });

    proc.stderr.on('data', function data(chunk) {
      error(chunk);
      return reject(chunk);
    });

    proc.on('error', function cb(err) {
      error(err);
      return reject(err);
    });
  });
};
