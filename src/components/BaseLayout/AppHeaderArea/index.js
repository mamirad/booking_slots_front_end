/* 
  Header area for application
*/

import React from "react";
import { useHistory } from "react-router-dom";

// Redux
import { useDispatch } from "react-redux";

// Antd
import { Col, Menu, Dropdown,Modal } from "antd";
import {
  UserOutlined
} from '@ant-design/icons';

// Actions
import { logout } from "store/actions/AuthAction";

// Helpers
import { getName, getEmail, getUserInfo } from "helpers/GeneralHelper";

// Constants
import APP_URL from "constants/ApplicationUrls";

// Localization
import LOCALIZATION from "services/LocalizationService";

// Style
import './style.scss'

const AppHeaderArea = () => {
  // Refs
  const dispatch = useDispatch();
  const history = useHistory();

  const userInfo=getUserInfo();

  // is New Job
  const isReplacement = false;

  const onLogoutConfirm = () => {
    Modal.confirm({
      title: LOCALIZATION.CONFIRM,
      icon: null,
      closable: true,
      closeIcon: <i className="icon-clear"></i>,
      content: LOCALIZATION.ARE_YOU_SURE_LOGOUT,
      okButtonProps: "seconday",
      okText: LOCALIZATION.YES,
      okType: "primary",
      cancelText: LOCALIZATION.NO,
      onOk: onLogout,
      className: `meesagesModal ${isReplacement ? "theme-blue" : ""}`,
    });
  };

  const onLogout = () => {
    dispatch(logout()).then(() => {
      history.push(APP_URL.AUTH.LOGIN);
    });
  };

  // On Menu
  const menu = (
    <Menu className="logout-menu" style={{textAlign:"center"}} >
      <div className="admin-text">{ "HD" }</div>
      <div className="email-text"> {userInfo?.email} </div>
      <Menu.Item key="1">
        {LOCALIZATION.CHANGE_PASSWORD}
      </Menu.Item>
      <Menu.Item key="2" onClick={onLogoutConfirm}>
        {LOCALIZATION.LOGOUT}
      </Menu.Item>
    </Menu>
  );
  return (
    <Col xs={24} sm={4} md={4} lg={21} className="userProfile">
     
      <Dropdown overlay={menu}>
        <div
          role="button"
          className="userProfile-btn"
          onClick={(e) => e.preventDefault()}
        >
          <div className="userImg">
            <span><UserOutlined /></span>
          </div>
        </div>
      </Dropdown>
    </Col>
  );
};

export default AppHeaderArea;