/*
  Input Checkbox
*/

import React from 'react';

// Antd
import { Checkbox, Form } from 'antd';

// Style
import './style.scss';

function CheckboxItem({ 
  name, label, upperLabel, defaultValue, 
  onChange, disabled,
  notwrapInForm,
}) {

  // Input Text
  const InputCheckbox = (
    <Checkbox 
      onChange={ onChange || null } 
      defaultValue={ defaultValue }
      disabled={ disabled }
    >
      { label }
    </Checkbox>
  );

  return(
    !!notwrapInForm?
      <>
        { InputCheckbox }
      </>:
      <>
      {upperLabel}
      <Form.Item
        name={ name }
        valuePropName="checked"
      >
        { InputCheckbox }
      </Form.Item>
      </>

  );
}

export default CheckboxItem;