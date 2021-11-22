import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import {Label, Button, Input} from '../components';
import Auth from '../Auth';
import '../styles/Login.css';

function Login({history, location}) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const afterLogin = async redir => {
		history.replace(location.state ? location.state.redirect : redir);
	};

	const login = () => {
		setLoading(true);
		Auth.login({ email: email.trim().toLowerCase(), password: password }).then(() => {
			setLoading(false);
			afterLogin('/vault');
		}).catch(e => {
			setLoading(false);
			setError(e);
		});
	};

	return (
		<div className="login_wrapper">
			<div className="login_form">
				<i className="login__icon fas fa-lock"></i>
				<p className="login__title">Iniciar sesión</p>
				<p className="login__subtitle">para acceder a tus datos</p>
				<Label>Correo electrónico</Label>
				<Input autoFocus spellCheck={false} value={email} onChange={setEmail} error={error && error.type === 'email'}/>
				<p className="input_error">{(error && error.type === 'user') ? error.msg : ' '}</p>
				<Label>Contraseña</Label>
				<Input type="password" value={password} onChange={setPassword} error={error && error.type === 'password'} onEnter={login} />
				<p className="input_error">{(error && error.type === 'password') ? error.msg : ' '}</p>
				<Button title="Acceder" disabled={email === '' || password === ''} loading={loading} onClick={login} />
				<div className="login__suggestion_wrapper">
					<p className="login__suggestion">¿No tenés una cuenta?</p>
					<Link to="/register">Registrate</Link>
				</div>
			</div>
		</div>
	)
}

export default withRouter(Login);
