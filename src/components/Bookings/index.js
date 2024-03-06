//React
import './style.scss'
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "antd/es/form/Form";
import AddBooking from './Add/index'

//React Big Calender
import { Calendar, Views, luxonLocalizer, momentLocalizer } from "react-big-calendar";
import events from "./events";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { DateTime, Settings } from 'luxon'

//Common
import PageLayout from 'components/Common/PageLayout'
import TimezoneSelect from "components/Common/Timezone/Timezone";

//Constants
import { getAction } from "store/actions/CRUDAction";
import { API_URLS } from "constants/ApiUrl";
import { REDUX_STATES } from "constants/ReduxStates";
import { useDispatch, useSelector } from "react-redux";
import { getToken, getUserId } from "helpers/GeneralHelper";
import { Button } from 'antd';
import { DATE_FORMAT } from 'constants/DateFormat';
import { formatDate } from 'helpers/DateHelper';
const { EMPLOYEES, RESPONSE, LOADING, INVITE,ROOMS } = REDUX_STATES;

//Components


moment.locale("en-GB");

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
    [ROOMS + RESPONSE]: roomsOptions = {},
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
    getEmployeesData();
    getRooms()
  }, [])

  const usersOptions = employeeData?.data?.map(item => (
    {
      name: `${item?.first_name} ${item?.last_name}`,
      value: `${item?.id}`
    }
  ));

  const roomOptions = roomsOptions?.data?.map(item => (
    {
      name: `${item?.name}`,
      value: `${item?.id}`
    }
  ));

  const getEmployeesData = () => {
    return dispatch(getAction(API_URLS.USERS, {}, EMPLOYEES))
  }
  const getRooms = () => {
    return dispatch(getAction(API_URLS.ROOMS, {}, ROOMS))
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

  const toolTipContent=(data)=>{
    return(
      <h5 className='slot-wrapper'>{data?.title}</h5>
    )
  }

  const onSubmit = (data) => {
    const id=getUserId()
    data.created_by=id;
    data.schedule_date=formatDate(new Date(data.schedule_date),DATE_FORMAT.YEAR_MONTH_DAY);
    data.start_time=formatDate(new Date(data.start_time),DATE_FORMAT.HOUR_MINUTE_12F);
    data.end_time=formatDate(new Date(data.end_time),DATE_FORMAT.HOUR_MINUTE_12F);
    console.log('>>>>>>>>>>>', data)
    if (data) {
      if (selectedSlot) {
        const { start, end } = selectedSlot;
        setEvents((prev) => [
          ...prev,
          { title: data.title, start: start, end: end,room:data?.room  },
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
        <div className='filters-wrapper'>
          <Button>Room 1</Button>
          <Button>Room 2</Button>
          <Button>Room 3</Button>
          <Button>Room 4</Button>
          <Button>Room 5</Button>
        </div>
        
        <div className="calender-wrapper">
          <Calendar
            events={myEvents}
            localizer={localizer}
            step={30}
            components={{event:toolTipContent}}
            defaultDate={new Date()}
            defaultView={Views.WEEK}
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}
            selectable
            formats= { DATE_FORMAT.MONTH_SLASH_DAY_SLASH_YEAR_HOUR_MIN}
            timeslots={1}
            toolbar={true}
            resizable
          />
        </div>
      </PageLayout>

      {/* Booking Modal */}
      <AddBooking
        onSubmit={onSubmit}
        onCancel={onCancel}
        bookingModal={bookingModal}
        setBookingModal={setBookingModal}
        form={form}
        usersOptions={usersOptions}
        roomOptions={roomOptions}
      />

    </div>
  );
};

export default Index;
