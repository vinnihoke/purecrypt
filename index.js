require('dotenv').config()
const crypto = require('crypto');

const key = crypto.scryptSync(process.env.CRYPTO_KEY, 'salt', Number(process.env.SALT_VALUE));
const iv = Buffer.alloc(16, 0)

const purecrypt = {
	encrypt(value) {
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
	},
	decrypt(value) {
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
}

// const pureCrypt = (method, value) => {
// 	if (method == "encrypt") {
// 		let crypted = ''
// 		const cipher = crypto.createCipheriv(process.env.ALGO, key, iv)
// 		cipher.on('readable', () => {
// 			let chunk;
// 			while (null !== (chunk = cipher.read())) {
// 				crypted += chunk.toString('hex');
// 			}
// 		})
// 		cipher.write(value);
// 		cipher.end()
// 		return crypted
// 	} else if (method == "decrypt") {
// 		let decrypted = ''
// 		const decipher = crypto.createDecipheriv(process.env.ALGO, key, iv)
// 		decipher.on('readable', () => {
// 			let chunk;
// 			while (null !== (chunk = decipher.read())) {
// 				decrypted += chunk.toString('utf8');
// 			}
// 		})
// 		decipher.write(value, 'hex');
// 		decipher.end()
// 		return decrypted
// 	}
// }

module.exports = { purecrypt }
