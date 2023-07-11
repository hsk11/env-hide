# Env-Hide
Secure your .env file with a password/ Secret SALT and use it in your project. Encrypt / decrypt your .env files. Hide your environment variables from the world. You can set that Secret salt as System Env using AWS task defination,  or directly using your cloud service provider to enhance the overall app security. Hide your environment variables.

---
[![Twitter Follow](https://img.shields.io/twitter/follow/Harpalsingh_11?label=Follow)](https://twitter.com/intent/follow?screen_name=Harpalsingh_11)
[![Linkedin: Harpal Singh](https://img.shields.io/badge/-harpalsingh11-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/hsk11)](https://www.linkedin.com/in/hsk11/)
[![GitHub followers](https://img.shields.io/github/followers/hsk11?label=Follow&style=social)](https://github.com/hsk11)
---

## Install
```azurecli
npm install -g env-hide
```

## Usage CLI

    Usage: env-hide -k YOUR_SECRET_KEY

    Options:

      -k, --key          YOUR_SECURITY_SALT (required)
      -o, --operation    encrypt/decrypt (required)
      -h, --help         output usage information
      -p, --path         file path (optional)
      -a, --algo         algorith to use, default: 'aes-256-ctr' (optional)
      -f, --file         output decrypted file? true/false (optional)


# Encrypt .env  using cli
```azurecli
    env-hide -o encrypt -k YOUR_SECRET_KEY
```

# Decrypt .env.enc to OUTPUT Original .env using cli
```azurecli
    env-hide -o decrypt -k YOUR_SECRET_KEY -f true
```



# Encrypt .env to Generate .env.enc (NODE JS)
```javascript
const envHide = require('env-hide');
envHide.encrypt({ key: SECRET_KEY_SALT});
```


# Decrypt .env.enc (NODE JS)
```javascript
const envHide = require('env-hide');

const envs = envHide.decrypt({ key: SECRET_KEY_SALT});
console.log(envs);
```

### Argument Keys :decrypt({}) 


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `key` | `string` |  secret_key, default: `null`, required:`true`|
| `algo` | `string` | algo to decrypt: `aes-256-ctr`|
| `enc` | `string` |  enc file name , default: `.env.enc`|
| `addToProcess` | `boolean` | automatically add to process.env, default: `true`|
| `realOutput` | `boolean` | return actual output(decrypted) of encrpted file, default: `false`|
| `outputDecryptFile` | `boolean` | automatically create original .env file back, default: `false`|

### Argument Keys :encrypt({})


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `key` | `string` |  secret_key, default: `null`, required:`true`|
| `algo` | `string` | algo to decrypt: `aes-256-ctr`|
| `env` | `string` |  env file to encrypt , default: `.env`|
| `output` | `boolean` | return encryted  output, default: `false`|


## Steps to Update existing Encrypted File and add new environment variables via CLI
- **Get original .env**:  ```env-hide -o decrypt -k YOUR_SECRET_KEY -f true ```
- Update or Add new Env Variables to your decrypted .env file
- **Encrypt original .env** :   ```env-hide -o encrypt -k YOUR_SECRET_KEY```
- DELETE the .env file

