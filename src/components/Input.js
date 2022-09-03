import React, { useRef, useState } from 'react';
import Button from './Button';

export default function Input({value = '', onChange = () => {}, type = 'text', onEnter = () => {}, min, max, icon, width = '100%', noMargin, compact, placeholder, disabled, autoFocus, buttons}){
	const [focus, setFocus] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const textInput = useRef(null);

	const handleEyeClick = () => { setShowPassword(!showPassword) };

	const handleKeyDown = e => {
		if (e.key === 'Enter' && onEnter){
			textInput.current.blur();
			onEnter();
		}
	};

	return (
		<div className={`input ${compact ? 'compact' : ''} ${focus ? 'focus' : ''} ${width !== '100%' ? 'fit-content' : ''} ${noMargin ? 'no-margin' : ''}`}>
			{icon ? <i className={icon}></i> : null}
			<input
				ref={textInput}
				style={{width: width}}
				type={(type === 'password' && showPassword) ? 'text' : type}
				min={min}
				max={max}
				onFocus={() => {setFocus(true)}}
				onBlur={() => {setFocus(false)}}
				value={value}
				onChange={ev => {onChange(ev.target.value)}}
				placeholder={placeholder}
				onKeyDown={handleKeyDown}
				disabled={disabled}
				autoFocus={autoFocus} />
			<div className="input__buttons">
				{type === 'password' ? <Button ghost icon={showPassword ? 'far fa-eye-slash' : 'far fa-eye'} fontColor="var(--primary-text-color)" onClick={handleEyeClick} /> : null}
				{buttons ? buttons.map((btn, i) => (React.cloneElement(btn, {key: i}))) : null}
			</div>
		</div>
	)
}