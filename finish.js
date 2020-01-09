const {
  readFile,
  unlink,
} = require('fs');

module.exports = (args) => {
  const compilerOutput = args.compilerOutput;
  const isCaching = args.isCaching;
  const isPlaying = args.isPlaying;
  const inputFilepath = args.inputFilepath;
  const outputFilepath = args.outputFilepath;

  if (isPlaying) {
    log('THE END');
  }

  return new Promise(async (resolve, reject) => {
    let storyContentBuf;
    try {
      storyContentBuf = await readFile(outputFilepath);
    } catch (err) {
      return reject(err);
    }

    const storyContent = JSON.parse(String(storyContentBuf).trim());
    if (isCaching) {
      let sourceBuf;
      try {
        sourceBuf = await readFile(inputFilepath);
      } catch (err) {
        return reject(err);
      }

      const source = String(sourceBuf);

      try {
        await unlink(outputFilepath);
      } catch (err) {
        if (err.code !== 'ENOENT') {
          return reject(err);
        }
      }

      return resolve({
        compilerOutput,
        source,
        storyContent,
      });
    }

    return resolve(compilerOutput);
  });
};
