/*
  Error Alert
*/

import React from 'react';

// Antd
import { Alert } from 'antd';

// Style
// import './style.scss';

function Error({ show, message, closable, onClose }) {

  const close = closable === undefined || closable === null? true: closable;
  return(
    show && 
    <Alert 
      message={ message } 
      type="error" 
      closable={ close }
      onClose={ onClose }
      closeText={
        !!close && 
        <i className="icon-close"></i>
      }
    />
  );
}

export default Error;