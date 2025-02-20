/*
  Input Email
*/

import React from 'react';

// Antd
import { Input, Form } from 'antd';

// Localization
import LOCALIZATION from '../../../../services/LocalizationService';

// Style
import './style.scss';

function Email({ 
  name, label, 
  placeholder, defaultValue, 
  onChange, disabled, required,
  onBlur, validateTrigger,
  validator, notwrapInForm
}) {

  // Rules
  let rules = [
    { required: required, message: LOCALIZATION.REQUIRED },
    { type: 'email', message: LOCALIZATION.INVALID_EMAIL },
  ];

  // Custom Validations
  !!validator && rules.push({ validator });

  // Input Email
  const InputEmail = (
    <Input 
      placeholder={ placeholder || label } 
      onChange={ onChange || null } 
      defaultValue={ defaultValue }
      disabled={ disabled }
      onBlur={ onBlur || null }
    />
  );
  
  return(
    !!notwrapInForm?
      <>
        { InputEmail }
      </>:
      <Form.Item
        name={ name }
        label={ label }
        validateTrigger={ validateTrigger || 'onBlur' }
        rules={ rules }
        
        data-testid='form'
      >
        { InputEmail }
      </Form.Item>
  );
}

export default Email;