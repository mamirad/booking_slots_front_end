export const parseEditBookingEvent = (eventData, event_keys) => {
  if (eventData && Object.keys(eventData).length > 0) {
    let parsedData = JSON.parse(JSON.stringify(eventData));

    if (eventData && Object.keys(eventData).length > 0) {
      const fields = [
        {
          name: event_keys.TITLE,
          value: parsedData?.[event_keys.TITLE],
        }
      ];
      return fields;
    }
  }
};

