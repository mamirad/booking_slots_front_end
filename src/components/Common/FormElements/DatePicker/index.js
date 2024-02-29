/*
  Date Picker
*/

// Antd
import { Form } from "antd";

import DatePicker from "./DatePickerComponent";

// Localization
import LOCALIZATION from "../../../../services/LocalizationService";

function Picker({
  name,
  label,
  placeholder,
  readOnly,
  defaultValue,
  format,
  onChange,
  disabled,
  required,
  onBlur,
  validator,
  validateTrigger,
  disabledDate,
  notwrapInForm,
  type,
  showTime
}) {
  // Rules
  let rules = [
    { required: required, message: LOCALIZATION.REQUIRED },
    // {
    //   pattern: SPACE_VALIDATIOR,
    //   message: LOCALIZATION.SPACE_VALIDATION
    // }
  ];

  // Custom Validations
  !!validator && rules.push({ validator });

  const DatePickerInput = (
    <DatePicker
      placeholder={placeholder || label}
      onChange={onChange || null}
      defaultValue={defaultValue}
      disabled={disabled}
      onBlur={onBlur}
      picker={type}
      readOnly={readOnly}
      format={format}
      disabledDate={disabledDate}
      showTime={showTime}
      // suffixIcon={<CaretDownOutlined />}
    />
  );

  return !!notwrapInForm ? (
    <>{DatePickerInput}</>
  ) : (
    <Form.Item
      name={name}
      label={label}
      validateTrigger={validateTrigger || "onBlur"}
      rules={rules}
    >
      {DatePickerInput}
    </Form.Item>
  );
}

export default Picker;
