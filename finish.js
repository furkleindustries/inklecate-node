const {
  readFile,
} = require('fs');

module.exports = function finish(args) {
  const compilerOutput = args.compilerOutput;
  const isCaching = args.isCaching;
  const isPlaying = args.isPlaying;
  const inputFilepath = args.inputFilepath;
  const outputFilepath = args.outputFilepath;

  if (isPlaying) {
    log('THE END');
  }

  return new Promise(function cb(resolve, reject) {
    readFile(outputFilepath, function cb(err, storyContentBuf) {
      if (err) {
        return reject(err);
      }

      const storyContent = JSON.parse(String(storyContentBuf).trim());
      if (isCaching) {
        readFile(inputFilepath, function cb(err, sourceBuf) {
          if (err) {
            return reject(err);
          }

          const source = String(sourceBuf);

          unlink(outputFilepath, function cb(err) {
            if (err) {
              if (err.code !== 'ENOENT') {
                return reject(err);
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
  })
};
