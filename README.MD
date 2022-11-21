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
npm i rjutils-collection
```

## Usage

Loading an env File as json
```js
const path = require('node:path')
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

## Author

👤 **0x4096**

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/rotvproHD/NPM_UTILS/issues). 

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2022 [0x4096](https://github.com/rotvproHD).<br />
This project is MIT licensed.