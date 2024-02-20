/*
  Input Text
*/

import React from "react";

// Antd
import { Form, Switch } from "antd";

// Localization
import LOCALIZATION from "../../../../services/LocalizationService";

// Style
import "./style.scss";

function Toggle({
  name,
  label,
  placeholder,
  readOnly,
  defaultValue,
  value,
  onChange,
  disabled,
  required,
  onBlur,
  validator,
  validateTrigger,
  maxLength,
  notwrapInForm,
  addonBefore,
  type,
  checked,
}) {
  // Rules
  let rules = [{ required: required, message: LOCALIZATION.REQUIRED }];

  // Custom Validations
  !!validator && rules.push(validator);

  // Input Text
  const ToggleComponent = (
    <Switch
      onChange={onChange || null}
      defaultValue={defaultValue}
      disabled={disabled}
      onBlur={onBlur}
      readOnly={readOnly}
      checked={checked}
    />
  );

  return !!notwrapInForm ? (
    <>{ToggleComponent}</>
  ) : (
    <Form.Item
      name={name}
      label={label}
      validateTrigger={validateTrigger || "onBlur"}
      rules={rules}
    >
      {ToggleComponent}
    </Form.Item>
  );
}

export default Toggle;
