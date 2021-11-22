import React, {useState} from 'react';
import ReactLoading from 'react-loading';

export default function Button({title, icon, ghost, compact, disabled, loading, small, color = 'blue', fontColor = 'white', onClick = () => {}}) {
	const [hover, setHover] = useState(false);

	const clickHandler = () => { if (!disabled && !loading) onClick() };

	return (
		<div
			className={`button ${icon ? 'icon' : ''} ${ghost ? 'ghost' : ''} ${compact ? 'compact' : ''} ${disabled || loading ? 'disabled' : ''} ${small ? 'small' : ''}`}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			style={{
				backgroundColor: `var(--${color}${(hover && !disabled && !loading) ? '-dark' : ''})`,
				borderColor: `var(--${color}-dark)`,
				color: fontColor
			}}
			onClick={clickHandler}
		>
			{icon && !loading ? <i className={icon}></i> : null}
			{loading ? <ReactLoading type="spin" color="white" height="20px" width="20px"/> : null}
			{title ? <div className="button__title">{title}</div> : null}
		</div>
	)
}
