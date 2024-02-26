/*
  Input Password
*/

import React from 'react';

// Antd
import { Input, Form } from 'antd';

// Localization
import LOCALIZATION from 'services/LocalizationService';

// Style
import './style.scss';

function Password({ 
  name, label, 
  placeholder, defaultValue, 
  onChange, disabled, required,
  onBlur, validateTrigger,
  validator, notwrapInForm,
  maxLength, minLength,
}) {

  // Rules
  let rules = [
    { required: required, message: LOCALIZATION.REQUIRED  },
    ...(validator || [])
  ];

  // Custom Validations
  //!!validator && rules.push( validator );

  //!!validator && rules.concat( validator );


  // Input Email
  const InputPassword = (
    <Input.Password 
      placeholder={ placeholder } 
      onChange={ onChange || null } 
      defaultValue={ defaultValue }
      disabled={ disabled }
      onBlur={ onBlur || null }
      maxLength={ maxLength || 25 }
      minLength={ minLength || 8 }
    />
  );
  
  return(
    !!notwrapInForm?
      <>
        { InputPassword }
      </>:
      <Form.Item
        name={ name }
        label={ label }
        validateTrigger={ validateTrigger || 'onBlur' }
        rules={ rules }
      >
        { InputPassword }
      </Form.Item>
  );
}

export default Password;