/*
  Application Login Page
*/

import React from "react";
import { useHistory } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";

// Components
import IconLogin1 from "../../../assets/images/Icon-login-1.png"
import IconLogin2 from "../../../assets/images/Icon-login-2.png"
import { Email, Password } from "components/Common/FormElements";

// Constants
import APP_URL from 'constants/ApplicationUrls';

// Actions
import { login } from "store/actions/AuthAction";

// Antd
import { Form, Button, Row, Col } from 'antd';

// Localization
import LOCALIZATION from "services/LocalizationService";

// Style
import "./style.scss"


function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  // Redux States
  const loading = useSelector((state) => state?.Auth?.loading);

  const onSubmit = () => {

    const data = { email: "admin@horizondigital.net.au", password: "Apple@708" };
    dispatch(login(data)).then(
      () => {
        history.push(APP_URL.MENU_A);
      },
      (e) => {
        console.log(e);
        alert("Error");
      }
    );
  };

  return (
    <div className="login-wrapper" >
      <div className="header">
      </div>
      <Col xs={12} md={8} lg={6} xl={3} className="title" >
        <h2> {LOCALIZATION.MEETING_ROOM} </h2>
      </Col>
      <Col span={24} className="form-row" >
        <Col xs={20} md={12} xl={7} className="login-form-wrapper" >
          <h2>{LOCALIZATION.LOGIN}</h2>
          <Form layout="vertical" >
            <Col span={24} >
              <Email label={"Email"} />
            </Col>
            <Col span={24} >
              <Password label={"Password"} />
            </Col>
            <Col span={24} className="d-flex justify-center" >
              <a onClick={()=>history.push(APP_URL.AUTH.FORGOT_PASSWORD)} > {LOCALIZATION.FORGOT_PASSWORD}? </a>
            </Col>
            <Col span={24} className="mt-3" >
              <Button  onClick={()=>history.push(APP_URL.BOOKINGS)} type="auth" className="inline-content" >
                <img src={IconLogin1} className="mr-10" height={14} width={14} />
                {LOCALIZATION.LOGIN}
                <img src={IconLogin2} className="ml-10" height={18} width={18} />
              </Button>
            </Col>
          </Form>
        </Col>
      </Col>

    </div>
  );
}

export default Login;
