const execute = require('../../execute');
const path = require('path');

const output = require('./every-node-type.ink.json');

describe('Every node type test.', () => {
  it('Tests every node type.', () => {
    expect.assertions(1);
  
    const data = execute({
      countAllVisits: true,
      isCaching: false,
      inputFilepath: path.join(__dirname, 'every-node-type.ink'),
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
      compilerOutput: [
        `TODO: 'every-node-type.ink' line 9: Author warning!`
      ],

      storyContent: output,
    });
  });
});
