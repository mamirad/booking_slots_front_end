import React, { useCallback, useEffect, useMemo, useState } from "react";
import events from "./events";
import { Calendar, Views, luxonLocalizer, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import './style.scss'
import PageLayout from 'components/Common/PageLayout'
import { DateTime, Settings } from 'luxon'
import TimezoneSelect from "components/Common/Timezone/Timezone";
import { Button, Col, Input, Modal, Row } from "antd";
import Form, { useForm } from "antd/es/form/Form";
import LOCALIZATION from "services/LocalizationService";
import { Text, InputButton, Dropdown, TimePicker, TextArea, DatePicker, Email } from "components/Common/FormElements";
import { ROOM_OPTIONS, EVENT_KEYS, RECURSION_OPTIONS, REMINDER_OPTIONS } from "./constants";
import { DATE_FORMAT } from "constants/DateFormat";
import { getAction } from "store/actions/CRUDAction";
import { API_URLS } from "constants/ApiUrl";
import { REDUX_STATES } from "constants/ReduxStates";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "helpers/GeneralHelper";
const { EMPLOYEES, RESPONSE, LOADING, INVITE } = REDUX_STATES;

moment.locale("en-GB");
// const localizer = momentLocalizer(moment);


const Index = () => {
  const defaultTZ = 'Australia/Perth';
  const defaultDateStr = '2015-04-13';
  const dispatch = useDispatch();
  const [myEvents, setEvents] = useState(events);
  const [timezone, setTimezone] = useState(defaultTZ);
  const [bookingModal, setBookingModal] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [form] = useForm();
  const token = getToken();
  const {
    [EMPLOYEES + LOADING]: loading = false,
    [EMPLOYEES + RESPONSE]: employeeData = {},
  } = useSelector((state) => state?.Crud);

  const {
    localizer,
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

  useEffect(() => {
    getEmployeesData()
  }, [])

  const getEmployeesData = () => {
    const params = {
      token
    }
    return dispatch(getAction(API_URLS.USERS, { params }, EMPLOYEES))
  }

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

  const onSubmit = (data) => {
    console.log(data);
    if (data) {
      if (selectedSlot) {
        const { start, end } = selectedSlot;

        setEvents((prev) => [
          ...prev,
          { title: data.title, start: start, end: end },
        ]);
        form.resetFields();
      } else if (selectedEvent) {
        const updatedEvents = myEvents.map((event) =>
          event === selectedEvent ? { ...event, title: data.title } : event
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

  const usersOptions = employeeData?.data?.map(item => (
    {
      name: `${item?.first_name} ${item?.last_name}`,
      value: `${item?.first_name} ${item?.last_name}`
  }
  ));



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

        <Modal title={LOCALIZATION.BOOK_SLOT} open={bookingModal} footer={null} onCancel={onCancel} width={'50%'}>

          <Form form={form} layout="vertical" onFinish={onSubmit}>
            <Row className="my-3">
              <Col span={12} className="px-2">
                <Text name={EVENT_KEYS.TITLE} placeholder={LOCALIZATION.TITLE} />
              </Col>
              <Col span={12} className="px-2">
                <Dropdown name={EVENT_KEYS.USERS} placeholder={LOCALIZATION.SELECT_USERS}   className='form-control'  options={usersOptions} mode={LOCALIZATION.MULTIPLE}/>
              </Col>
            </Row>
            <Row className="my-3">
              <Col span={12} className="px-2">
                <Email name={EVENT_KEYS.ATTENDIE_USER} placeholder={LOCALIZATION.ATTENDIE_USER} />
              </Col>
              <Col span={12} className="px-2">
                <Dropdown name={EVENT_KEYS.RECURSION} placeholder={LOCALIZATION.RECURSION} options={RECURSION_OPTIONS} />
              </Col>
            </Row>
            <Row className="my-3">
              <Col span={12} className="px-2">
                <Dropdown name={EVENT_KEYS.REMINDER} placeholder={LOCALIZATION.REMINDER} options={REMINDER_OPTIONS} />
              </Col>
              <Col span={12} className="px-2">
                <Dropdown name={EVENT_KEYS.ROOM} placeholder={LOCALIZATION.SELECT_ROOM} options={ROOM_OPTIONS} />
              </Col>
            </Row>
            <Row className="my-3">
              <Col span={12} className="px-2">
                <DatePicker
                  name={EVENT_KEYS.START_DATE}
                  placeholder={LOCALIZATION.START_TIME}
                  format={DATE_FORMAT.HOUR_MINUTE_12F}
                  showTime={{ use12Hours: true }}
                />
              </Col>
              <Col span={12} className="px-2">
                <DatePicker name={EVENT_KEYS.END_DATE} placeholder={LOCALIZATION.END_TIME} format={DATE_FORMAT.HOUR_MINUTE_12F} showTime={{ use12Hours: true }} />
              </Col>
            </Row>
            <Row className="my-3">

              <Col span={24} className="px-2">
                <TextArea name={EVENT_KEYS.DESCRIPTION} placeholder={LOCALIZATION.DESCRIPTION} />
              </Col>
            </Row>
            <Row className="add_booking_buttons">
              <Button type="primary" onClick={onCancel} className="cancel">Cancel</Button>
              <Button htmlType='submit' type='primary' onClick={() => new Event('submit')} >
                {LOCALIZATION.ADD}
              </Button>
            </Row>
          </Form>
        </Modal>
      </PageLayout>
    </div>
  );
};

export default Index;
