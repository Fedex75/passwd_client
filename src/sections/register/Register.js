import React from 'react';
import Auth from '../../Auth';
import { withRouter } from 'react-router';
import Label from '../../components/Label';
import Button from '../../components/Button';
import Input from '../../components/Input';
import './Register.css';
import { Link } from 'react-router-dom';

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
		Auth.register({ name: name.trim(), email: email.trim().toLowerCase(), password: password }, err => {
			setLoading(false);
			if (err) {
				console.log(`err: ${err}`);
			}
			else {
				afterRegister('/vault');
			}
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
				<div className="login__register_wrapper">
					<p className="login__register">¿Ya tenés una cuenta?</p>
					<Link to="/login">Iniciá sesión</Link>
				</div>
			</div>
		</div>
	)
}

export default withRouter(Register);
