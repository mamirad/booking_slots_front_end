export const parseEditEmployeeFormData = (employeeData, edit_employee_keys, id) => {
  if (id && employeeData && Object.keys(employeeData).length > 0) {
    let parsedData = JSON.parse(JSON.stringify(employeeData));

    // Object.keys(employeeData || {})?.map((key) => {
    //     if (key.includes("date")) {
    //         parsedData[key] = parsedData[key] ? new Date(parsedData[key]) : null;
    //     }
    // })

    if (employeeData && Object.keys(employeeData).length > 0) {
      const fields = [
        {
          name: edit_employee_keys.NAME,
          value: parsedData?.[edit_employee_keys.NAME],
        },
        {
          name: edit_employee_keys.EMAIL,
          value: parsedData?.[edit_employee_keys.EMAIL],
        },
        {
          name: edit_employee_keys.TYPE,
          value: parsedData?.[edit_employee_keys.TYPE],
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

