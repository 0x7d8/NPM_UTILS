import * as crypto from "crypto"

import encryptStrOptions from "../interfaces/encryptStrOptions"
import decryptStrOptions from "../interfaces/decryptStrOptions"
import hashStrOptions from "../interfaces/hashStrOptions"

module.exports.encrypt = (options: encryptStrOptions) => {
	const key = crypto.createHash('sha256').update(String(options.key)).digest('base64').substring(0, 32)
	const iv = Buffer.alloc(16, 0)

	const enCipher = crypto.createCipheriv(options.algorithm, key, iv)
	let encryptedData = enCipher.update(options.text)
	encryptedData = Buffer.concat([encryptedData, enCipher.final()])

	return encryptedData.toString(options.output)
}

module.exports.decrypt = (options: decryptStrOptions) => {
	const key = crypto.createHash('sha256').update(String(options.key)).digest('base64').substring(0, 32)
	const iv = Buffer.alloc(16, 0)

	const deCipher = crypto.createDecipheriv(options.algorithm, key, iv)

	let decryptedData = deCipher.update(Buffer.from(options.text, 'hex'))
	decryptedData = Buffer.concat([decryptedData, deCipher.final()])

	return decryptedData.toString(options.output)
}

module.exports.hash = (options: hashStrOptions) => {
	let hash: string | crypto.Hash
	if (options.output === 'bytes') hash = crypto.createHash(options.algorithm).update(String(options.text))
	else hash = crypto.createHash(options.algorithm).update(String(options.text)).digest(options.output)

	return hash
}