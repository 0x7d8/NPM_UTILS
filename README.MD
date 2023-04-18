<h1 align="center">Welcome to rjutils-collection 👋</h1>
<center>
  <a href="https://www.npmjs.com/package/rjutils-collection" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/rjutils-collection.svg">
  </a>
  <a href="https://github.com/rotvproHD/NPM_UTILS#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/rotvproHD/NPM_UTILS/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>

  Easy and Lightweight Utilities
</center>

### 🏠 [Homepage](https://github.com/rotvproHD/NPM_UTILS#readme)

## Install

```sh
# NPM
npm i rjutils-collection

# Yarn
yarn add rjutils-collection

# pNPM
pnpm add rjutils-collection
```

## Usage

Loading an env File as object
```js
const path = require('path')
const utils = require('rjutils-collection')

const env = utils.loadEnv(path.join(__dirname, '.env'))
```

Generating a Random Number in Range
```js
const utils = require('rjutils-collection')

const min = 50
const max = 100
const number = utils.randomNum(min, max)
```

Generating a Random Boolean
```js
const utils = require('rjutils-collection')

const boolean = utils.randomBol()
```

Generating a Random String
```js
const utils = require('rjutils-collection')

const string = utils.randomStr({
  length: 25,
  numbers: true,
  symbols: true,
  uppercase: true,
  lowercase: true
})
```

Encrypting a String
```js
const utils = require('rjutils-collection')

const result = utils.encryptString({
  text: 'Hello, World!',
  algorithm: 'sha256',
  key: '123456789',
  output: 'hex'
})
```

Decrypting a String
```js
const utils = require('rjutils-collection')

const result = utils.decryptString({
  text: 'cf5ca2c244e71e33e30d07d5c13a4502!',
  algorithm: 'sha256',
  key: '123456789',
  output: 'utf8'
})
```

Hashing a String
```js
const utils = require('rjutils-collection')

const result = utils.hashString({
  text: 'Hello World again!',
  algorithm: 'sha256',
  digest: 'hex'
})
```

Parsing Options
```js
const utils = require('rjutils-collection')

const original = {
  ssl: true,
  maxRequests: 10000,
  other: {
    clock: true,
    date: {
      enabled: true,
      timezone: 'UTC'
    }
  }
}

const userProvided = {
  ssl: false,
  other: {
    date: {
      timezone: 'CET'
    }
  }
}

const result = utils.deepParseOptions(original, userProvided)
/**
 * {
 *   ssl: false,
 *   maxRequests: 10000,
 *   other: {
 *     clock: true,
 *     date: {
 *       enabled: true,
 *       timezone: 'CET'
 *     }
 *   }
 * }
*/
```

## Author

👤 **0x4096**

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/rotvproHD/NPM_UTILS/issues). 

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2023 [0x4096](https://github.com/rotvproHD).<br />
This project is MIT licensed.