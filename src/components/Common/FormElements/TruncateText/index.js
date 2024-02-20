import React  from 'react';
import './style.scss'; // Import CSS file for component styles

import {Tooltip} from "antd"

const TruncatedText = ({ text , line }) => {
  const containerStyle = {
    width: '100%',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: line,
    WebkitBoxOrient: 'vertical',
    // background: '#fff'
  };

  return (
    <div style={containerStyle}>
      <Tooltip title={text} >
      {text}
      </Tooltip>
    </div>
  );
};

export default TruncatedText;


