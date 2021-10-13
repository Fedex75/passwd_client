import React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './sections/register/Register';
import Login from './sections/login/Login';
import Vault from './sections/vault/Vault';
import './styles/App.css';
import './styles/UI.css';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

function App() {
	return (
		<BrowserRouter>
			<Route exact path="/" render = { () => <Redirect to = "/login" />} />
			<Route path="/register" component = {Register} />
			<Route path="/login" component = {Login} />
			<ProtectedRoute path="/vault" component = {Vault} />
		</BrowserRouter >
	);
}

export default App;
