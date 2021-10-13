import React from 'react';

function ColorButton(props){
  return (
    <div className={`color-button ${props.selected ? 'selected' : ''}`} style={{backgroundColor: props.color}} onClick={() => {props.onClick(props.color)}}>
      {(() => {
        if (props.selected){
          return <i className="fas fa-check"></i>;
        }
      })()}
    </div>
  );
}

function ColorChooser(props){
  const [color, setColor] = React.useState(props.value);

  function clickHandler(c){
    setColor(c);
    if (props.onChange) props.onChange(c);
  }

  return (
    <div className="color-chooser">
      {props.colors.map((c, i) => <ColorButton key={i} selected={color === c} color={`var(--${c})`} onClick={() => clickHandler(c)}/>)}
    </div>
  );
}

export default ColorChooser;