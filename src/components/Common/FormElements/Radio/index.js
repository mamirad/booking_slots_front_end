/*
  Input Checkbox
*/

import React from "react";

// Antd
import { Radio, Form } from "antd";

// Localization
import LOCALIZATION from "../../../../services/LocalizationService";

// Style
// import './style.scss';

function RadioButton({
  name,
  label,
  defaultValue,
  onChange,
  disabled,
  notwrapInForm,
  options,
  required,
  validator,
  validateTrigger,
}) {
  // Input Text
  const RadioButton = <Radio.Group options={options} onChange={onChange} defaultValue={defaultValue} />;

  let rules = [{ required: required, message: LOCALIZATION.REQUIRED }];

  // Custom Validations
  !!validator && rules.push(validator);

  return !!notwrapInForm ? (
    <>{RadioButton}</>
  ) : (
    <Form.Item
      label={label}
      name={name}
      rules={rules}
      validateTrigger={validateTrigger || "onBlur"}
    >
      {RadioButton}
    </Form.Item>
  );
}

export default RadioButton;
