import React, { useEffect } from 'react';
import Auth from '../../Auth';
import API from '../../API';
import LoadingScreen from '../../components/LoadingScreen';
import { withRouter } from 'react-router';
import Form from '../../components/Form';
import FormContent from '../../components/FormContent';
import Label from '../../components/Label';
import FormButtons from '../../components/FormButtons';
import Button from '../../components/Button';
import Input from '../../components/Input';

function Login(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [hidden, setHidden] = React.useState(false);
    const [error, setError] = React.useState();

    const afterLogin = async redir => {
        await API.refresh();
        props.history.replace(props.location.state ? props.location.state.redirect : redir);
    };

    const login = () => {
        Auth.login({ email: email.trim().toLowerCase(), password: password }, err => {
            if (err) {
                setError(err);
                console.log(`err: ${err}`);
            }
            else {
                afterLogin('/vault');
            }
        });
    };

    if (hidden) return <LoadingScreen />;
    return (
        <div className="login_wrapper">
                <Form>
                    <FormContent>
                        <div className="form__title">Acceder</div>
                        <Label>Correo electrónico</Label>
                        <Input spellCheck={false} value={email} onChange={setEmail} />
                        <div className="error">{(error && error.type === 'user') ? error.msg : ''}</div>
                        <Label>Contraseña</Label>
                        <Input type="password" value={password} onChange={setPassword} />
                        <div className="error">{(error && error.type === 'password') ? error.msg : ''}</div>
                    </FormContent>
                    <FormButtons>
                        <Button title="Siguiente" disabled={email === '' || password === ''} onClick={login} />
                    </FormButtons>
                </Form>
        </div>
    )
}

export default withRouter(Login);
