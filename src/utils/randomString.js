const crypto = require('crypto')

const RANDOM_BATCH_SIZE = 256

let randomIndex
let randomBytes

const getNextRandomValue = function() {
	if (randomIndex === undefined || randomIndex >= randomBytes.length) {
		randomIndex = 0
		randomBytes = crypto.randomBytes(RANDOM_BATCH_SIZE)
	}

	const result = randomBytes[randomIndex]
	randomIndex += 1;

	return result
}

const randomNumber = (max) => {
	let rand = getNextRandomValue()
	while (rand >= 256 - (256 % max)) rand = getNextRandomValue()

	return rand % max
}

const lowercase = 'abcdefghijklmnopqrstuvwxyz'
const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const numbers = '0123456789'
const symbols = '!@#$%^&*()+_-=}{[]|:;"/?.><,`~'
const similarCharacters = /[ilLI|`oO0]/g

const generate = (options, pool) => {
	const optionsLength = options.length
	const poolLength = pool.length
	let password = ''

	for (let i = 0; i < optionsLength; i++) password += pool[randomNumber(poolLength)]

	return password
}

module.exports.generate = (options) => {
	options = options || {}

	if (!('length' in options)) options.length = 10
	if (!('number' in options)) options.numbers = false
	if (!('symbols' in options)) options.symbols = false
	if (!('uppercase' in options)) options.uppercase = true
	if (!('lowercase' in options)) options.lowercase = true
	if (!('exclude' in options)) options.exclude = ''
	options.excludeSimilarCharacters = false

	let pool = ''
	if (options.lowercase) pool += lowercase
	if (options.uppercase) pool += uppercase
	if (options.numbers) pool += numbers
	if (options.symbols) {
		if (typeof options.symbols === 'string') pool += options.symbols
		else pool += symbols
	}

	if (!pool) {
		throw new TypeError('At least one rule must be true')
	}; if (options.excludeSimilarCharacters) {
		pool = pool.replace(similarCharacters, '')
	}; let i = options.exclude.length
	while (i--) {
		pool = pool.replace(options.exclude[i], '')
	}

	const password = generate(options, pool)
	return password
}