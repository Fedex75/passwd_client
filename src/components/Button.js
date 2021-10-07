import React from 'react';
import ReactLoading from 'react-loading';

function Button(props){
  const [blocked, setBlocked] = React.useState(false);

  return (
    <div className={`button ${props.icon ? 'icon ' : ''} ${props.ghost ? 'ghost ' : ''} ${props.compact ? 'compact ' : ''} ${props.disabled || blocked ? 'disabled ' : ''} ${props.small ? 'small ' : ''}`} style={{ backgroundColor: props.color || (props.ghost ? 'transparent' : 'var(--main-color)')}} onClick={() => {
      if (!props.disabled && !blocked && props.onClick){
        if (props.block) setBlocked(true);
        props.onClick();
      }
    }}>
      {(() => {if (props.icon && !blocked) return <i className={props.icon}></i>})()}
      {(() => {if (props.title && !blocked) return <div className="button__title">{props.title}</div>})()}
      {(() => {if (blocked) return <ReactLoading type="bars" color="white" height="10px" width="30px"/>})()}
    </div>
  )
}

export default Button;
