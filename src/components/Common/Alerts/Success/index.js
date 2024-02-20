/*
  Success Alert
*/

import React from 'react';

// Antd
import { Alert } from 'antd';

// Style
import './style.scss';

function Success({ show, message }) {

  return(
    show && 
    <Alert 
      message={ message }
      type="success" 
      closable
      closeText={<i className="icon-close"></i>}
    />
  );
}

export default Success;