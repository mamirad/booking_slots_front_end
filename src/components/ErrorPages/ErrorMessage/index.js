/*
  Error Message
*/

import React from 'react';

// Antd
import { Alert, Button } from 'antd';

// Localization
import LOCALIZATION from 'services/LocalizationService';

function ErrorMessage({ 
  error, 
  message,
  refresh 
}) {

  return (
    <>
      { 
        error && 
      <div className="arrival-detail-error">
        <Alert message={ message || LOCALIZATION.ERROR_FETCHING_RECORDS } type="error" />
        <Button type="primary" size="medium" onClick={ refresh }>
          { LOCALIZATION.REFRESH }
        </Button>
      </div>
      }
    </>
  );
}

export default ErrorMessage;