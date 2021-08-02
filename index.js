const readline = require('node:readline');
const { getChars } = require('./getChars');
const { Writable } = require('node:stream');

const mutableStdout = new Writable({
  write: function(chunk, encoding, callback) {
    if (!this.muted)
      process.stdout.write(chunk, encoding);
    callback();
  }
});

const rl = readline.createInterface({
  input: process.stdin,
  output: mutableStdout,
  terminal: true,
});



function askForChars(password) {
  const chars = [];
  const onCharInput = (char) => {
    chars.push(Number.parseFloat(char));
    console.log(getChars(chars, password))
    if (chars.length <= password.length) {
      askForChar(onCharInput);
    } else {
      rl.close();
    }
  };
  askForChar(onCharInput);
}

function askForChar(callback) {
  rl.question('Character index? ', callback);
}

function askForPassword() {
  process.stdout.write('Password?\n');
  mutableStdout.muted = true;
  rl.question('', function (password) {
    mutableStdout.muted = false;
    askForChars(password);
  });
  rl.on('close', function () {
    process.exit(0);
  });
}

askForPassword();

