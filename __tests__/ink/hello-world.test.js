const execute = require('../../execute');
const path = require('path');


describe('Hello world test.', async () => {
  const data = await execute({
    countAllVisits: true,
    isCaching: true,
    inputFilepaths: [
      path.join(__dirname, 'hello-world.ink'),
    ],

    outputFilepath: null,
    verbose: false,
  });

  console.log(data);
});
