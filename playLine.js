const readline = require('readline');

module.exports = function playLine(message, stdin) {
  const prompt = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  return new Promise(function (resolve) {
    prompt.question(message, function cb(choice) {
      prompt.close();
      stdin.write(`${choice}\n`);
      return resolve();
    });
  });
};
