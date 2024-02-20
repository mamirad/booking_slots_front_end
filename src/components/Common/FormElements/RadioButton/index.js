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
  buttonStyle,
}) {
  // Input Text
  const RadioButton = (
    <Radio.Group defaultValue={defaultValue} onChange={onChange} buttonStyle={buttonStyle} >
      {options ? options?.map((option) => (
        <Radio.Button key={option.value} value={option.value}>
          {option.icon} {option.label}
        </Radio.Button>
      )): null}
    </Radio.Group>
  );

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
