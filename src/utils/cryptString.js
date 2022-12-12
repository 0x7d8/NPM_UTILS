const crypto = require('crypto')

module.exports.encrypt = (json) => {
	const key = crypto.createHash('sha256').update(String(json.key)).digest('base64').substring(0, 32)
	const algorithm = json.algorithm || 'aes-256-cbc'
	const output = json.output || 'hex'
	const iv = Buffer.alloc(16, 0)

	const enCipher = crypto.createCipheriv(algorithm, key, iv)
	let encryptedData = enCipher.update(json.text)
	encryptedData = Buffer.concat([encryptedData, enCipher.final()])

	return encryptedData.toString(output)
}

module.exports.decrypt = (json) => {
	const key = crypto.createHash('sha256').update(String(json.key)).digest('base64').substring(0, 32)
	const algorithm = json.algorithm || 'aes-256-cbc'
	const output = json.output || 'utf8'
	const iv = Buffer.alloc(16, 0)

	const deCipher = crypto.createDecipheriv(algorithm, key, iv)

	let decryptedData = deCipher.update(Buffer.from(json.text, 'hex'))
	decryptedData = Buffer.concat([decryptedData, deCipher.final()])

	return decryptedData.toString(output)
}