import axios from 'axios';
import API from './API';
import VaultHandler from './VaultHandler';

class Auth {
	constructor(){
		this.authenticated = false;
		//this.host = 'https://passwd.zaifo.com.ar';
		this.host = 'http://localhost:8161';
	}

	register(userInfo, cb){
		return new Promise(async (resolve, reject) => {
			await VaultHandler.generateVaultKey(userInfo.password, userInfo.email);

			const data = {
				name: userInfo.name,
				email: userInfo.email,
				auth_key: await VaultHandler.deriveKey(VaultHandler.vaultKey, userInfo.password)
			};

			try {
				const res = await axios.post(this.host + '/api/auth/register', data, {headers: {'Content-Type': 'application/json'}, withCredentials: true});

				if (res.data.status === 'success'){
					await this.login(userInfo);
					resolve();
				} else reject(res.data.data);
			} catch(e){
				reject(e.response.data.data);
			}
		});
	}

	login(userInfo, cb){
		return new Promise(async (resolve, reject) => {
			await VaultHandler.generateVaultKey(userInfo.password, userInfo.email);

			const data = {
				email: userInfo.email,
				auth_key: await VaultHandler.deriveKey(VaultHandler.vaultKey, userInfo.password)
			};

			try {
				const res = await axios.post(this.host + '/api/auth/login', data, {headers: {'Content-Type': 'application/json'}, withCredentials: true});
				
				if (res.data.status === 'success'){
					this.authenticated = true;
					this.auth_token = res.data.data.auth_token;
					this.user = (await axios.get(this.host + '/api/auth/userInfo', {headers: {'Authorization': this.auth_token}})).data.data;	
					VaultHandler.setVault(await API.getVault());
					resolve();
				} else reject(res.data.data);
			} catch(e) {
				reject(e.response.data.data);
			}
		});
	}

	logOut(cb){
		axios.post(this.host + '/api/auth/logout', {}, {headers: {'Authorization': this.auth_token}, withCredentials: true}).then(() => {
			this.authenticated = false;
			this.user = null;
			cb();
		});
	}

	isAuthenticated(){
		return this.authenticated;
	}
}

export default new Auth();
