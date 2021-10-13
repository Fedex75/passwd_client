import axios from 'axios';
import API from './API';
import VaultHandler from './VaultHandler';

class Auth {
	constructor(){
		this.authenticated = false;
		this.host = 'https://passwd.zaifo.com.ar';
	}

	async register(userInfo, cb){
		await VaultHandler.generateVaultKey(userInfo.password, userInfo.email);
		axios.post(this.host + '/api/auth/register', { name: userInfo.name, email: userInfo.email, auth_key: await VaultHandler.deriveKey(VaultHandler.vaultKey, userInfo.password) }, {headers: {'Content-Type': 'application/json'}, withCredentials: true}).then(res => {
			if (res.data.status === 'success'){
				this.login(userInfo, () => {
					cb(null);
				});
			} else {
				cb(res.data.data);
			}
		});
	}

	async login(userInfo, cb){
		await VaultHandler.generateVaultKey(userInfo.password, userInfo.email);
		axios.post(this.host + '/api/auth/login', { email: userInfo.email, auth_key: await VaultHandler.deriveKey(VaultHandler.vaultKey, userInfo.password) }, {headers: {'Content-Type': 'application/json'}, withCredentials: true}).then( async res => {
			if (res.data.status === 'success'){
				this.authenticated = true;
				this.auth_token = res.data.data.auth_token;
				
				this.user = (await axios.get(this.host + '/api/auth/userInfo', {headers: {'Authorization': this.auth_token}})).data.data;	
				VaultHandler.setVault(await API.getVault());
				cb(null);
			} else {
				cb(res.data.data);
			}
		});
	}

	logOut(cb){
		axios.post(this.host + '/api/auth/logout', {}, {withCredentials: true}).then(() => {
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
