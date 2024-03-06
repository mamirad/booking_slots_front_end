//React
import React from 'react'
import { Button, Col, Input, Modal, Row } from "antd";

//Common
import { Text, InputButton, Dropdown, TimePicker, TextArea, DatePicker, Email } from "components/Common/FormElements";

//Constants
import LOCALIZATION from "services/LocalizationService";
import { ROOM_OPTIONS, EVENT_KEYS, RECURSION_OPTIONS, REMINDER_OPTIONS } from "../constants";
//DateFormat
import { DATE_FORMAT } from "constants/DateFormat";
import Form from 'antd/es/form/Form';


const Layout = ({ form, bookingModal, onSubmit, onCancel, usersOptions, roomOptions }) => {
  return (
    <Modal title={LOCALIZATION.BOOK_SLOT} open={bookingModal} footer={null} onCancel={onCancel} >
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Row className="my-3">
          <Col span={12} className="px-2">
            <Text name={EVENT_KEYS.NAME} placeholder={LOCALIZATION.TITLE} />
          </Col>
          <Col span={12} className="px-2">
            <Dropdown name={EVENT_KEYS.USERS} placeholder={LOCALIZATION.SELECT_USERS} className='form-control' options={usersOptions} mode={LOCALIZATION.MULTIPLE} />
          </Col>
        </Row>
        <Row className="my-3">
          <Col span={12} className="px-2">
            <Dropdown name={EVENT_KEYS.REMINDER} placeholder={LOCALIZATION.REMINDER} options={REMINDER_OPTIONS} />
          </Col>

          <Col span={12} className="px-2">
            <Dropdown name={EVENT_KEYS.RECURSION} placeholder={LOCALIZATION.RECURSION} options={RECURSION_OPTIONS} />
          </Col>
        </Row>
        <Row className="my-3">
          <Col span={12} className="px-2">
            <DatePicker name={EVENT_KEYS.DATE} placeholder={LOCALIZATION.DATE} />
          </Col>
          <Col span={12} className="px-2">
            <Dropdown name={EVENT_KEYS.ROOM} placeholder={LOCALIZATION.SELECT_ROOM} options={roomOptions} />
          </Col>
        </Row>
        <Row className="my-3">
          <Col span={12} className="px-2">
            <TimePicker
              name={EVENT_KEYS.START_TIME}
              placeholder={LOCALIZATION.START_TIME}
              format={DATE_FORMAT.HOUR_MINUTE_12F}
            />
          </Col>
          <Col span={12} className="px-2">
            <TimePicker
              name={EVENT_KEYS.END_TIME}
              placeholder={LOCALIZATION.END_TIME}
              format={DATE_FORMAT.HOUR_MINUTE_12F}
            />
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
  )
}

export default Layout