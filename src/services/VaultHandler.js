import crypto from 'crypto';
import API from './API';

class VaultHandler {
	constructor(){
		this.algorithm = 'aes256';
		this.inputEncoding = 'utf8';
		this.ivlength = 16; //AES blocksize
		this.outputEncoding = 'hex';
		this.vaultKey = '';
		this.vaultSubscriptions = new Map();
		this.vaultSubscriptionsCounter = 0;
	}

	subscribeToVault(cb){
		let key = this.vaultSubscriptionsCounter++;
		this.vaultSubscriptions.set(key, cb);
		return () => {
			this.vaultSubscriptions.delete(key);
		};
	}

	notifyVault(){
		this.vaultSubscriptions.forEach(cb => {
			cb(this.vault);
		});
	}

	decrypt(ciphertext){
		let components = ciphertext.split(':');
		let iv_from_ciphertext = Buffer.from(components.shift(), this.outputEncoding);
		let decipher = crypto.createDecipheriv(this.algorithm, this.key, iv_from_ciphertext);
		let deciphered = decipher.update(components.join(':'), this.outputEncoding, this.inputEncoding);
		deciphered += decipher.final(this.inputEncoding);
		return deciphered;
	}

	encrypt(text){
		let iv = crypto.randomBytes(this.ivlength);
		let cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
		let ciphered = cipher.update(text, this.inputEncoding, this.outputEncoding);
		ciphered += cipher.final(this.outputEncoding);
		let ciphertext = iv.toString(this.outputEncoding) + ':' + ciphered;

    	return ciphertext;
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
			this.key = Buffer.from(this.vaultKey, 'hex');
			res();
		});
	}

	getEncryptedVault(vault){
		let newVault = JSON.parse(JSON.stringify(vault)); //Clonar el objeto sin referencia
		newVault.data.passwords.forEach(pw => {
			pw.name = this.encrypt(pw.name);
			pw.user = this.encrypt(pw.user);
			pw.password = this.encrypt(pw.password);
		});
		return newVault;
	}

	setVault(v){
		this.vault = v;
		this.vault.data.passwords.forEach(pw => {
			pw.name = this.decrypt(pw.name);
			pw.user = this.decrypt(pw.user);
			pw.password = this.decrypt(pw.password);
		});
	}

	deletePassword(index){
		return new Promise(async (resolve, reject) => {
			this.vault.data.passwords.splice(index, 1);
			await API.postVault(this.getEncryptedVault(this.vault));
			this.notifyVault();
			resolve();
		});
	}

	addPassword(data){
		return new Promise(async (resolve, reject) => {
			this.vault.data.passwords.push(data);
			await API.postVault(this.getEncryptedVault(this.vault));
			this.notifyVault();
			resolve();
		});
	}

	updatePassword(index, data){
		return new Promise(async (resolve, reject) => {
			this.vault.data.passwords[index] = data;
			await API.postVault(this.getEncryptedVault(this.vault));
			this.notifyVault();
			resolve();
		});
	}
}

export default new VaultHandler();