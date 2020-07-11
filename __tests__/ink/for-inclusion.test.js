const execute = require('../../execute');
const path = require('path');

const output = require('./for-inclusion.ink.json');

describe('Inclusion test.', () => {
  it('Tests INCLUDE.', () => {
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
      return inkRet.storyContent;
    })).resolves.toMatchObject(output);
  });
});
