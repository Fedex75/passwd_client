import axios from 'axios';
import crypto from 'crypto';
import VaultHandler from './VaultHandler';

class Auth {
  constructor(){
    this.authenticated = false;
    this.guest = false;
    //this.host = process.env.NODE_ENV === 'production' ? 'https://bolsa.zaifo.com.ar/' : 'https://bolsatest.zaifo.com.ar/';
    this.host = 'https://gpass.zaifo.com.ar/';
  }

  register(userInfo, cb){
    axios.post(this.host + 'api/auth/register', userInfo, {headers: {'Content-Type': 'application/json'}, withCredentials: true}).then(res => {
      if (res.data.status === 'success'){
        this.authenticated = true;
        cb(null);
      } else {
        cb(res.data.error);
      }
    });
  }

  async login(userInfo, cb){
    await VaultHandler.generateVaultKey(userInfo.password, userInfo.email);
    axios.post(this.host + 'api/auth/login', { email: userInfo.email, auth_key: await VaultHandler.deriveKey(VaultHandler.vaultKey, userInfo.password) }, {headers: {'Content-Type': 'application/json'}, withCredentials: true}).then(res => {
      if (res.data.status === 'success'){
        this.authenticated = true;
        this.user = res.data.data;
        VaultHandler.setVault(this.user.vault);
        cb(null);
      } else {
        cb(res.data.error);
      }
    });
  }

  logOut(cb){
    axios.post(this.host + 'api/auth/logout', {}, {withCredentials: true}).then(() => {
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
