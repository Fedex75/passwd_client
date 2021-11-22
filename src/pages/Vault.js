import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import * as JsSearch from 'js-search';
import qs from 'qs';
import {Button, ColorChooser, Input, ModalForm, Section, VaultCard} from '../components';
import VaultHandler from '../VaultHandler';
import {generatePassword, colors} from '../utils/Vault';
import '../styles/Vault.css';
import Auth from '../Auth';

function Vault({history, location}){
	const [vault, setVault] = useState(JSON.parse(JSON.stringify(VaultHandler.vault)));
	const [search, setSearch] = useState(qs.parse(location.search.substring(1)).search);
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
		const unsubscribeVault = VaultHandler.subscribeToVault(handleVaultChange);
		return () => {
			unsubscribeVault();
		};
	}, []);

	useEffect(() => {
		let unlisten = history.listen((location, action) => {
			setSearch(qs.parse(location.search.substring(1)).search);
		});
		const timer = setTimeout(() => {
			Auth.logOut();
			history.replace('/login');
		}, 15 * 60 * 1000);
		return () => {	
			unlisten();
			clearTimeout(timer);
		};
	}, [history]);

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
					<Button icon="fas fa-times" color="red" title="Cancelar" onClick={() => {history.push('/vault')}} />
				</div>
				{
					searchResults.length > 0 ?
					<div className="vault__cards_wrapper">
						{searchResults.map((pw, i) => (
							<VaultCard key={i} index={i} data={pw} />
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
				{vault.data.passwords.map((pw, i) => ( <VaultCard key={i} index={i} data={pw} /> ))}
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