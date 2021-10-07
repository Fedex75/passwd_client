import React from 'react';

function Input(props){
  const [focus, setFocus] = React.useState(false);

  return (
    <div className={`input ${props.compact ? 'compact ' : ''} ${focus ? 'focus ' : ''} ${props.width ? 'fit-content' : ''} ${props.noMargin ? 'no-margin' : ''}`}>
      {(() => {if (props.icon) return <i className={props.icon}></i>})()}
      <input style={{width: props.width ? props.width : '100%'}} type={props.type || 'text'} min={props.min} max={props.max} onFocus={() => {setFocus(true)}} onBlur={() => {setFocus(false)}} value={props.value} onChange={ev => {props.onChange(ev.target.value)}} placeholder={props.placeholder} ></input>
    </div>
  )
}

export default Input;
