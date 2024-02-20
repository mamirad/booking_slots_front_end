import React from 'react';
import { Select, Form, Spin, Empty, Tag } from 'antd'; // Import Tag from Ant Design

// Localization
import LOCALIZATION from '../../../../services/LocalizationService';

const { Option } = Select;

function TagSelect({
  name, label, showSearch, placeholder,
  options, onChange, defaultValue,
  allowClear, disabled, required, dropdownWidth,
  loading, onKeyUp, onKeyDown, readOnly,
  validator, validateTrigger, notwrapInForm, value, onClick,
  className, onDeselect, onClear, onPressEnter
}) {
  // Validations rules
  let rules = [{ required: required, message: LOCALIZATION.REQUIRED }];
  if (!!validator) {
    rules.push({ validator: validator });
  }

  const TagList = (
    <Select
      mode="tags" // Set mode to "tags"
      showSearch={showSearch === false ? false : true}
      allowClear={allowClear === false ? false : true}
      defaultValue={defaultValue}
      value={value}
      placeholder={placeholder || LOCALIZATION.ENTER_TAGS}
      onChange={onChange}
      onClear={onClear}
      onKeyUp={onKeyUp}
      onKeyDown={onKeyDown}
      disabled={disabled}
      onClick={onClick}
      loading={loading}
      optionFilterProp="title"
      onPressEnter={onPressEnter}
      onDeselect={onDeselect}
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
        options && options.map((data, index) => {
          return (
            <Option
              disabled={data?.disabled}
              key={index}
              title={data.name}
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
        {TagList}
      </> :
      <Form.Item
        name={name}
        className={className}
        label={label}
        validateTrigger={validateTrigger || 'onBlur'}
        rules={rules}
      >
        {TagList}
      </Form.Item>
  );
}

export default TagSelect; // Export TagSelect
