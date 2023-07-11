/* eslint-disable no-param-reassign */

const fs = require('fs');
const path = require('path');

const crypto = require('crypto');

const encrypt = (buffer, key, algorithm) => {
  // Create an initialization vector
  const iv = crypto.randomBytes(16);
  // Create a new cipher using the algorithm, key, and iv
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  // Create the new (encrypted) buffer
  const result = Buffer.concat([iv, cipher.update(buffer), cipher.final()]);
  return result;
};

const decrypt = (encrypted, key, algorithm) => {
  // Get the iv: the first 16 bytes
  const iv = encrypted.slice(0, 16);
  // Get the rest
  encrypted = encrypted.slice(16);
  // Create a decipher
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  // Actually decrypt it
  const D = [decipher.update(encrypted), decipher.final()]

  const result = Buffer.concat(D);
  return result;
};

function encryptEnv({key, env = path.join(process.cwd(),'.env'), algo = 'aes-256-ctr'}) {
  key = crypto.createHash('sha256').update(String(key)).digest('base64').substr(0, 32);

  const content = fs.readFileSync(env);

  const encrypted = encrypt(content, key, algo);
  fs.writeFileSync(`${env}.enc`, encrypted);
  return encrypted;
}

function decryptEnv({key, enc= ".env.enc", algo='aes-256-ctr'}) {
  const content = fs.readFileSync(enc);
  key = crypto.createHash('sha256').update(String(key)).digest('base64').substr(0, 32);
  const decrypted = decrypt(content, key, algo);
  return decrypted;
}

module.exports = {
    encryptEnv,
    decryptEnv
}