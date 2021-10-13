import React, { useState } from 'react';
import { withRouter } from 'react-router';
import qs from 'qs';
import Auth from '../Auth';
import Button from './Button';
import Input from './Input';

function Topbar(props){
	const [search, setSearch] = useState(qs.parse(props.location.search.substring(1)).search);

	const handleSearch = () => {
		props.history.push(`/vault${search !== '' ? `?search=${search}` : ''}`);
	};

	return (
		<div className="topbar">
			<div className="topbar__logo_wrapper">
				<i className="fas fa-lock"></i>
				<p className="topbar__logo_wrapper__title">passwd</p>
			</div>
			<Input spellCheck={false} icon="fas fa-search" value={search} onChange={setSearch} onEnter={handleSearch} />
			<div className="topbar__buttons">
				<Button ghost icon="fas fa-user" title={Auth.user.name} />
			</div>
		</div>
	);
}

export default withRouter(Topbar);