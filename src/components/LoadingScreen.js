import React from 'react';
import ReactLoading from 'react-loading';
import logo from '../gemini.png';

export default function LoadingScreen(props) {
	return (
		<div className="loading">
			<div className="loading__logo-wrapper">
				<img className="loading__logo" src={logo} alt="Gemini"/>
				<div className="loading__logo__text">Finanzas</div>
			</div>
			<div className="animation-wrapper"><ReactLoading type="bars" color="var(--main-color)" /></div>
		</div>
	);
}