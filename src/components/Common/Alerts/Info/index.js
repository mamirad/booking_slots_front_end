/*
  Info Alert
*/

import React from 'react';

// Antd
import { Alert } from 'antd';

// Style
import './style.scss';

function Info({ show, message }) {

  return(
    show && 
    <Alert 
      message={ message }
      type="info" 
      closable
      closeText={<i className="icon-close"></i>}
    />
  );
}

export default Info;