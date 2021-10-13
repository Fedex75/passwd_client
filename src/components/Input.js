import React, { useRef, useState } from 'react';
import Button from './Button';

function Input(props){
	const [focus, setFocus] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const textInput = useRef(null);

	const handleEyeClick = () => {
		setShowPassword(!showPassword);
	};

	const handleKeyDown = e => {
		if (e.key === 'Enter' && props.onEnter){
			textInput.current.blur();
			props.onEnter();
		}
	};

	return (
		<div className={`input ${props.compact ? 'compact ' : ''} ${focus ? 'focus ' : ''} ${props.width ? 'fit-content' : ''} ${props.noMargin ? 'no-margin' : ''}`}>
			{(() => {if (props.icon) return <i className={props.icon}></i>})()}
			<input
				ref={textInput}
				style={{width: props.width ? props.width : '100%'}}
				type={(!props.type || (props.type === 'password' && showPassword)) ? 'text' : props.type}
				min={props.min}
				max={props.max}
				onFocus={() => {setFocus(true)}}
				onBlur={() => {setFocus(false)}}
				value={props.value}
				onChange={ev => {props.onChange(ev.target.value)}}
				placeholder={props.placeholder}
				onKeyDown={handleKeyDown}
				disabled={props.disabled}
				autoFocus={props.autoFocus} />
			<div className="input__buttons">
				{props.type === 'password' ? <Button ghost icon={showPassword ? 'far fa-eye-slash' : 'far fa-eye'} fontColor="var(--primary-text-color)" onClick={handleEyeClick} /> : null}
				{props.buttons ? props.buttons.map((btn, i) => (
					React.cloneElement(btn, {key: i})
				)) : null}
			</div>
		</div>
	)
}

export default Input;
