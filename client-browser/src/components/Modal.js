import React from 'react';
import ReactDOM from 'react-dom';

// Creating a portal
// 1st argument is some JSX / what we want to show on the screen
// 2nd argument is a ref to an HTML element that will be the parent of this component

const Modal = props => {
  return ReactDOM.createPortal(
    <div
      onClick={props.onDismiss}
      className="ui dimmer modals visible active"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="ui standard modal visible active"
      >
        <div className="header">{props.title}</div>
        <div className="content">{props.content}</div>
        <div className="actions">{props.actions}</div>
      </div>
    </div>,
    document.querySelector('#modal')
  );
};

export default Modal;
