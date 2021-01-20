import React from 'react';
import ReactDOM from 'react-dom';

// Creating a portal
// 1st argument is some JSX / what we want to show on the screen
// 2nd argument is a ref to an HTML element that will be the parent of this component

const Modal = props => {
  return ReactDOM.createPortal(
    <div className="ui dimmer modals visible active">
      <div className="ui standard modal visible active">
        laksjdflakjsdf lkajsldfkjalsfdj
      </div>
    </div>,
    document.querySelector('#modal')
  );
};

export default Modal;
