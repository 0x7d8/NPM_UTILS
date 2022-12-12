const crypto = require('crypto')

module.exports.encrypt = (options) => {
	const key = crypto.createHash('sha256').update(String(options.key)).digest('base64').substring(0, 32)
	const algorithm = options.algorithm || 'aes-256-cbc'
	const output = options.output || 'hex'
	const iv = Buffer.alloc(16, 0)

	const enCipher = crypto.createCipheriv(algorithm, key, iv)
	let encryptedData = enCipher.update(options.text)
	encryptedData = Buffer.concat([encryptedData, enCipher.final()])

	return encryptedData.toString(output)
}

module.exports.decrypt = (options) => {
	const key = crypto.createHash('sha256').update(String(options.key)).digest('base64').substring(0, 32)
	const algorithm = options.algorithm || 'aes-256-cbc'
	const output = options.output || 'utf8'
	const iv = Buffer.alloc(16, 0)

	const deCipher = crypto.createDecipheriv(algorithm, key, iv)

	let decryptedData = deCipher.update(Buffer.from(options.text, 'hex'))
	decryptedData = Buffer.concat([decryptedData, deCipher.final()])

	return decryptedData.toString(output)
}

module.exports.hash = (options) => {
	const algorithm = options.algorithm || 'sha512'
	const digest = options.digest || 'hex'

	let hash
	if (digest === 'bytes') hash = crypto.createHash(algorithm).update(String(options.text))
	else hash = crypto.createHash(algorithm).update(String(options.text)).digest(digest)

	return hash
}