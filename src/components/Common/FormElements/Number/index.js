/*
  Input Text
*/

import React from "react";

// Antd
import { Input, Form } from "antd";

// Localization
import LOCALIZATION from "../../../../services/LocalizationService";

function Number({
  name,
  label,
  placeholder,
  readOnly,
  defaultValue,
  onChange,
  disabled,
  required,
  onBlur,
  validator,
  validateTrigger,
  maxLength,
  notwrapInForm,
  min,
}) {
  // Rules
  let rules = [
    { required: required, message: LOCALIZATION.REQUIRED },
  ];

  // Custom Validations
  !!validator && rules.push( validator );

  // Input Number
  const InputNumber = (
    <Input
      placeholder={placeholder || label}
      onChange={onChange || null}
      defaultValue={defaultValue}
      disabled={disabled}
      onBlur={onBlur}
      maxLength={maxLength}
      readOnly={readOnly}
      min={min}
      type="number"
    />
  );

  return !!notwrapInForm ? (
    <>{InputNumber}</>
  ) : (
    <Form.Item
      name={name}
      label={label}
      validateTrigger={validateTrigger || "onBlur"}
      rules={rules}
    >
      {InputNumber}
    </Form.Item>
  );
}

export default Number;
