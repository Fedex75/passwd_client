import React from 'react';
import Topbar from './Topbar';

export default function Section({name, children}){
	return (
		<div className="section">
			<Topbar />
			<div className="section__content" id={name}>
				{children}
			</div>
		</div>
	)
}
