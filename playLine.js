const readline = require('readline');

module.exports = (message, stdin) => {
  const prompt = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  return new Promise((resolve) => {
    prompt.question(message, (choice) => {
      prompt.close();
      stdin.write(`${choice}\n`);
      return resolve();
    });
  });
};
