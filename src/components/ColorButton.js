import React from 'react';

export default function ColorButton({selected, color, onClick = () => {}}){
    return (
      <div className={`color-button ${selected ? 'selected' : ''}`} style={{backgroundColor: color}} onClick={() => {onClick(color)}}>
        {selected ?  <i className="fas fa-check"></i> : null}
      </div>
    );
}