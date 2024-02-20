/*
  Warning Alert
*/

import React from 'react';

// Antd
import { Alert } from 'antd';

// Style
import './style.scss';

function Warning({ show, message }) {

  return(
    show && 
    <Alert 
      message={ message }
      type="warning" 
      closable
      closeText={<i className="icon-close"></i>}
    />
  );
}

export default Warning;