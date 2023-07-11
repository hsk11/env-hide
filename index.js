const dotenv = require('dotenv');
const fs = require('fs');

const { encryptEnv, decryptEnv } = require('./src/lib/utils');

function decrypt({ key, algo = 'aes-256-ctr', enc = '.env.enc', addToProcess = true, realOutput = false, outputDecryptFile = false }) {
  const output = decryptEnv({ key, enc, algo });
  const envs = dotenv.parse(output);

  if (outputDecryptFile) {
    fs.writeFileSync('.env', output);
  }

  const needToAdd = {};
  const keys = Object.keys(envs);
  keys.forEach((key) => {
    let value = envs[key];
    if (!isNaN(value)) {
      value = Number(value);
    }
    envs[key] = value;
    if (process.env[key]) return;

    needToAdd[key] = value;
  });

  if (addToProcess) {
    process.env = {
      ...process.env,
      ...needToAdd
    };
  }
  if (realOutput) {
    return output;
  }

  return envs;
}

function encrypt({ key, algo = 'aes-256-ctr', env = '.env', output = false }) {
  const result = encryptEnv({ key, env, algo });
  if (output) {
    return result;
  }
  return '';
}

module.exports = {
  encrypt,
  decrypt
};
