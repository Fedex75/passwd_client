import React, { cloneElement } from "react";
import ReactModal from "react-modal";

export default function ModalForm({title, isOpen, onRequestClose, color = 'blue', buttons, children}){
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal__content"
      overlayClassName="modal__overlay"
    >
      <div className="modal-form" style={{backgroundColor: `var(--${color}-dark)`, borderColor: `var(--${color}-dark)`}}>
        <div className="modal-form__title">{title}</div>
        <div className="modal-form__content">
          {children}
        </div>
        <div className="modal-form__buttons">
          { buttons.map((btn, i) => cloneElement(btn, {key: i})) }
        </div>
      </div>
    </ReactModal>
  );
}