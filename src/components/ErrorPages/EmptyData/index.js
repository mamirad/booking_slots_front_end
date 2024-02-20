/*
  Empty Data Page
*/

import React from 'react';

// Localization
import LOCALIZATION from 'services/LocalizationService';

import { Empty, Button } from 'antd';

function EmptyData({ message, refresh }) {
  return (
    <>
      <Empty 
        image={Empty.PRESENTED_IMAGE_SIMPLE} 
        description={
          message || (
            !!refresh? 
              LOCALIZATION.INTERNAL_SERVER_ERROR_MESSAGE:
              LOCALIZATION.NO_DATA_FOUND
          )
        }
      >
        {
          !!refresh && 
          <Button 
            type="primary" 
            onClick={ refresh }
          >
            { LOCALIZATION.REFRESH }
          </Button>
        }
      </Empty>
    </>
  );
}

export default EmptyData;