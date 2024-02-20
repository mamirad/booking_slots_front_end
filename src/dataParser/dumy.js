export const industryListParser = (data) => {
  if (data !== null && Object.keys(data).length !== 0) {
    let parsedData = [];
    for (let elements of data) {
      parsedData.push({ name: elements.name, value: elements.id });
    }
    return parsedData;
  }
};


