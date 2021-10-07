import React from 'react';
import Button from './Button';

function Topbar(props){
	return (
		<div className="topbar">
			<div className="topbar__logo_wrapper">
				<i className="fas fa-unlock-alt"></i>
				<p className="topbar__logo_wrapper__title">Gpass</p>
			</div>
			<div className="topbar__buttons">
				<Button ghost icon="fas fa-user" />
			</div>
		</div>
	);
}

export default Topbar;