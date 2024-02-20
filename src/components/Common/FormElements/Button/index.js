/*
  Input Text
*/

import React from "react";

// Antd
import { Form, Button } from "antd";

// Style
import "./style.scss";

function InputButton({
  name,
  type,
  label,
  onClick,
  disabled,
  className,
  notwrapInForm,
}) {
  // Input Text
  const InputButton = (
    <Button
      type={type}
      className={className}
      label={label}
      onClick={onClick || null}
      disabled={disabled}
    />
  );

  return !!notwrapInForm ? (
    <>{InputButton}</>
  ) : (
    <Form.Item name={name} label={label}>
      {InputButton}
    </Form.Item>
  );
}

export default InputButton;
