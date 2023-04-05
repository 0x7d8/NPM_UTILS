import * as crypto from "crypto"

import encryptStrOptions from "../types/encryptStrOptions"
import decryptStrOptions from "../types/decryptStrOptions"
import hashStrOptions from "../types/hashStrOptions"

export const encrypt = (options: encryptStrOptions) => {
	const key = crypto.createHash('sha256').update(String(options.key)).digest('base64').substring(0, 32)
	const iv = Buffer.alloc(16, 0)

	const enCipher = crypto.createCipheriv(options.algorithm as any, key, iv)
	let encryptedData = enCipher.update(options.text)
	encryptedData = Buffer.concat([encryptedData, enCipher.final()])

	return encryptedData.toString(options.output)
}

export const decrypt = (options: decryptStrOptions) => {
	const key = crypto.createHash('sha256').update(String(options.key)).digest('base64').substring(0, 32)
	const iv = Buffer.alloc(16, 0)

	const deCipher = crypto.createDecipheriv(options.algorithm as any, key, iv)

	let decryptedData = deCipher.update(Buffer.from(options.text, 'hex'))
	decryptedData = Buffer.concat([decryptedData, deCipher.final()])

	return decryptedData.toString(options.output)
}

export const hash = (options: hashStrOptions) => {
	let hash: string | crypto.Hash
	if (options.output === 'bytes') hash = crypto.createHash(options.algorithm as any).update(String(options.text))
	else hash = crypto.createHash(options.algorithm as any).update(String(options.text)).digest(options.output as any)

	return hash
}