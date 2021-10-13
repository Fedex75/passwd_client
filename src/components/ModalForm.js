import React, { cloneElement } from "react";
import ReactModal from "react-modal";

function ModalForm(props){
  return (
    <ReactModal
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      className="modal__content"
      overlayClassName="modal__overlay"
    >
      <div className="modal-form" style={{backgroundColor: `var(--${props.color || 'blue'}-dark)` || 'var(--blue)', borderColor: `var(--${props.color || 'blue'}-dark)`}}>
        <div className="modal-form__title">{props.title}</div>
        <div className="modal-form__content">
          {props.children}
        </div>
        <div className="modal-form__buttons">
          { props.buttons.map((btn, i) => cloneElement(btn, {key: i})) }
        </div>
      </div>
    </ReactModal>
  );
}

export default ModalForm;