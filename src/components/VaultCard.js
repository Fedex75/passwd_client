import React, {useState} from 'react';
import {Button, Input, ModalForm, ColorChooser} from './';
import VaultHandler from '../services/VaultHandler';
import {generatePassword, colors} from '../utils/Vault';

export default function Card({data, index}){
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
		setEditFormName(data.name);
		setEditFormUser(data.user);
		setEditFormPassword(data.password);
		setEditFormColor(data.color);
		setEditing(true);
	};

	const handleEditFinish = () => {
		if (editFormName !== '' && editFormUser !== '' && editFormPassword !== ''){
			setLoading(true);
			VaultHandler.updatePassword(index, {
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

	const randomizePassword = () => { setEditFormPassword(generatePassword()) };

	const deleteHandler = () => {
		setLoading(true);
		VaultHandler.deletePassword(index).then(() => { closeDeleteModal() });
	};

	return (
		<>
			{
				editing ?
				<div className="vault__card-wrapper">
					<div className="vault__card" style={{backgroundColor: `var(--${editFormColor})`, borderColor: `var(--${editFormColor}-dark)`, position: 'absolute', boxShadow: '0 0 0 10px rgba(255, 255, 255, 100%)'}}>
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
				<div className="vault__card" style={{backgroundColor: `var(--${data.color})`, borderColor: `var(--${data.color}-dark)`}}>
					<div className="vault__card__top_bar">
						<p className="vault__card__top_bar__title">{data.name}</p>
						<Button ghost icon="fas fa-pencil-alt" onClick={handleEditClick} />
						<Button ghost icon="fas fa-trash-alt" onClick={openDeleteModal} />
					</div>
					<div className="vault__card__content">
						<p className="vault__card__label">Usuario</p>
						<Input disabled value={data.user} buttons={[<Button ghost icon="far fa-copy" fontColor="var(--primary-text-color)" onClick={() => copyToClipboard(data.user)} />]}/>
						<p className="vault__card__label">Contraseña</p>
						<Input disabled type="password" value={data.password} buttons={[<Button ghost icon="far fa-copy" fontColor="var(--primary-text-color)" onClick={() => copyToClipboard(data.password)} />]}/>
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
				<p style={{padding: 10, color: 'white'}}>¿Está seguro de que quiere eliminar la contraseña de {data.name}?</p>
			</ModalForm>
		</>
	);
}