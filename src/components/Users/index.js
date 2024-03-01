import React, { useEffect, useState } from "react";
import Pagelayout from 'components/Common/PageLayout'
import { USERS_LIST } from "constants/Breadcumb";
import LOCALIZATION from "services/LocalizationService";
import { Button, Modal } from "antd";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Table from "components/Common/Table";
import { PlusOutlined } from '@ant-design/icons';
import { REDUX_STATES } from "constants/ReduxStates";
import { EMPLOYEE_TABLE_COLUMNS } from "./constants";
import URL from "constants/ApplicationUrls";
import { getAction, postAction } from "store/actions/CRUDAction";
import { API_URLS } from "constants/ApiUrl";
import { getToken } from "helpers/GeneralHelper";
import { useDispatch, useSelector } from "react-redux";
import { Text } from "components/Common/FormElements";
import Form from "antd/es/form/Form";
import { successNotification } from "helpers/Notification";


function Layout() {
  const dispatch = useDispatch();
  const token = getToken();
  const history = useHistory()
  const { EMPLOYEES, RESPONSE, LOADING , INVITE } = REDUX_STATES;
  const [form]=Form.useForm()
  const {
    [EMPLOYEES + LOADING]: loading = false,
    [EMPLOYEES + RESPONSE]: employeeData = {},
  } = useSelector((state) => state?.Crud);
  const [inviteModal, setInviteModal] = useState(false);

  useEffect(() => {
    getEmployeesData()
  }, [])

  const getEmployeesData = () => {
    const params = {
      token
    }
    return dispatch(getAction(API_URLS.USERS, { params }, EMPLOYEES))
  }

  const actionConfig = {
    showEdit: true,
    editUrl: URL.EDIT_USER,
    showDelete: true,
    deleteUrl: URL.EDIT_PERFOMANCE,
  };

  const onCancel = () => {
    setInviteModal(false)
  }
  
  const onSubmit = (data) => {
    const formattedData = {
      user: {
        email: data?.email
      }
    };
    dispatch(postAction(API_URLS.INVITE,formattedData,{}, INVITE)).then(
      (res) => {
        successNotification(LOCALIZATION.ADDED_EMPLOYEE_SUCCESSFULLY);
        form.resetFields()
        history.push(URL.USERS)
      }
    );
  };
  return (
    <>
      <Pagelayout
        breadcumbs={USERS_LIST}
        title={LOCALIZATION.USERS}
        actions={
          <>
            <Button type="primary" className="mx-3" onClick={() => setInviteModal(true)}><PlusOutlined /> {LOCALIZATION.INVITE_USER}</Button>
            <Button type="primary" onClick={() => history.push(URL.ADD_USERS)}><PlusOutlined /> {LOCALIZATION.ADD_USER}</Button>
          </>
        }

      >
        <Table
          // searchPlaceholder="Search by Name"
          reduxKey={EMPLOYEES}
          columns={EMPLOYEE_TABLE_COLUMNS}
          actionConfig={actionConfig}
          parseData={employeeData}

        />
        <Modal
          open={inviteModal}
          title={LOCALIZATION.INVITE_USER}
          okText={LOCALIZATION.INVITE}
          onCancel={onCancel}
          className="py-5"
          width={'400px'}
          onOk={onCancel}
          icon={null}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={onSubmit}>
          <Text
            className="mt-5"
            name={LOCALIZATION.INVITE_EMAIL}
            placeholder={LOCALIZATION.ENTER_INVITI_EMAIL}
            required
          />
          <Button type="primary" htmlType="submit"  onClick={()=>new Event('submit')} >
            {LOCALIZATION.INVITE}
          </Button>
          </Form>
        </Modal>
      </Pagelayout>
    </>
  );
}

export default Layout;