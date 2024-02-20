import React from 'react';
import { Input, Space } from 'antd';

import "../SearchInput/style.scss"

const { Search } = Input;




const SearchInput = ({ onSearch, width, onChange, className }) => (
  <Space direction="vertical" className={className} >
    <Search placeholder="input search text" onChange={onChange} onSearch={onSearch} style={{ width: width }} />
  </Space>
);

export default SearchInput;