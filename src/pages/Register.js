import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import {Input, Label, Button} from '../components';
import Auth from '../Auth';
import '../styles/Login.css';

function Register(props) {
	const [name, setName] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [loading, setLoading] = React.useState(false);

	const afterRegister = async redir => {
		props.history.replace(props.location.state ? props.location.state.redirect : redir);
	};

	const register = () => {
		setLoading(true);
		Auth.register({ name: name.trim(), email: email.trim().toLowerCase(), password: password }).then(() => {
			setLoading(false);
			afterRegister('/vault');
		}).catch(e => {
			setLoading(false);
			console.log(`Error al registrar usuario: ${e}`);
		});
	};

	return (
		<div className="login_wrapper">
			<div className="login_form">
				<i className="login__icon fas fa-lock"></i>
				<p className="login__title">Registrarse</p>
				<p className="login__subtitle">para almacenar datos de forma segura</p>
				<Label>Nombre completo</Label>
				<Input autoFocus spellCheck={false} value={name} onChange={setName}/>
				<Label>Correo electrónico</Label>
				<Input spellCheck={false} value={email} onChange={setEmail}/>
				<Label>Contraseña</Label>
				<Input type="password" value={password} onChange={setPassword} onEnter={register}/>
				<div style={{height: '20px'}}></div>
				<Button title="Siguiente" disabled={name === '' || email === '' || password === ''} loading={loading} onClick={register}/>
				<div className="login__suggestion_wrapper">
					<p className="login__suggestion">¿Ya tenés una cuenta?</p>
					<Link to="/login">Iniciá sesión</Link>
				</div>
			</div>
		</div>
	)
}

export default withRouter(Register);
