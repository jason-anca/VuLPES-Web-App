const spawn = require('cross-spawn');

async function clearTerminal() {
  return new Promise(resolve => {
    const command = process.platform === 'win32' ? 'cls' : 'clear';
    const child = spawn(command, [], { stdio: 'inherit', shell: true });

    child.on('exit', (code, signal) => {
      resolve();
    });
  });
}

module.exports = {
  clearTerminal,
};
