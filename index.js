require('dotenv').config()
const crypto = require('crypto');

const key = crypto.createHash('sha256').update(String(process.env.CRYPTO_KEY)).digest('base64').substr(0, 32);

const iv = Buffer.from(process.env.CRYPTO_KEY, "base64").toString('hex').slice(0, 16)

function encrypt(value) {
	let crypted = ''
	const cipher = crypto.createCipheriv(process.env.ALGO, key, iv)
	cipher.on('readable', () => {
		let chunk;
		while (null !== (chunk = cipher.read())) {
			crypted += chunk.toString('hex');
		}
	})
	cipher.write(value);
	cipher.end()
	return crypted
}

function decrypt(value) {
	let decrypted = ''
	const decipher = crypto.createDecipheriv(process.env.ALGO, key, iv)
	decipher.on('readable', () => {
		let chunk;
		while (null !== (chunk = decipher.read())) {
			decrypted += chunk.toString('utf8');
		}
	})
	decipher.write(value, 'hex');
	decipher.end()
	return decrypted
}

module.exports = { encrypt, decrypt }
