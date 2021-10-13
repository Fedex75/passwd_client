import React from 'react';
import ReactLoading from 'react-loading';
import { useState } from 'react';

function Button(props){
	const [hover, setHover] = useState(false);

	return (
		<div
			className={`button ${props.icon ? 'icon ' : ''} ${props.ghost ? 'ghost ' : ''} ${props.compact ? 'compact ' : ''} ${props.disabled || props.loading ? 'disabled ' : ''} ${props.small ? 'small ' : ''}`}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => {setHover(false)}}
			style={{
				backgroundColor: `var(--${props.color || 'blue'}${(hover && !props.disabled && !props.loading) ? '-dark' : ''})`,
				borderColor: `var(--${props.color || 'blue'}-dark)`,
				color: props.fontColor || 'white'
			}}
			onClick={() => {
				if (!props.disabled && !props.loading && props.onClick){
					props.onClick();
				}
			}
		}>
			{(() => {if (props.icon && !props.loading) return <i className={props.icon}></i>})()}
			{(() => {if (props.loading) return <ReactLoading type="spin" color="white" height="20px" width="20px"/>})()}
			{(() => {if (props.title) return <div className="button__title">{props.title}</div>})()}
		</div>
	)
}

export default Button;
