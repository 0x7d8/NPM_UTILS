import * as path from "path"
import * as fs from "fs"

import { Hash } from "crypto"

import randomStrOptions from "./interfaces/randomStrOptions"
import encryptStrOptions from "./interfaces/encryptStrOptions"
import decryptStrOptions from "./interfaces/decryptStrOptions"
import hashStrOptions from "./interfaces/hashStrOptions"

export = {
	/** Load an Env File to JSON */
	loadEnv(
		/** The path to the Env file */ filePath: string
	) {
		if (typeof filePath !== 'string') throw new TypeError('filePath must be a string')

		const content = fs.readFileSync(path.resolve(filePath), 'utf8')

		let returns: { [key: string]: string } = {}
		for (const line of content.split('\n')) {
			const keys = line.split(/(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg)
			returns[keys[1]] = keys[2]
		}

		return returns
	},

	/** Generate a Random Number */
	randomNum(
		/** The Minimum Number */ min: number,
		/** The Maximum Number */ max: number,
		/**
		 * The Decimal Places to Generate
		 * @default 0
		*/ dec?: number
	) {
		if (typeof min !== 'number') throw new TypeError('minimum must be a number')
		if (typeof max !== 'number') throw new TypeError('maximum must be a number')
		dec = dec ?? 0

		const random = Math.random() * (max - min + 1) + min
		const number = Math.floor(random * (10 ** dec)) / (10 ** dec);
		return number
	},

	/** Generate a Random Boolean */
	randomBol() {
		const boolean = Math.floor(Math.random() * (2 - 1 + 1)) + 1
		return (boolean === 1)
	},

	/** Generate a Random String */
	randomStr(options: randomStrOptions) {
		if (typeof options !== 'object') throw new TypeError('options must be an object')
		const length = options.length ?? 12
		const numbers = options.numbers ?? true
		const symbols = options.symbols ?? false
		const uppercase = options.uppercase ?? true
		const lowercase = options.lowercase ?? true
		const exclude = options.exclude ?? ''

		const string: string = require('./utils/randomString').generate({
			length, numbers, symbols, uppercase, lowercase, exclude
		}); return string
	},

	/** Generate a Text Spinner */
	spinner: class spinner {
		states: string[]
		state: number

		/** Create Spinner */
		constructor(
			/** The States */ states?: string[],
		) {
			this.state = 0
			this.states = states ?? [
				'/', '-',
				'\\', '|'
			]
		}

		/** Get the Current State */
		get() {
			if (this.state >= this.states.length) this.state = 0
			this.state++

			return this.states[this.state - 1]
		}
	},

	/** Encrypt a String */
	encryptStr(options: encryptStrOptions) {
		if (typeof options !== 'object') throw new TypeError('options must be an object')
		const text = options.text ?? 'Javascript Moment'
		const algorithm = options.algorithm ?? 'aes-256-cbc'
		const output = options.output ?? 'hex'
		const key = options.key ?? '123unsafe'

		const data: string = require('./utils/cryptString').encrypt({
			text, algorithm, output, key
		}); return data
	},

	/** Decrypt a String */
	decryptStr(options: decryptStrOptions) {
		if (typeof options !== 'object') throw new TypeError('options must be an object')
		const text = options.text ?? 'Javascript Moment'
		const algorithm = options.algorithm ?? 'aes-256-cbc'
		const output = options.output ?? 'utf8'
		const key = options.key ?? '123unsafe'

		const data: string = require('./utils/cryptString').decrypt({
			text, algorithm, output, key
		}); return data
	},

	/** Hash a String */
	hashStr(options: hashStrOptions) {
		if (typeof options !== 'object') throw new TypeError('options must be an object')
		const text = options.text ?? 'Javascript Moment'
		const algorithm = options.algorithm ?? 'sha256'
		const output = options.output ?? 'hex'

		const data: string | Hash = require('./utils/cryptString').hash({
			text, algorithm, output
		}); return data
	},
}