/*
  Time Picker Component
*/

import * as React from "react";
import DatePicker from "../DatePicker/DatePickerComponent";

const TimePicker = React.forwardRef((props, ref) => {
  return <DatePicker {...props} picker="time" mode={undefined} ref={ref} />;
});

TimePicker.displayName = "TimePicker";

export default TimePicker;
