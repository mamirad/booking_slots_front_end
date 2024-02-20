/*
  Dropdown
*/

import React from 'react';

// Antd
import { Select, Form, Spin, Empty } from 'antd';

// Localization
import LOCALIZATION from 'services/LocalizationService';

const { Option } = Select;

function Dropdown({
  name, label, showSearch, placeholder,
  options, onChange, defaultValue,
  allowClear, disabled, required, dropdownWidth,
  loading, onKeyUp, onKeyDown, readOnly,
  validator, validateTrigger, notwrapInForm, mode,
  value, onClick, className, onDeselect,
}) {

  // const sortBy = [{ prop:'text', direction: 1 }];
  // const sortedOption = sortArray(options, sortBy);
  const sortedOption = options;

  // Validations rules
  let rules = [{ required: required, message: LOCALIZATION.REQUIRED }];
  if (!!validator) {
    rules.push({ validator: validator });
  }

  const DropdownList = (
    <Select
      // getPopupContainer={trigger => trigger.parentNode}
      mode={mode}
      showSearch={showSearch === false ? false : true}
      allowClear={allowClear === false ? false : true}
      defaultValue={defaultValue}
      value={value}
      placeholder={placeholder || LOCALIZATION.PLEASE_SELECT}
      onChange={onChange}
      onKeyUp={onKeyUp}
      onKeyDown={onKeyDown}
      disabled={disabled}
      onClick={onClick}
      loading={loading}
      optionFilterProp="title"
      onDeselect={onDeselect}
      //suffixIcon={<CaretDownOutlined />}
      showArrow={!disabled}
      readOnly={readOnly}
      style={{ width: dropdownWidth || '' }}
      maxTagCount='responsive'
      notFoundContent={
        loading ?
          <div style={{ 'textAlign': 'center' }}><Spin size="small" /></div> :
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      }
    >
      {
        sortedOption && sortedOption?.map((data, index) => {
          return (
            <Option
              disabled={data?.disabled}
              key={index}
              title={typeof data?.name === 'string' ? data.name : data.name.props.children[0]}
              value={data.value}>
              {data.name}
            </Option>
          )
        })
      }
    </Select>
  );

  return (
    !!notwrapInForm ?
      <>
        {DropdownList}
      </> :
      <Form.Item
        name={name}
        className={className}
        label={label}
        validateTrigger={validateTrigger || 'onBlur'}
        rules={rules}
      >
        {DropdownList}
      </Form.Item>
  );
}

export default Dropdown;