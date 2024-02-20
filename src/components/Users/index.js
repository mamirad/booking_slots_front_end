import React, { useState } from "react";
import Pagelayout from 'components/Common/PageLayout'
import { USERS_LIST } from "constants/Breadcumb";
import LOCALIZATION from "services/LocalizationService";
import { Button } from "antd";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Table from "components/Common/Table";
import { PlusOutlined } from '@ant-design/icons';
import { REDUX_STATES } from "constants/ReduxStates";
import { EMPLOYEE_TABLE_COLUMNS } from "./constants";
import URL from "constants/ApplicationUrls";
export const Employee = [
  {
    id: 1,
    name: "Naimat",
    email: "naimat@gmail.com",
    type: "Full Time",
    password:'naimat'
  },
  {
    id: 2,
    name: "Usama Kaleem",
    email: "usamakaleem@gmail.com",
    type: "Full Time",
    password:'usama'
  },
  {
    id: 3,
    name: "Muhammad Amir",
    email: "amir@gmail.com",
    type: "Part Time",
    password: "amir",
  },
];
const {EMPLOYEES}=REDUX_STATES;
function Layout() {
  const history = useHistory()
  const actionConfig = {
    showEdit: true,
    editUrl: URL.EDIT_USER,
    showDelete: true,
    deleteUrl:URL.EDIT_PERFOMANCE,
  };
  return (
    <>
      <Pagelayout
        breadcumbs={USERS_LIST}
        title={LOCALIZATION.USERS}
        actions={
          <>
          <Button type="primary" onClick={()=>history.push(URL.ADD_USERS)}><PlusOutlined/> {LOCALIZATION.ADD_USER}</Button>
          </>
        }
        
      >
        <Table
          // searchPlaceholder="Search by Name"
          reduxKey={EMPLOYEES}
          columns={EMPLOYEE_TABLE_COLUMNS}
          actionConfig={actionConfig}
          dummyData={Employee}
          
        />
      </Pagelayout>
    </>
  );
}

export default Layout;