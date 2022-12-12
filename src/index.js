const path = require('path')
const fs = require('fs')

module.exports = {
	/**
	* Load an Env File
	*
	* @param {String} filePath The path to the Env file
	*/
	loadEnv(filePath) {
		if (typeof filePath !== 'string') throw new TypeError('filePath must be a string')

		const content = fs.readFileSync(path.resolve(filePath), 'utf8')

		let returns = {}
		for (const line of content.split('\n')) {
			const keys = line.split(/(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg)
			returns[keys[1]] = keys[2]
		}
		
		return returns
	},

	/**
	* Generate a Random Number
	*
	* @param {Number} min The Minimum Number
	* @param {Number} max The Maximum Number
	*/
	randomNum(min, max) {
		if (typeof min !== 'number') throw new TypeError('minimum must be a number')
		if (typeof max !== 'number') throw new TypeError('maximum must be a number')

		const number = Math.floor(Math.random() * (max - min + 1)) + min
		return number
	},

	/**
	* Generate a Random Boolean
	*/
	randomBol() {
		const boolean = Math.floor(Math.random() * (2 - 1 + 1)) + 1
		return (boolean === 1)
	},

	/**
	* Generate a Random String
	*
	* @typedef {Object} randomStr { length: number, numbers: boolean, symbols: boolean, uppercase: boolean, lowercase: boolean, exclude: string }
	* @prop {Number} length The Length of the String
	* @prop {Boolean} numbers Whether Numbers should be included
	* @prop {Boolean} symbols Whether Symbols should be included
	* @prop {Boolean} uppercase Whether Uppercase letters should be included
	* @prop {Boolean} lowercase Whether Lowercase letters should be included
	* @prop {String} exclude Characters that should not be included
	* 
	* @param {randomStr} options
	*/
	randomStr(options) {
		if (typeof options !== 'object') throw new TypeError('options must be an object')

		const string = require('./utils/randomString').generate(options)
		return string
	},

	/**
	* Generate a Spinner
	*/
	spinner: class spinner {
		constructor() {
			this.state = 0
			this.states = [
				'/', '-',
				'\\', '|'
			]
		}

		get() {
			if (this.state >= 4) this.state = 0
			this.state++

			return this.states[this.state-1]
		}
	},

	/**
	* Encrypt a String
	*
	* @typedef {Object} encryptStr { algorithm: string, key: string, key: string }
	* @prop {String} [algorithm] The Algorithm to use
	* @prop {String} [output] The Text Output (hex, utf8, ...)
	* @prop {String} text The Text to Encrypt
	* @prop {String} [key] The Key
	* 
	* @param {encryptStr} options
	*/
	encryptString(options) {
		if (typeof options !== 'object') throw new TypeError('options must be an object')

		const data = require('./utils/cryptString').encrypt(options)
		return data
	},

	/**
	* Decrypt a String
	*
	* @typedef {Object} decryptStr { algorithm: string, key: string, key: string }
	* @prop {String} [algorithm] The Algorithm to use
	* @prop {String} [output] The Text Input (hex, utf8, ...)
	* @prop {String} text The Text to Encrypt
	* @prop {String} [key] The Key
	* 
	* @param {decryptStr} options
	*/
	decryptString(options) {
		if (typeof options !== 'object') throw new TypeError('options must be an object')

		const data = require('./utils/cryptString').decrypt(options)
		return data
	},

	/**
	* Hash a String
	*
	* @typedef {Object} decryptStr { algorithm: string, key: string, key: string }
	* @prop {String} [algorithm] The Algorithm to use
	* @prop {String} [digest] The Text Output (base64, base64url, binary, hex, bytes)
	* @prop {String} text The Text to Hash
	* 
	* @param {decryptStr} options
	*/
	hashString(options) {
		if (typeof options !== 'object') throw new TypeError('options must be an object')

		const data = require('./utils/cryptString').hash(options)
		return data
	},
}