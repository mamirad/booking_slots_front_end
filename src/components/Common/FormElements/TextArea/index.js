/*
  Input Text
*/

import React from 'react';

// Antd
import { Input, Form } from 'antd';

// Localization
import LOCALIZATION from '../../../../services/LocalizationService';

import { SPACE_VALIDATIOR } from '../../../../constants/Patterns';

const { TextArea } = Input;

function Text({ 
  name, label, placeholder, 
  readOnly, defaultValue, 
  onChange, disabled, required,
  onBlur, validator, validateTrigger,
  maxLength, notwrapInForm
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
  !!validator && rules.push( {validator} );

  // Input Text
  const InputText = (
    <TextArea 
      placeholder={ placeholder || label } 
      onChange={ onChange || null } 
      defaultValue={ defaultValue }
      disabled={ disabled }
      onBlur={ onBlur }
      maxLength={ maxLength }
      readOnly={ readOnly }
      rows={4}
    />
  );

  return(
    !!notwrapInForm?
      <>
        { InputText }
      </>:
      <Form.Item
        name={ name }
        label={ label }
        validateTrigger={ validateTrigger || 'onBlur' }
        rules={ rules }
      >
        { InputText }
      </Form.Item>

  );
}

export default Text;