# purecrypt
Ultralight encryption and decryption package.

## Description

Use Purecrypt to quickly encrypt, or decrypt any string on your Node.js project. 

## How to Use

Set up your .env...

```
// Can be any statement
CRYPTO_KEY=Super secret key

// See supported ciphers below
ALGO=aes-192-cbc

```

Encrypt any string...

```
require('dotenv').config()
const purecrypt = require('purecrypt')

...

let encryptedSample = purecrypt.encrypt('example');

```

Decrypt any previously encrypted string...

```
purecrypt.decrypt(encryptedSample)
```

## Ciphers Supported
  * aes-256-cbc,
  * aes-256-cfb,
  * aes-256-cfb1,
  * aes-256-cfb8,
  * aes-256-ctr,
  * aes256,
  * camellia-256-cbc,
  * camellia-256-cfb,
  * camellia-256-cfb1,
  * camellia-256-cfb8,
  * camellia-256-ofb,
  * camellia256,
 


