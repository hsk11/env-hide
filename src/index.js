#!/usr/bin/env node
const path = require('path');

const help = `
Usage: env-hide -k YOUR_SECRET_KEY

Options:

  -k, --key          YOUR_SECURITY_SALT (required)
  -o, --operation    encrypt/decrypt (required)
  -h, --help         output usage information
  -p, --path         file path (optional)
  -a, --algo         algorith to use, default: 'aes-256-ctr' (optional)
  -f, --file         output decrypted file? true/false (optional)

`;
const args = require('minimist')(process.argv.slice(2));

const { encrypt, decrypt } = require('../index');

if (args.h || args.help) {
  console.log(help);
}

const algo = args.algo || args.a || 'aes-256-ctr';
const key = args.key || args.k || null;

const operation = args.operation || args.o;
const outputDecryptFile = args.file || args.f || false;

if (!key) {
  console.log('Please provide secure key using --key or -k');
  process.exit(1);
}

if (operation === 'encrypt') {
  const env = args.path || args.p || '.env';
  encrypt(key, path.join(env), algo);
} else if (operation === 'decrypt') {
  const env = args.path || args.p || '.env.enc';
  const envs = decrypt({ key,
    enc: path.join(env),
    algo,
    outputDecryptFile
  });
  console.log(envs);
} else {
  console.log('Invalid command');
  console.log(help);
}
