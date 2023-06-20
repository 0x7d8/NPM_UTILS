import path from "path"
import fs from "fs"

import { Hash } from "crypto"

import randomStrOptions from "./types/randomStrOptions"
import encryptStrOptions from "./types/encryptStrOptions"
import decryptStrOptions from "./types/decryptStrOptions"
import hashStrOptions from "./types/hashStrOptions"

export { default as size } from "./functions/size"
export { default as time } from "./functions/time"

export { zType, zValidate } from "./utils/zodDecorators"

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

export type {
	randomStrOptions,
	encryptStrOptions,
	decryptStrOptions,
	hashStrOptions
}


/**
 * Load an Env File as Object
 * @since 1.0.0
*/ export function loadEnv<Async extends boolean | undefined>(
	/** The path to the Env file */ file: string,
	/** Whether to load the File Async */ isAsync?: Async
): Async extends true ? Promise<Record<string, string>> : Record<string, string> {
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
 * Cast a Value as something else (ts only)
 * @warning THIS DOES NOT DO ANY VALIDATION!! USE WITH CARE.
 * @example
 * ```
 * const descriptor: PropertyDescriptor = ...
 * 
 * as<number[]>(descriptor.value).push(2)
 * ```
 * @since 1.7.0
*/ export function as<T>(
	/** The Object to cast the type to */ object: any
): T {
	return object
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
 * Generate a Random Code
 * 
 * When `symbols` is enabled, generated `-` will be replaced with `.`
 * @example
 * ```
 * randomCode([1, 2]) // O-kN
 * randomCode([6, 7]) // QyzKcJ-vUveJHR
 * randomCode([3, 4], { symbols: true }) // ~?&-LDbe
 * ```
 * @since 1.6.0
*/ export function randomCode(segments: number[], options: Omit<randomStrOptions, 'length'> = {}): string {
	if (!Array.isArray(segments)) throw new TypeError('segments must be an array')
	if (typeof options !== 'object') throw new TypeError('options must be an object')

	let result = ''
	for (let i = 0; i < segments.length; i++) {
		result += randomStr({ ...options, length: segments[i] }).replace(/-/g, '.')
		if (i !== segments.length - 1) result += '-'
	}

	return result
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
*/ export function deepParseOptions<Options extends Record<any, any>>(
	/** The Full Options Object */ object: DeepRequired<Options>,
	/** The Options Object to merge with */ provided: Partial<Options>
): DeepRequired<Options> {
	const handleObject = (object: Record<string, any>, merge: Record<string, any>) => {
		let output: Record<string, any> = {}
		Object.keys(object).forEach((key) => {
			if (typeof object[key] === 'object' && !Array.isArray(merge[key]) && key in merge) output[key] = handleObject(object[key], merge[key])
			else if (typeof object[key] === 'object' && !Array.isArray(merge[key])) output[key] = object[key]
			else if (!Array.isArray(merge[key]) && key in merge) output[key] = merge[key]
			else if (Array.isArray(merge[key])) output[key] = merge[key]
			else output[key] = object[key]
		})

		return output
	}

	return handleObject(object, provided) as any
}

/**
 * Deep Compare Objects
 * @since 1.3.0
*/ export function deepCompare<Object extends Record<any, any>, Compare extends Record<any, any>>(
	/** The Object to compare against */ object: Object,
	/** The Object to compare */ compare: Compare
): compare is Object {
	if (Object.is(object, compare)) return true

	const handleObject = (object: Record<string, any>, compare: Record<string, any>) => {
		Object.keys(object).forEach((key) => {
			if (!compare[key]) throw false
			if (typeof object[key] !== typeof compare[key]) throw false
			if (typeof object[key] !== 'object' && object[key] !== compare[key]) throw false
			if (typeof object[key] === 'object') handleObject(object[key], compare[key])
		})

		return true
	}

	try {
		return handleObject(object, compare)
	} catch {
		return false
	}
}

/**
 * Get Files Recursively
 * @since 1.4.0
*/ export function getFilesRecursively<Directory extends string, Async extends boolean | undefined>(
	/** The Directory to get Files from */ directory: Directory,
	/** Whether to search the Directory Async */ async?: Async
): Async extends true ? Promise<string[]> : string[] {
	if (async) return new Promise(async(resolve, reject) => {
		const handleDirectory = async(directory: string) => {
			const output: string[] = []
			for (const file of await fs.promises.readdir(directory, { withFileTypes: true })) {
				if (file.isDirectory()) output.push(...(await handleDirectory(path.join(directory, file.name))))
        else output.push(path.join(directory, file.name))
			}

			return output
		}

		try {
			return resolve(await handleDirectory(directory))
		} catch (error) {
			return reject(error)
		}
	}) as any
	else {
		const handleDirectory = (directory: string) => {
			const output: string[] = []
			for (const file of fs.readdirSync(directory, { withFileTypes: true })) {
				if (file.isDirectory()) output.push(...handleDirectory(path.join(directory, file.name)))
				else output.push(path.join(directory, file.name))
			}

			return output
		}

		return handleDirectory(directory) as any
	}
}