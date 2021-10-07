import axios from 'axios';
import Auth from './Auth';

class API {
    constructor(){
        this.miningStats = null;
        this.capital = null;
        this.capitalSubscriptions = [];
        this.prices = new Map([['ETH', null], ['RVN', null], ['BTC', null]]);
        //this.host = process.env.NODE_ENV === 'production' ? 'https://bolsa.zaifo.com.ar/' : 'https://bolsatest.zaifo.com.ar/';
        this.host = 'https://gpass.zaifo.com.ar/';
    }

    getMiningStats(){
        return new Promise((resolve, reject) => {
            axios.get(`${this.host}api/miningstats`, { withCredentials: true }).then(res => {
                this.miningStats = res.data;
                resolve();
            });
        });
    }

    getCapital(){
        return new Promise((resolve, reject) => {
            axios.get(`${this.host}api/admin/capital`, { withCredentials: true }).then(res => {
                this.capital = res.data;
                resolve();
            });
        });
    }

    subscribeToCapital(cb){
        this.capitalSubscriptions.push(cb);
    }

    async updateCapitalAndNotify(){
        await this.getCapital();
        this.capitalSubscriptions.forEach(cb => { cb(this.capital) });
    }

    postCapitalVariation(data){
        return new Promise(async (resolve, reject) => {
            await axios.post(`${this.host}api/admin/capital/variation`, data, { withCredentials: true });
            await this.updateCapitalAndNotify();
            resolve();
        });
    }

    getPrices(){
        return new Promise(async (resolve, reject) => {
            let data = (await axios.get(`${this.host}api/prices`, {withCredentials: true})).data;
            data.forEach(item => {
                this.prices.set(item.currency, item.price);
            });
            resolve();
        });
    }

    refresh(){
        return new Promise(async (resolve, reject) => {
            /*if (Auth.authenticated){
                await this.getMiningStats();
                await this.getPrices();
                if (Auth.user.role === 'role_admin'){
                    await this.getCapital();
                }
            }*/
            resolve();
        });
    }
}

export default new API();
