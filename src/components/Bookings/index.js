import React, { useCallback, useEffect, useMemo, useState } from "react";
import events from "./events";
import { Calendar, Views, luxonLocalizer, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import './style.scss'
import PageLayout from 'components/Common/PageLayout'
import { DateTime, Settings } from 'luxon'
import TimezoneSelect from "components/Common/Timezone/Timezone";
import { Form, Input, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
moment.locale("en-GB");
// const localizer = momentLocalizer(moment);


const Index = () => {
  const defaultTZ = 'Australia/Perth';
  const defaultDateStr = '2015-04-13';
  const [myEvents, setEvents] = useState(events);
  const [timezone, setTimezone] = useState(defaultTZ);
  const [bookingModal, setBookingModal] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [form] = useForm();

  const {
    localizer,
    defaultDate,
    getNow,
    scrollToTime,
  } = useMemo(() => {
    Settings.defaultZone = timezone;
    return {
      defaultDate: getDate(new Date(), DateTime),
      getNow: () => DateTime.local().toJSDate(),
      localizer: luxonLocalizer(DateTime),
      myEvents: [...events],
      scrollToTime: DateTime.local().toJSDate(),
    };
  }, [timezone]);

  useEffect(() => {
    return () => {
      Settings.defaultZone = defaultTZ; // reset to browser TZ on unmount
    };
  }, []);

  const handleSelectEvent = useCallback(
    (event) => {
      setEventTitle(event.title);
      setBookingModal(true);
      setSelectedEvent(event); // Save the selected event in state
    },
    [myEvents]
  );

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      setEventTitle(''); // Reset event title when selecting a new slot
      setBookingModal(true);
      setSelectedSlot({ start, end }); // Save the selected slot in state
    },
    [myEvents]
  );

  function getDate(str, DateTimeObj) {
    return DateTimeObj.fromISO(str).toJSDate();
  }

  const onSubmit = () => {
    if (eventTitle && (selectedSlot || selectedEvent)) {
      if (selectedSlot) {
        const { start, end } = selectedSlot;

        setEvents((prev) => [
          ...prev,
          { title: eventTitle, start: start, end: end },
        ]);
      } else if (selectedEvent) {
        const updatedEvents = myEvents.map((event) =>
          event === selectedEvent ? { ...event, title: eventTitle } : event
        );

        setEvents(updatedEvents);
      }

      setBookingModal(false);
      setSelectedSlot(null);
      setSelectedEvent(null);
    }
  };

  const onCancel = () => {
    setBookingModal(false); // Close the modal on cancel
  };

  return (
    <div className="timezone-wrapper">
      <PageLayout
        actions={
          <TimezoneSelect
            defaultTZ={defaultTZ}
            setTimezone={setTimezone}
            timezone={timezone}
          />
        }
      >
        <div className="calender-wrapper">
          <Calendar
            events={myEvents}
            localizer={localizer}
            step={30}
            defaultDate={new Date()}
            defaultView={Views.WEEK}
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}
            selectable
            dayLayoutAlgorithm={'no-overlap'}
          />
        </div>

        <Modal title={'Book Slot'} visible={bookingModal} onCancel={onCancel} onOk={onSubmit}>
          <Form form={form}>
            <Form.Item >
              <Input
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
              />
            </Form.Item>
          </Form>
        </Modal>
      </PageLayout>
    </div>
  );
};

export default Index;
