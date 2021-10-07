import crypto from 'crypto';

class VaultHandler {
	constructor(){
		this.algorithm = 'aes256';
  	this.inputEncoding = 'utf8';
  	this.ivlength = 16; //AES blocksize
		this.outputEncoding = 'hex';
		this.vaultKey = '';
	}

	decrypt(ciphertext){
		let components = ciphertext.split(':');
    let iv_from_ciphertext = Buffer.from(components.shift(), this.outputEncoding);
    let decipher = crypto.createDecipheriv(this.algorithm, this.key, iv_from_ciphertext);
    let deciphered = decipher.update(components.join(':'), this.outputEncoding, this.inputEncoding);
    deciphered += decipher.final(this.inputEncoding);
		return deciphered;
	}

	deriveKey(secret, salt) {
    return new Promise((res, rej) => {
        crypto.pbkdf2(secret, salt, 100000, 32, 'sha512', (err, derivedKey) => {
            if (err) rej(err);
            res(derivedKey.toString('hex'));
        });
    });
  }

	generateVaultKey(password, email){
		return new Promise(async (res, rej) => {
			this.vaultKey = await this.deriveKey(password, email);
			this.key = Buffer.from(this.vaultKey, 'hex'); // key must be 32 bytes for aes256
			res();
		});
	}

	setVault(v){
		this.vault = JSON.parse(this.decrypt(v));
	}

}

export default new VaultHandler();