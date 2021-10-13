import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import * as JsSearch from 'js-search';
import qs from 'qs';
import Button from '../../components/Button';
import ColorChooser from '../../components/ColorChooser';
import Input from '../../components/Input';
import ModalForm from '../../components/ModalForm';
import Section from '../../components/Section';
import VaultHandler from '../../VaultHandler';
import './Vault.css';

const generatePassword = () => {
	let result = '';
	let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&/-_*+';
	let charactersLength = characters.length;
	for (let i = 0; i < Math.floor(Math.random() * 4) + 12; i++) result += characters.charAt(Math.floor(Math.random() * charactersLength));
 return result;
}

const colors = ['red', 'orange', 'yellow', 'green', 'turquoise', 'light-blue', 'blue', 'purple', 'gray'];

function Card(props){
	const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [editing, setEditing] = useState(false);
	const [editFormName, setEditFormName] = useState('');
	const [editFormUser, setEditFormUser] = useState('');
	const [editFormPassword, setEditFormPassword] = useState('');
	const [editFormColor, setEditFormColor] = useState('');

	const openDeleteModal = () => { setDeleteModalIsOpen(true) };
	const closeDeleteModal = () => { setDeleteModalIsOpen(false) };

	const copyToClipboard = text => {
		navigator.clipboard.writeText(text);
	};

	const handleEditClick = () => {
		setEditFormName(props.data.name);
		setEditFormUser(props.data.user);
		setEditFormPassword(props.data.password);
		setEditFormColor(props.data.color);
		setEditing(true);
	};

	const handleEditFinish = () => {
		if (editFormName !== '' && editFormUser !== '' && editFormPassword !== ''){
			setLoading(true);
			VaultHandler.updatePassword(props.index, {
				name: editFormName,
				user: editFormUser,
				password: editFormPassword,
				color: editFormColor
			}).then(() => {
				setEditing(false);
				setLoading(false);
			});
		}
	};

	const randomizePassword = () => {
		setEditFormPassword(generatePassword());
	};

	const deleteHandler = () => {
		setLoading(true);
		VaultHandler.deletePassword(props.index).then(() => {
			closeDeleteModal();
		});
	};

	return (
		<>
			{
				editing ?
				<div className="vault__card-wrapper">
					<div className="vault__card" style={{backgroundColor: `var(--${editFormColor})`, borderColor: `var(--${editFormColor}-dark)`, position: 'absolute', boxShadow: '0 0 0 5px rgba(0, 0, 0, 10%)'}}>
						<div className="vault__card__top_bar">
							<p className="vault__card__top_bar__title">Editar</p>
							<Button ghost icon="fas fa-times" onClick={() => {setEditing(false)}} />
							<Button ghost disabled={editFormName === '' || editFormUser === '' || editFormPassword === ''} loading={loading} icon="fas fa-check" onClick={handleEditFinish} />
						</div>
						<div className="vault__card__content">
							<p className="vault__card__label">Nombre</p>
							<Input value={editFormName} onChange={setEditFormName} onEnter={handleEditFinish} />
							<p className="vault__card__label">Usuario</p>
							<Input value={editFormUser} onChange={setEditFormUser} onEnter={handleEditFinish} />
							<p className="vault__card__label">Contraseña</p>
							<Input type="password" value={editFormPassword} onChange={setEditFormPassword} buttons={[<Button ghost icon="fas fa-random" fontColor="var(--primary-text-color)" onClick={randomizePassword} />]} onEnter={handleEditFinish} />
							<p>Color</p>
							<ColorChooser colors={colors} value={editFormColor} onChange={setEditFormColor} />
						</div>
					</div>
				</div> :
				<div className="vault__card" style={{backgroundColor: `var(--${props.data.color})`, borderColor: `var(--${props.data.color}-dark)`}}>
					<div className="vault__card__top_bar">
						<p className="vault__card__top_bar__title">{props.data.name}</p>
						<Button ghost icon="fas fa-pencil-alt" onClick={handleEditClick} />
						<Button ghost icon="fas fa-trash-alt" onClick={openDeleteModal} />
					</div>
					<div className="vault__card__content">
						<p className="vault__card__label">Usuario</p>
						<Input disabled value={props.data.user} buttons={[<Button ghost icon="far fa-copy" fontColor="var(--primary-text-color)" onClick={() => copyToClipboard(props.data.user)} />]}/>
						<p className="vault__card__label">Contraseña</p>
						<Input disabled type="password" value={props.data.password} buttons={[<Button ghost icon="far fa-copy" fontColor="var(--primary-text-color)" onClick={() => copyToClipboard(props.data.password)} />]}/>
					</div>	
				</div>
			}
			<ModalForm
				isOpen={deleteModalIsOpen}
				onRequestClose={closeDeleteModal}
				title="Confirmar"
				buttons={[
					<Button icon="fas fa-times" title="No" color="red" disabled={loading} onClick={closeDeleteModal} />,
					<Button icon="fas fa-check" title="Sí" color="green" loading={loading} onClick={deleteHandler} />
				]}
			>
				<p style={{padding: 10, color: 'white'}}>¿Está seguro de que quiere eliminar la contraseña de {props.data.name}?</p>
			</ModalForm>
		</>
	);
}

function Vault(props){
	const [vault, setVault] = useState(JSON.parse(JSON.stringify(VaultHandler.vault)));
	const [search, setSearch] = useState(qs.parse(props.location.search.substring(1)).search);
	const [newModalIsOpen, setNewModalIsOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [newPasswordName, setNewPasswordName] = useState('');
	const [newPasswordUser, setNewPasswordUser] = useState('');
	const [newPasswordPassword, setNewPasswordPassword] = useState('');
	const [newPasswordColor, setNewPasswordColor] = useState(null);

	const openNewModal = () => {
		if (!newPasswordColor) setNewPasswordColor(colors[Math.floor(Math.random() * colors.length)]);
		setNewModalIsOpen(true);
	};
	const closeNewModal = () => { setNewModalIsOpen(false) };

	const newHandler = () => {
		setLoading(true);
		VaultHandler.addPassword({
			name: newPasswordName,
			user: newPasswordUser,
			password: newPasswordPassword,
			color: newPasswordColor
		}).then(() => {
			setNewPasswordName('');
			setNewPasswordUser('');
			setNewPasswordPassword('');
			setNewPasswordColor(null);
			setLoading(false);
			closeNewModal();
		});
	};

	const handleVaultChange = newVault => {
		setVault(JSON.parse(JSON.stringify(newVault)));
	};

	const randomizePassword = () => {
		setNewPasswordPassword(generatePassword());
	};

	useEffect(() => {
		let unsubscribeVault = VaultHandler.subscribeToVault(handleVaultChange);
		let unlisten = props.history.listen((location, action) => {
			setSearch(qs.parse(location.search.substring(1)).search);
		});
		return () => {
			unsubscribeVault();
			unlisten();
		};
	}, [props.history]);

	if (search){
		let searchObject = new JsSearch.Search(search);
		searchObject.addIndex('name');		
		searchObject.addIndex('user');
		searchObject.addDocuments(vault.data.passwords);
		let searchResults = searchObject.search(search);
		return (
			<Section name="vault">
				<p className="vault__title">{`Resultados de la búsqueda "${search}"`}</p>
				<div className="vault__buttons_wrapper">
					<Button icon="fas fa-times" color="red" title="Cancelar" onClick={() => {props.history.push('/vault')}} />
				</div>
				{
					searchResults.length > 0 ?
					<div className="vault__cards_wrapper">
						{searchResults.map((pw, i) => (
							<Card key={i} index={i} data={pw} />
						))}
					</div> :
					<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto'}}>
						<p style={{fontSize: 30}}>No encontramos nada :/</p>
					</div>
				}
			</Section>
		);
	}

	return (
		<Section name="vault">
			<p className="vault__title">Contraseñas</p>
			<div className="vault__buttons_wrapper">
				<Button icon="fas fa-plus" title="Nuevo" onClick={openNewModal} />
			</div>
			<div className="vault__cards_wrapper">
				{vault.data.passwords.map((pw, i) => (
					<Card key={i} index={i} data={pw} />
				))}
			</div>
			<ModalForm
				isOpen={newModalIsOpen}
				onRequestClose={closeNewModal}
				title="Nueva contraseña"
				color={newPasswordColor}
				buttons={[
					<Button icon="fas fa-times" title="Cancelar" color="red" disabled={loading} onClick={closeNewModal} />,
					<Button icon="fas fa-check" title="Listo" color="green" disabled={newPasswordName === '' || newPasswordUser === '' || newPasswordPassword === ''} loading={loading} onClick={newHandler} />
				]}
			>
				<p>Nombre</p>
				<Input autoFocus value={newPasswordName} onChange={setNewPasswordName} />
				<p>Ususario</p>
				<Input value={newPasswordUser} onChange={setNewPasswordUser} />
				<p>Contraseña</p>
				<Input
					type="password"
					value={newPasswordPassword}
					onChange={setNewPasswordPassword}
					buttons={[<Button ghost icon="fas fa-random" fontColor="var(--primary-text-color)" onClick={randomizePassword} />]}
					onEnter={newHandler}
				/>
				<p>Color</p>
				<ColorChooser colors={colors} value={newPasswordColor} onChange={setNewPasswordColor} />
			</ModalForm>
		</Section>
	);
}

export default withRouter(Vault);