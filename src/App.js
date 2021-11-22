import React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import ReactModal from 'react-modal';
import { ProtectedRoute } from './components';
import { Register, Login, Vault } from './pages';
import './styles/App.css';
import './styles/UI.css';

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
