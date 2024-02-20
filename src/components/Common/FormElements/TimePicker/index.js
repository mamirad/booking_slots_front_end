/*
  Date Picker
*/

import React from 'react';

// Antd
import { Form } from 'antd';

import TimePicker from './TimePickerComponent';

// Localization
import LOCALIZATION from '../../../../services/LocalizationService';



function Picker({ 
  name, label, placeholder, 
  readOnly, defaultValue, format,
  onChange, disabled, required,
  onBlur, validator, validateTrigger,
  disabledDate, notwrapInForm, type, disabledTime,allowClear
}) {

  // Rules
  let rules = [
    { required: required, message: LOCALIZATION.REQUIRED },
  ];

  // Custom Validations
  !!validator && rules.push( {validator} );

  const TimePickerInput = (
    <TimePicker 
      placeholder={ placeholder || label } 
      onChange={ onChange || null } 
      defaultValue={ defaultValue }
      disabled={ disabled }
      onBlur={ onBlur }
      picker={ type }
      readOnly={ readOnly }
      format={ format }
      disabledTime={disabledTime}
      allowClear={allowClear}
    />
  );

  return(
    !!notwrapInForm?
      <>
        { TimePickerInput }
      </>:
      <Form.Item
        name={ name }
        label={ label }
        validateTrigger={ validateTrigger || 'onBlur' }
        rules={ rules }
      >
        { TimePickerInput }
      </Form.Item>

  );
}

export default Picker;