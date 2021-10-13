import React, { useEffect } from 'react';
import Auth from '../../Auth';
import { withRouter } from 'react-router';
import Label from '../../components/Label';
import Button from '../../components/Button';
import Input from '../../components/Input';
import './Login.css';
import { Link } from 'react-router-dom';

function Login(props) {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [error, setError] = React.useState(null);
	const [loading, setLoading] = React.useState(false);

	const afterLogin = async redir => {
		props.history.replace(props.location.state ? props.location.state.redirect : redir);
	};

	const login = () => {
		setLoading(true);
		Auth.login({ email: email.trim().toLowerCase(), password: password }, err => {
			setLoading(false);
			if (err) {
				setError(err);
				console.log(`err: ${err}`);
			}
			else {
				afterLogin('/vault');
			}
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
				<div className="login__register_wrapper">
					<p className="login__register">¿No tenés una cuenta?</p>
					<Link to="/register">Registrate</Link>
				</div>
			</div>
		</div>
	)
}

export default withRouter(Login);
