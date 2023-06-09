import crypto from "crypto"

import randomStrOptions from "../types/randomStrOptions"

let randomIndex: number
let randomBytes: Buffer

const getNextRandomValue = () => {
	if (randomIndex === undefined || randomIndex >= randomBytes.length) {
		randomIndex = 0
		randomBytes = crypto.randomBytes(256)
	}

	const result = randomBytes[randomIndex]
	randomIndex += 1;

	return result
}

const randomNumber = (max: number) => {
	let rand = getNextRandomValue()
	while (rand >= 256 - (256 % max)) rand = getNextRandomValue()

	return rand % max
}

const lowercase = 'abcdefghijklmnopqrstuvwxyz'
const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const numbers = '0123456789'
const symbols = '!@#$%^&*()+_-=}{[]|:;"/?.><,`~'

const generate = (options: randomStrOptions, pool: string) => {
	const optionsLength = options.length ?? 12
	const poolLength = pool.length
	let password = ''

	for (let i = 0; i < optionsLength; i++) password += pool[randomNumber(poolLength)]

	return password
}

export const password = (options: randomStrOptions) => {
	options = options || {}

	if (!('length' in options)) options.length = 10
	if (!('number' in options)) options.numbers = false
	if (!('symbols' in options)) options.symbols = false
	if (!('uppercase' in options)) options.uppercase = true
	if (!('lowercase' in options)) options.lowercase = true
	if (!('exclude' in options)) options.exclude = ''

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
	}; let i = options.exclude?.length ?? 0
	while (i--) {
		pool = pool.replace(options.exclude![i], '')
	}

	const password = generate(options, pool)
	return password
}