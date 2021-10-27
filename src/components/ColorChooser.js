import React, {useState} from 'react';
import ColorButton from './ColorButton';

export default function ColorChooser({value, onChange = () => {}, colors}){
  const [color, setColor] = useState(value);

  function clickHandler(c){
    setColor(c);
    onChange(c);
  }

  return (
    <div className="color-chooser">
      {colors.map((c, i) => <ColorButton key={i} selected={color === c} color={`var(--${c})`} onClick={() => clickHandler(c)}/>)}
    </div>
  );
}