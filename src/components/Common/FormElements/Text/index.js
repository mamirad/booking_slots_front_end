/*
  Input Text
*/

import React from 'react';

// Antd
import { Input, Form } from 'antd';

// Localization
import LOCALIZATION from '../../../../services/LocalizationService';

import { SPACE_VALIDATIOR } from '../../../../constants/Patterns';

// Style
import './style.scss';

function Text({
  name, label, placeholder,
  readOnly, defaultValue, value,
  onChange, disabled, required,
  onBlur, validator, validateTrigger,
  maxLength, notwrapInForm, addonBefore, type, onPressEnter
}) {

  // Rules
  let rules = [
    { required: required, message: LOCALIZATION.REQUIRED },
    {
      pattern: SPACE_VALIDATIOR,
      message: LOCALIZATION.SPACE_VALIDATION
    }
  ];

  // Custom Validations
  !!validator && rules.push(validator);

  // Input Text
  const InputText = (
    <Input
      placeholder={placeholder || label}
      onChange={onChange || null}
      defaultValue={defaultValue}
      value={value}
      disabled={disabled}
      onPressEnter={onPressEnter}
      onBlur={onBlur}
      maxLength={maxLength || 100}
      readOnly={readOnly}
      addonBefore={addonBefore}
      type={type}
    />
  );

  return (
    !!notwrapInForm ?
      <>
        {InputText}
      </> :
      <Form.Item
        name={name}
        label={label}
        validateTrigger={validateTrigger || 'onBlur'}
        rules={rules}
      >
        {InputText}
      </Form.Item>

  );
}

export default Text;