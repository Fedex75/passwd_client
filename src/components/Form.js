import React from 'react';

export default function Form({title, subtitle, children}){
	return (
		<div className="form">
			{title ? <div className="form__title">{title}</div> : null}
			{subtitle ? <div className="form__subtitle">{subtitle}</div> : null}
			{children}
		</div>
	)
}
