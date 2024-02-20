import React from "react";
import { render } from "react-dom";
import events from "./events";
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import './style.scss'
moment.locale("en-GB");
const localizer=momentLocalizer(moment);


const Index = () => (
  <div className="calender-wrapper">
    <Calendar
      events={events}
      localizer={localizer}
      step={60}
      defaultDate={new Date()}
      popup={false}
      onShowMore={(events, date) => this.setState({ showModal: true, events })}
    />
  </div>
);
export default Index

