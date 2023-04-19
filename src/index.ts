import * as path from "path"
import * as fs from "fs"

import { Hash } from "crypto"

import randomStrOptions from "./types/randomStrOptions"
import encryptStrOptions from "./types/encryptStrOptions"
import decryptStrOptions from "./types/decryptStrOptions"
import hashStrOptions from "./types/hashStrOptions"

import * as randomString from "./utils/randomString"
import * as cryptString from "./utils/cryptString"

/** @ts-ignore */
import { version } from "./pckg.json"
export const Version: string = version

export type DeepRequired<Type> = Type extends {}
		? Type extends Map<any, any>
			? Required<Type>
		: Type extends Set<any>
			? Required<Type> 
		: Type extends Buffer
			? Required<Type>
		: Type extends Function
			? Required<Type>
		: Type extends Array<any>
			? Required<Type>
		: Type extends {}
			? { [Key in keyof Type]-?: DeepRequired<Type[Key]> }
		: Required<Type>
	: Required<Type>

export {
	randomStrOptions,
	encryptStrOptions,
	decryptStrOptions,
	hashStrOptions
}


/**
 * Load an Env File as Object
 * @since 1.0.0
*/ export function loadEnv<F extends string, A extends boolean | undefined>(
	/** The path to the Env file */ file: F,
	/** Whether to load the File Async */ isAsync?: A
): A extends true ? Promise<Record<string, string>> : Record<string, string> {
	if (typeof file !== 'string') throw new TypeError('filePath must be a string')
	const resolvedFile = path.resolve(file)

	const parseContent = (content: string) => {
		let returns: Record<string, string> = {}
		for (const line of content.split('\n')) {
			const keys = line.split(/(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg)
			returns[keys[1]] = keys[2]
		}

		return returns
	}

	if (isAsync) return new Promise(async(resolve, reject) => {
		try {
			const content = await fs.promises.readFile(resolvedFile, 'utf8')
			return resolve(parseContent(content))
		} catch (err) {
			return reject(err)
		}
	}) as any
	else return parseContent(fs.readFileSync(resolvedFile, 'utf8')) as any
}

/**
 * Generate a Random Number
 * @since 1.0.0
*/ export function randomNum(
	/** The Minimum Number */ min: number,
	/** The Maximum Number */ max: number,
	/**
	 * The Decimal Places to Generate
	 * @default 0
	*/ dec?: number
): number {
	if (typeof min !== 'number') throw new TypeError('minimum must be a number')
	if (typeof max !== 'number') throw new TypeError('maximum must be a number')
	dec = dec ?? 0

	const random = Math.random() * (max - min + 1) + min
	const number = Math.floor(random * (10 ** dec)) / (10 ** dec);
	return number
}

/**
 * Generate a Random Boolean
 * @since 1.0.1
*/ export function randomBol(): boolean {
	const boolean = Math.floor(Math.random() * (2 - 1 + 1)) + 1
	return (boolean === 1)
}

/**
 * Generate a Random String
 * @since 1.0.0
*/ export function randomStr(options: randomStrOptions = {}): string {
	if (typeof options !== 'object') throw new TypeError('options must be an object')

	const length = options.length ?? 12
	const numbers = options.numbers ?? true
	const symbols = options.symbols ?? false
	const uppercase = options.uppercase ?? true
	const lowercase = options.lowercase ?? true
	const exclude = options.exclude ?? ''

	const string = randomString.password({
		length, numbers, symbols, uppercase, lowercase, exclude
	})

	return string
}

/**
 * Generate a Text Spinner
 * @since 1.0.2
*/ export class Spinner {
	states: string[]
	state: number = 0

	/** Create a Spinner */
	constructor(
		/** The States */ states?: string[],
	) {
		this.states = states ?? [
			'/', '-',
			'\\', '|'
		]
	}

	/** Get the Current State */
	get() {
		if (this.state >= this.states.length) this.state = 0

		return this.states[this.state++]
	}
}

/**
 * Encrypt a String
 * @since 1.0.3
*/ export function encryptStr(options: encryptStrOptions = { text: '' }) {
	if (typeof options !== 'object') throw new TypeError('options must be an object')

	const text = options.text ?? 'Javascript Moment'
	const algorithm = options.algorithm ?? 'aes-256-cbc'
	const output = options.output ?? 'hex'
	const key = options.key ?? '123unsafe'

	const data = cryptString.encrypt({
		text, algorithm, output, key
	})

	return data
}

/**
 * Decrypt a String
 * @since 1.0.3
*/ export function decryptStr(options: decryptStrOptions = { text: '' }): string {
	if (typeof options !== 'object') throw new TypeError('options must be an object')

	const text = options.text ?? 'Javascript Moment'
	const algorithm = options.algorithm ?? 'aes-256-cbc'
	const output = options.output ?? 'utf8'
	const key = options.key ?? '123unsafe'

	const data = cryptString.decrypt({
		text, algorithm, output, key
	})

	return data
}

/**
 * Hash a String
 * @since 1.0.4
*/ export function hashStr<T extends hashStrOptions>(options: hashStrOptions = { text: '' }): T['output'] extends 'bytes' ? Hash : string {
	if (typeof options !== 'object') throw new TypeError('options must be an object')

	const text = options.text ?? 'Javascript Moment'
	const algorithm = options.algorithm ?? 'sha256'
	const output = options.output ?? 'hex'

	const data = cryptString.hash({
		text, algorithm, output
	})

	return data as any
}

/**
 * Deep Parse Options
 * @since 1.3.0
*/ export function deepParseOptions<Options extends Record<any, any>>(object: DeepRequired<Options>, provided: Partial<Options>): DeepRequired<Options> {
	const handleObject = (object: Record<string, any>, merge: Record<string, any>) => {
		let output: Record<string, any> = {}
		Object.keys(object).forEach((key) => {
			if (typeof object[key] === 'object' && key in merge) output[key] = handleObject(object[key], merge[key])
			else if (typeof object[key] === 'object') output[key] = object[key]
			else if (key in merge) output[key] = merge[key]
			else output[key] = object[key]
		})

		return output
	}

	return handleObject(object, provided) as any
}