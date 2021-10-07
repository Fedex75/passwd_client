import React, { useEffect } from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './sections/login/Login';
import Auth from './Auth';
import Vault from './sections/vault/Vault';

let maintenance = false;

function App() {
	useEffect(() => {
		window.addEventListener('beforeunload', event => {
			Auth.logOut();
		});
	});

	if (maintenance){
		return (
			<div style={{height: '100%', display: 'flex', flexFlow: 'column', justifyContent: 'center', alignItems: 'center'}}>
				<div style={{fontSize: '30px'}}>Estamos realizando mantenimiento</div>
			</div>
		);
	} 
	return (
		<BrowserRouter>
			<Route exact path="/" render = { () => <Redirect to = "/login" />} />
			<Route path="/login" component = {Login} />
			<ProtectedRoute path="/vault" component = {Vault} />
		</BrowserRouter >
	);
}

export default App;
