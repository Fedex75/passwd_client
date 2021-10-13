import React from 'react';

function Form(props){
	return (
		<div className="form">
			{(() => {if (props.title) { return <div className="form__title">{props.title}</div>}})()}
			{(() => {if (props.subtitle) { return <div className="form__subtitle">{props.subtitle}</div>}})()}
			{props.children}
		</div>
	)
}

export default Form;
