export const parseEditEmployeeFormData = (employeeData, edit_employee_keys, id) => {
  if (id && employeeData && Object.keys(employeeData).length > 0) {
    let parsedData = JSON.parse(JSON.stringify(employeeData?.data));


    if (employeeData && Object.keys(employeeData).length > 0) {
      const fields = [
        {
          name: edit_employee_keys.FIRST_NAME,
          value: parsedData?.[edit_employee_keys.FIRST_NAME],
        },
        {
          name: edit_employee_keys.LAST_NAME,
          value: parsedData?.[edit_employee_keys.LAST_NAME],
        },
        {
          name: edit_employee_keys.EMAIL,
          value: parsedData?.[edit_employee_keys.EMAIL],
        },
        {
          name: edit_employee_keys.ROLE,
          value: parsedData?.[edit_employee_keys.ROLE],
        },
        {
          name: edit_employee_keys.PASSWORD,
          value: parsedData?.[edit_employee_keys.PASSWORD],
        },
      ];
      return fields;
    }
  }
};

