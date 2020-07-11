const execute = require('../../execute');
const path = require('path');

const output = require('./for-inclusion.ink.json');

describe('Hello world test.', () => {
  it('Tests the hello world.', () => {
    expect.assertions(1);
  
    const data = execute({
      countAllVisits: true,
      isCaching: false,
      inputFilepath: path.join(__dirname, 'for-inclusion.ink'),
      outputFilepath: null,
      verbose: false,
      DEBUG: false,
    });
  
    return expect(data.then((inkRet) => {
      return {
        compilerOutput: inkRet.compilerOutput,
        storyContent: inkRet.storyContent,
      };
    })).resolves.toMatchObject({
      compilerOutput: [],
      storyContent: output,
    });
  });
});
