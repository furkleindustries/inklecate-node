const quit = require('./quit');
const {
  readFile,
  unlink,
} = require('fs');

module.exports = function finish(args) {
  const compilerOutput = args.compilerOutput;
  const isCaching = args.isCaching;
  const isPlaying = args.isPlaying;
  const inputFilepath = args.inputFilepath;
  const outputFilepath = args.outputFilepath;
  const reject = args.reject;
  const resolve = args.resolve;

  const doQuit = quit.bind(null, reject);

  if (isPlaying) {
    log('THE END');
  }

  readFile(outputFilepath, function cb(err, storyContentBuf) {
    if (err) {
      return doQuit(err);
    }

    const storyContent = JSON.parse(String(storyContentBuf).trim());
    if (isCaching) {
      readFile(inputFilepath, function cb(err, sourceBuf) {
        if (err) {
          return doQuit(err);
        }

        const source = String(sourceBuf);

        unlink(outputFilepath, function cb(err) {
          if (err) {
            if (err.code !== 'ENOENT') {
              return doQuit(err);
            }
          }

          return resolve({
            compilerOutput,
            source,
            storyContent,
          });
        });
      });
    } else {
      return resolve(compilerOutput);
    }
  });
};
