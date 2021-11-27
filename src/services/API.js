import axios from 'axios';
import Auth from './Auth';

class API {
	constructor(){
		//this.host = 'https://passwd.zaifo.com.ar';
		this.host = 'http://localhost:8161';
	}

	getVault(){
		return new Promise((resolve, reject) => {
			axios.get(this.host + '/api/vaults/getUserVault', {headers: {'Authorization': Auth.auth_token}}).then(res => {
				resolve(res.data.data);
			});
		});
	}

	postVault(newVault){
		return new Promise((resolve, reject) => {
			axios.post(this.host + '/api/vaults/setUserVault', newVault, {headers: {'Authorization': Auth.auth_token}}).then(res => {
				resolve(res.data);
			});
		});
	}
}

export default new API();
