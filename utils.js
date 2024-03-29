const spawn = require('cross-spawn');
const bcrypt = require('bcrypt');

async function clearTerminal() {
  return new Promise(resolve => {
    const command = process.platform === 'win32' ? 'cls' : 'clear';
    const child = spawn(command, [], { stdio: 'inherit', shell: true });

    child.on('exit', (code, signal) => {
      resolve();
    });
  });
}

async function hashPassword(password){
  const salt = await bcrypt.genSalt(5);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}


module.exports = {
  clearTerminal,
  hashPassword,
};
