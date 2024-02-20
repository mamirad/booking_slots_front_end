/*
  Empty Data Page
*/

import React from 'react';

import { Empty, Button } from 'antd';

function EmptyScreen({ 
  title, 
  description, 
  img, 
  buttonText, 
  buttonAction, 
  showButton 
}) {
  return (
    <>
      <Empty
        // image={img || Empty.PRESENTED_IMAGE_SIMPLE} 
        image={img}
        imageStyle={{
          height: 230,
        }}
        description={
          <>
            <b>{title || '' }</b>
            <p>{description}</p>
          </>

        }
      >
        {
          showButton && 
          <Button 
            type="primary"
            onClick = {buttonAction}
          >
            {buttonText}
          </Button>
        }
      </Empty>
    </>
  );
}

export default EmptyScreen;