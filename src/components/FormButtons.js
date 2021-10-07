import React from 'react';

function FormButtons(props){
  return (
    <div className="form__buttons">
      {props.children}
    </div>
  )
}

export default FormButtons;
